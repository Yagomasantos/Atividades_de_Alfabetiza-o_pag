/**
 * CONFIGURAÇÃO PRINCIPAL DA LANDING PAGE
 * 
 * Centralize aqui o link de compra, informações de preço, order bump e caminhos das imagens.
 * Para publicar a página, lembre-se de substituir CHECKOUT_URL pelo link real da sua plataforma
 * (por exemplo: Kiwify, Hotmart, Eduzz, Braip, Cakto, etc.).
 */

const CONFIG = {
  // LINK DE COMPRA: Substitua pela URL da sua página de pagamento/checkout
  CHECKOUT_URL: "COLE_SEU_LINK_DE_COMPRA_AQUI",

  // LINK DE COMPRA COM ORDER BUMP (Se a sua plataforma gerar um link direto com o bump ativado)
  CHECKOUT_URL_WITH_BUMP: "COLE_SEU_LINK_DE_COMPRA_AQUI",

  // INFORMAÇÕES DO PRODUTO PRINCIPAL
  product: {
    name: "Atividades de Alfabetização",
    badge: "ATIVIDADES PARA IMPRIMIR",
    offerTitle: "250 páginas de atividades de alfabetização",
    priceNumber: 14.99,
    price: "R$ 14,99",
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
    title: "+100 páginas de exercícios de matemática infantil",
    description: "Adicione um material complementar exclusivo com 100 páginas ilustradas para praticar contagem, números, quantidades e operações simples.",
    priceNumber: 9.90,
    price: "R$ 9,90",
  },

  // MAPEAMENTO CENTRALIZADO DAS IMAGENS
  images: {
    // Imagem principal de destaque (Hero)
    heroProduct: "./images/a8968fc6-f1da-4332-89d3-373856552319.png",
    
    // Imagens dos 4 cards de conteúdo
    math: "./images/934cffbc-d47f-45a9-839f-bb436209f000.png",
    phrases: "./images/fbbab337-ca56-4a09-8812-75bbc17ad59f.png",
    language: "./images/528316e3-5e6f-40e3-8a64-11914c7b0f1c.png",
    syllables: "./images/090501d1-2149-4633-92ef-483e128c5759.png",

    // Imagem da seção "Uso no dia a dia" (aprendizado em família)
    familyLearning: "./images/25782d27-0903-446c-9da4-b5c77a4cf67f.png",

    // Imagem da seção "Como usar" (impressão em casa / formato digital)
    homePrinting: "./images/082cd862-de89-444a-bf79-ee8464ae2d4b.png",
  }
};

// Suporte universal (tanto para abertura direta via file:// quanto para servidores HTTP / módulos)
if (typeof window !== 'undefined') {
  window.APP_CONFIG = CONFIG;
}
