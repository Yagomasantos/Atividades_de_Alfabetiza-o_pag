# Ativar contas e banco de dados

A página foi redesenhada e o fluxo de conta está implementado. O banco remoto ainda precisa ser criado e conectado. Enquanto auth-config.js estiver vazio, nenhum cadastro é enviado ou simulado.

1. Crie um projeto Supabase de sua propriedade em https://supabase.com/dashboard.
2. No SQL Editor desse novo projeto, execute database.sql uma vez. Ele cria profiles, as restrições de acesso e o gatilho que salva nome e nascimento junto da criação da conta. O e-mail fica no Supabase Auth, evitando duplicação; as senhas são gerenciadas pelo Auth.
3. Em auth-config.js, preencha url com a URL do projeto e publishableKey com a chave publicável (ou anon). Nunca coloque uma chave secret/service_role no site e nunca compartilhe sua senha administrativa.
4. Em Authentication / URL Configuration, configure Site URL com o domínio publicado e adicione a URL completa de conta.html à lista de redirecionamentos permitidos.
5. Ative confirmação de e-mail, defina senha mínima de 8 caracteres e configure seu envio SMTP para confirmação e recuperação de senha em produção. Confira os limites de envio do seu plano.
6. Publique os arquivos do site em hospedagem HTTPS. A conta usa o SDK do Supabase via CDN e precisa de acesso à internet. O site continua sendo HTML, CSS e JavaScript, sem processo de compilação.
7. Faça um cadastro real de teste, confirme o e-mail, entre, consulte os dados, saia e teste a recuperação de senha. Verifique o registro em Authentication / Users e Table Editor / profiles. Cadastre uma segunda conta e confirme que ela não consegue consultar o perfil da primeira. Esses testes dependem do projeto conectado e ainda não foram executados.

O dono do projeto consulta todos os cadastros no painel Supabase. Visitantes não têm acesso à tabela e usuários autenticados só leem seu próprio perfil. Não há painel administrativo público. O cadastro não libera compras ou arquivos pagos: o checkout existente continua independente.

Antes de abrir os cadastros ao público, defina o responsável pelos dados, contato, finalidade da data de nascimento e prazo de retenção para sua política de privacidade. O formulário pede dados do titular da conta, não da criança. O aviso atual explica o uso para cadastro; não substitui uma política específica do negócio.

Referências: https://supabase.com/docs/guides/auth/managing-user-data e https://supabase.com/docs/reference/javascript/auth-signup.
