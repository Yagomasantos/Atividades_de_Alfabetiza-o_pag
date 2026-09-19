(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const form = $('auth-form');
  const fields = form.elements;
  let mode = 'signup';
  let client;
  const message = (text, success = false) => {
    $('auth-message').textContent = text;
    $('auth-message').classList.toggle('success', success);
  };
  const today = new Date();
  fields.birth.max = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  fields.birth.min = '1900-01-01';
  function setMode(next) {
    mode = next;
    form.reset();
    message('');
    $('profile-area').hidden = true;
    $('auth-area').hidden = false;
    document.querySelector('.account-tabs').hidden = next === 'recovery';
    document.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === next)));
    document.querySelectorAll('[data-signup]').forEach(el => {
      el.hidden = next !== 'signup';
      el.querySelectorAll('input').forEach(input => { input.disabled = next !== 'signup'; });
    });
    fields.email.closest('label').hidden = next === 'recovery';
    fields.email.disabled = next === 'recovery';
    fields.password.autocomplete = next === 'login' ? 'current-password' : 'new-password';
    fields.password.minLength = next === 'login' ? 1 : 8;
    $('confirm-label').hidden = next === 'login';
    fields.confirm.disabled = next === 'login';
    $('forgot-password').hidden = next !== 'login';
    $('form-title').textContent = {signup:'Boas-vindas!',login:'Que bom ter você aqui.',recovery:'Crie uma nova senha.'}[next];
    $('form-description').textContent = next === 'signup' ? 'Preencha os dados do titular da conta.' : next === 'login' ? 'Entre com seu e-mail e senha.' : 'Escolha uma senha com pelo menos 8 caracteres.';
    $('submit-auth').textContent = {signup:'Criar minha conta',login:'Entrar na minha conta',recovery:'Salvar nova senha'}[next];
  }
  const friendly = error => {
    if (error?.code === 'invalid_credentials') return 'E-mail ou senha incorretos.';
    if (error?.code === 'email_not_confirmed') return 'Confirme seu e-mail antes de entrar.';
    if (error?.status === 429) return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.';
    return 'Não foi possível concluir. Confira os dados e sua conexão e tente novamente.';
  };
  async function showProfile(user) {
    $('auth-area').hidden = true;
    $('profile-area').hidden = false;
    $('profile-name').textContent = 'Carregando…';
    $('profile-email').textContent = user.email || '—';
    $('profile-birth').textContent = '—';
    const { data, error } = await client.from('profiles').select('full_name,birth_date').eq('id',user.id).single();
    if (error) { $('profile-name').textContent = 'Indisponível'; message('Sua sessão está ativa, mas não foi possível carregar o cadastro. Tente entrar novamente.'); return; }
    $('profile-title').textContent = `Olá, ${data.full_name.split(' ')[0]}!`;
    $('profile-name').textContent = data.full_name;
    $('profile-birth').textContent = data.birth_date ? data.birth_date.split('-').reverse().join('/') : '—';
    message('');
  }
  document.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
  if (new URLSearchParams(location.search).get('modo') === 'login') setMode('login');
  const config = window.AUTH_CONFIG || {};
  if (config.url && config.publishableKey && window.supabase) {
    try { client = window.supabase.createClient(config.url,config.publishableKey); } catch { message('O acesso à conta está temporariamente indisponível.'); }
  }
  if (!client) message('O cadastro ainda não está disponível. Volte em breve.');
  const redirectTo = new URL('conta.html',location.href).href;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!client) return message('O cadastro ainda não está disponível. Nenhum dado foi enviado.');
    if (mode !== 'login' && fields.password.value !== fields.confirm.value) return message('As senhas precisam ser iguais.');
    if (mode === 'signup' && fields.name.value.trim().length < 2) return message('Informe seu nome completo.');
    $('submit-auth').disabled = true;
    message('Aguarde…');
    try {
      if (mode === 'signup') {
        const { data, error } = await client.auth.signUp({email:fields.email.value.trim(),password:fields.password.value,options:{emailRedirectTo:redirectTo,data:{full_name:fields.name.value.trim(),birth_date:fields.birth.value}}});
        if (error) throw error;
        form.reset();
        if (data.session) await showProfile(data.user);
        else message('Confira seu e-mail para continuar. Se você já tem uma conta, entre ou recupere sua senha.',true);
      } else if (mode === 'login') {
        const { data, error } = await client.auth.signInWithPassword({email:fields.email.value.trim(),password:fields.password.value});
        if (error) throw error;
        form.reset();
        await showProfile(data.user);
      } else {
        const { error } = await client.auth.updateUser({password:fields.password.value});
        if (error) throw error;
        await client.auth.signOut();
        setMode('login');
        message('Senha atualizada. Entre com sua nova senha.',true);
      }
    } catch (error) { message(friendly(error)); }
    finally { $('submit-auth').disabled = false; }
  });
  $('forgot-password').addEventListener('click',async () => {
    if (!client) return message('O acesso à conta ainda não está disponível.');
    if (!fields.email.reportValidity()) return;
    $('forgot-password').disabled = true;
    try {
      const { error } = await client.auth.resetPasswordForEmail(fields.email.value.trim(),{redirectTo});
      if (error) throw error;
      message('Se houver uma conta com esse e-mail, você receberá um link para redefinir a senha.',true);
    } catch(error) { message(friendly(error)); }
    finally { $('forgot-password').disabled = false; }
  });
  $('logout').addEventListener('click',async () => {
    $('logout').disabled = true;
    try { const { error } = await client.auth.signOut(); if (error) throw error; setMode('login'); }
    catch(error) { message(friendly(error)); }
    finally { $('logout').disabled = false; }
  });
  if (client) {
    let recovering = new URLSearchParams(location.hash.slice(1)).get('type') === 'recovery';
    client.auth.onAuthStateChange((event,session) => {
      if (event === 'PASSWORD_RECOVERY') { recovering = true; setMode('recovery'); }
      if (event === 'SIGNED_OUT') { recovering = false; setMode('login'); }
      if (event === 'INITIAL_SESSION' && session && !recovering) setTimeout(() => showProfile(session.user).catch(() => message('Não foi possível carregar o cadastro.')),0);
    });
    if (recovering) setMode('recovery');
  }
})();
