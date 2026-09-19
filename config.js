/**
 * CONFIGURAÇÃO PRINCIPAL DA LANDING PAGE
 * 
 * Centralize aqui o link de compra, informações de preço, order bump e caminhos das imagens.
 * Para publicar a página, lembre-se de substituir CHECKOUT_URL pelo link real da sua plataforma
 * (por exemplo: Kiwify, Hotmart, Eduzz, Braip, Cakto, etc.).
 */

const CONFIG = {
  // LINK DE COMPRA: Substitua pela URL da sua página de pagamento/checkout
  CHECKOUT_URL: "https://pay.cakto.com.br/o5ez8zz_1096891",

  // LINK DE COMPRA COM ORDER BUMP (Se a sua plataforma gerar um link direto com o bump ativado)
  CHECKOUT_URL_WITH_BUMP: "https://pay.cakto.com.br/o5ez8zz_1096891",

  // INFORMAÇÕES DO PRODUTO PRINCIPAL
  product: {
    name: "Atividades de Alfabetização",
    badge: "ATIVIDADES PARA IMPRIMIR",
    offerTitle: "500 páginas de atividades de alfabetização",
    priceNumber: 12.99,
    price: "R$ 12,99",
    priceUnit: "pagamento único",
    format: "Arquivos digitais em PDF e imagens",
    targetAudience: "Crianças em processo de alfabetização",
    disclaimer: "Você recebe arquivos digitais. Nenhum material físico será enviado.",
    printNotice: "A impressão é feita por você e não está incluída no valor do produto.",
  },

  // OFERTA SECUNDÁRIA (ORDER BUMP)
  orderBump: {
    enabled: true,
    tag: "OFERTA COMPLEMENTAR ESPECIAL",
    title: "+250 páginas de atividades de matemática infantil",
    description: "Adicione um material complementar exclusivo com 250 páginas ilustradas para praticar contagem, números, quantidades e operações simples.",
    priceNumber: 8.99,
    price: "R$ 8,99",
  },

  // MAPEAMENTO CENTRALIZADO DAS IMAGENS
  images: {
    // Imagem principal de destaque (Hero)
    heroProduct: "./images/material-01.png",
    
    // Imagens dos 4 cards de conteúdo
    math: "./images/material-12.png",
    phrases: "./images/material-04.png",
    language: "./images/material-03.png",
    syllables: "./images/material-02.png",

    // Imagem da seção "Uso no dia a dia" (aprendizado em família)
    familyLearning: "./images/material-07.png",

    // Imagem da seção "Como usar" (impressão em casa / formato digital)
    homePrinting: "./images/material-05.png",
  }
};

// Suporte universal (tanto para abertura direta via file:// quanto para servidores HTTP / módulos)
if (typeof window !== 'undefined') {
  window.APP_CONFIG = CONFIG;
}
