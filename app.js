/**
 * Inicialização dos Componentes e Comportamentos da Landing Page
 * Suporta tanto execução local direta (duplo clique no index.html) quanto em servidor web.
 */

document.addEventListener('DOMContentLoaded', () => {
  const CONFIG = window.APP_CONFIG || {
    CHECKOUT_URL: "https://pay.cakto.com.br/o5ez8zz_1096891",
    CHECKOUT_URL_WITH_BUMP: "https://pay.cakto.com.br/o5ez8zz_1096891",
    product: {
      priceNumber: 12.99,
      price: "R$ 12,99"
    },
    orderBump: {
      priceNumber: 8.99,
      price: "R$ 8,99"
    },
    images: {
      heroProduct: "./images/material-01.png",
      math: "./images/material-12.png",
      phrases: "./images/material-04.png",
      language: "./images/material-03.png",
      syllables: "./images/material-02.png",
      familyLearning: "./images/material-07.png",
      homePrinting: "./images/material-05.png",
    }
  };

  initImages(CONFIG);
  initOrderBump(CONFIG);
  initBuyButtons(CONFIG);
  initFaqAccordion();
  initMobileStickyBar();
  initSmoothScroll();
});

/**
 * Vincula as imagens mapeadas no arquivo config.js
 */
function initImages(config) {
  const imageMap = {
    'img-hero-product': config.images?.heroProduct,
    'img-content-math': config.images?.math,
    'img-content-phrases': config.images?.phrases,
    'img-content-language': config.images?.language,
    'img-content-syllables': config.images?.syllables,
    'img-family-learning': config.images?.familyLearning,
    'img-home-printing': config.images?.homePrinting,
  };

  Object.entries(imageMap).forEach(([elementId, src]) => {
    const el = document.getElementById(elementId);
    if (el && src) {
      el.src = src;
    }
  });
}

/**
 * Gerencia a lógica do Order Bump (+250 páginas de matemática)
 */
function initOrderBump(config) {
  const bumpCheckbox = document.getElementById('bump-checkbox');
  const bumpBox = document.getElementById('order-bump-box');
  const pricingAmount = document.getElementById('pricing-amount-display');
  const pricingLabel = document.getElementById('pricing-label-text');
  const pricingSub = document.getElementById('pricing-sub-display');
  const btnOfferLabel = document.getElementById('btn-offer-label');
  const bumpFeedback = document.getElementById('order-bump-feedback');
  const mobilePriceNumber = document.querySelector('.mobile-price-number');
  const mobileBtnLabel = document.querySelector('#btn-mobile-buy span');

  if (!bumpCheckbox) return;

  const basePrice = config.product?.priceNumber || 12.99;
  const bumpPrice = config.orderBump?.priceNumber || 8.99;
  const totalPrice = basePrice + bumpPrice;

  const formatPrice = (val) => val.toFixed(2).replace('.', ',');

  const updatePricingState = (isChecked) => {
    if (isChecked) {
      if (bumpBox) bumpBox.classList.add('is-active');
      if (pricingAmount) pricingAmount.textContent = formatPrice(totalPrice);
      if (pricingLabel) pricingLabel.textContent = 'Valor do pacote completo';
      if (pricingSub) pricingSub.textContent = '500 págs alfabetização + 250 págs matemática';
      if (btnOfferLabel) btnOfferLabel.textContent = `Quero o pacote completo por R$ ${formatPrice(totalPrice)}`;
      if (bumpFeedback) bumpFeedback.removeAttribute('hidden');
      if (mobilePriceNumber) mobilePriceNumber.textContent = `R$ ${formatPrice(totalPrice)}`;
      if (mobileBtnLabel) mobileBtnLabel.textContent = 'Quero o pacote completo';
    } else {
      if (bumpBox) bumpBox.classList.remove('is-active');
      if (pricingAmount) pricingAmount.textContent = formatPrice(basePrice);
      if (pricingLabel) pricingLabel.textContent = 'Valor total do material';
      if (pricingSub) pricingSub.textContent = 'pagamento único';
      if (btnOfferLabel) btnOfferLabel.textContent = `Quero comprar por R$ ${formatPrice(basePrice)}`;
      if (bumpFeedback) bumpFeedback.setAttribute('hidden', '');
      if (mobilePriceNumber) mobilePriceNumber.textContent = `R$ ${formatPrice(basePrice)}`;
      if (mobileBtnLabel) mobileBtnLabel.textContent = 'Quero o material';
    }
  };

  bumpCheckbox.addEventListener('change', (e) => {
    updatePricingState(e.target.checked);
  });

  updatePricingState(bumpCheckbox.checked);

  // Permite clicar em todo o card do bump para facilitar no celular
  if (bumpBox) {
    bumpBox.addEventListener('click', (e) => {
      // Se o clique foi fora do label e fora do input, inverte o estado manualmente
      if (!e.target.closest('label') && !e.target.closest('input')) {
        bumpCheckbox.checked = !bumpCheckbox.checked;
        bumpCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }
}

/**
 * Gerenciamento Centralizado dos Botões de Compra e Modal de Pendência
 */
function initBuyButtons(config) {
  const buyButtons = document.querySelectorAll('[data-action="buy"]');
  const modal = document.getElementById('checkout-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const okBtn = document.getElementById('modal-action-ok');
  const bumpCheckbox = document.getElementById('bump-checkbox');

  const getTargetCheckoutUrl = () => {
    const isBumpActive = bumpCheckbox && bumpCheckbox.checked;
    if (isBumpActive && config.CHECKOUT_URL_WITH_BUMP && !config.CHECKOUT_URL_WITH_BUMP.includes('COLE_SEU_LINK_DE_COMPRA_AQUI')) {
      return config.CHECKOUT_URL_WITH_BUMP.trim();
    }
    return (config.CHECKOUT_URL || '').trim();
  };

  const isCheckoutConfigured = () => {
    const url = getTargetCheckoutUrl();
    return url !== '' && !url.includes('COLE_SEU_LINK_DE_COMPRA_AQUI');
  };

  const handleBuyClick = (e) => {
    if (isCheckoutConfigured()) {
      e.currentTarget.href = getTargetCheckoutUrl();
    } else {
      e.preventDefault();
      openModal();
    }
  };

  const openModal = () => {
    if (!modal) return;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  const updateCheckoutLinks = () => {
    if (isCheckoutConfigured()) {
      buyButtons.forEach(btn => { btn.href = getTargetCheckoutUrl(); });
    }
  };
  updateCheckoutLinks();
  if (bumpCheckbox) bumpCheckbox.addEventListener('change', updateCheckoutLinks);

  buyButtons.forEach(btn => {
    btn.addEventListener('click', handleBuyClick);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (okBtn) okBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
        closeModal();
      }
    });
  }
}

/**
 * Acordeão Acessível de Perguntas Frequentes (WAI-ARIA)
 */
function initFaqAccordion() {
  const accordion = document.getElementById('faq-accordion');
  if (!accordion) return;

  const triggers = Array.from(accordion.querySelectorAll('.accordion-trigger'));

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      const item = trigger.closest('.accordion-item');

      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        if (panel) panel.setAttribute('hidden', '');
        if (item) item.classList.remove('is-open');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        if (panel) panel.removeAttribute('hidden');
        if (item) item.classList.add('is-open');
      }
    });

    // Navegação por teclado entre as perguntas (Acessibilidade)
    trigger.addEventListener('keydown', (e) => {
      let targetIndex = -1;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        targetIndex = (index + 1) % triggers.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        targetIndex = (index - 1 + triggers.length) % triggers.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        targetIndex = triggers.length - 1;
      }

      if (targetIndex !== -1) {
        triggers[targetIndex].focus();
      }
    });
  });
}

/**
 * Barra Fixa Inferior Mobile com IntersectionObserver
 * Aparece quando o usuário rola a tela e se oculta discretamente ao chegar na seção de oferta
 */
function initMobileStickyBar() {
  const stickyBar = document.getElementById('mobile-sticky-bar');
  const offerSection = document.getElementById('oferta');
  const heroSection = document.getElementById('o-material');
  if (!stickyBar) return;

  let heroPassed = false;
  let offerVisible = false;

  const updateVisibility = () => {
    if (window.innerWidth <= 768) {
      if (heroPassed && !offerVisible) {
        stickyBar.classList.remove('is-hidden');
      } else {
        stickyBar.classList.add('is-hidden');
      }
    }
  };

  if ('IntersectionObserver' in window) {
    if (heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          heroPassed = !entry.isIntersecting;
          updateVisibility();
        });
      }, { threshold: 0.1 });
      heroObserver.observe(heroSection);
    }

    if (offerSection) {
      const offerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          offerVisible = entry.isIntersecting;
          updateVisibility();
        });
      }, { threshold: 0.15 });
      offerObserver.observe(offerSection);
    }
  }

  window.addEventListener('resize', updateVisibility);
}

/**
 * Rolagem Suave Personalizada para os Links de Navegação Interna
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Move foco para o elemento de destino (Acessibilidade)
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}
