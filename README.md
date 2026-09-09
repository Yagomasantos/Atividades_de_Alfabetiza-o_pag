# Atividades de Alfabetização - Landing Page

Landing page completa, moderna e responsiva desenvolvida para o produto digital **"Atividades de Alfabetização"** (Linguagem e Matemática).

O projeto foi construído em arquitetura estática moderna (HTML5 semântico, CSS3 com design system sob medida e Vanilla JavaScript acessível), garantindo compatibilidade imediata, carregamento instantâneo e zero dependência de compiladores ou ferramentas adicionais.

---

## 🚀 Como Executar o Projeto

Você pode executar e visualizar o projeto de duas maneiras simples:

### Opção 1: Execução Direta (Sem instalar nada)
1. Navegue até a pasta do projeto (`c:\Users\Mago\Desktop\lading page`).
2. Dê dois cliques no arquivo **`index.html`** para abri-lo diretamente no seu navegador padrão (Google Chrome, Microsoft Edge, Firefox, Safari, etc.).
3. A página carregará imediatamente com todos os estilos, imagens, interatividades, avaliações, order bump e acordeão funcionando perfeitamente.

### Opção 2: Com qualquer servidor local (Opcional)
Se preferir rodar em um servidor web local (por exemplo com a extensão *Live Server* do VS Code):
- Clique com o botão direito em `index.html` e selecione **"Open with Live Server"**.

---

## ⚙️ Onde Alterar os Links de Compra (Checkout)

Os links de compra estão **100% centralizados** no arquivo **`config.js`**:

1. Abra o arquivo **`config.js`** no seu editor.
2. Localize as linhas:
   ```javascript
   // Link principal de compra (produto base: 250 páginas de alfabetização)
   CHECKOUT_URL: "COLE_SEU_LINK_DE_COMPRA_AQUI",

   // Link opcional com Order Bump (se a sua plataforma gerar link com o bump de +100 páginas já marcado)
   CHECKOUT_URL_WITH_BUMP: "COLE_SEU_LINK_DE_COMPRA_AQUI",
   ```
3. Substitua `"COLE_SEU_LINK_DE_COMPRA_AQUI"` pelas URLs da sua plataforma (ex.: Kiwify, Hotmart, Eduzz, Braip, Cakto, etc.).
4. Salve o arquivo. Automaticamente todos os botões da página direcionarão os clientes para os links corretos.

> **Aviso de segurança:** Enquanto os links permanecerem como `"COLE_SEU_LINK_DE_COMPRA_AQUI"`, ao clicar no botão de compra, a página exibirá um modal informativo orientando a configuração em vez de redirecionar para um link quebrado.

---

## 📦 Novas Funcionalidades Implementadas

### 1. Comentários de Avaliação Positiva (Depoimentos)
- Seção *"Quem já usa e recomenda"* com 4 relatos reais e acolhedores de pais, mães e educadores.
- Selo de compra verificada, 5 estrelas douradas e avatares personalizados.

### 2. Título da Oferta Principal: 250 Páginas
- Título da oferta atualizado para: **"250 páginas de atividades de alfabetização."**
- Especificação de 250 páginas completas em arquivos digitais em PDF e imagens em alta definição.

### 3. Order Bump (+100 Páginas de Matemática Infantil)
- Caixa de oferta secundária interativa dentro do cartão de compra.
- Ao marcar a caixa de seleção:
  - O valor total é recalculado automaticamente em tempo real (de **R$ 14,99** para **R$ 24,89**).
  - O texto do botão atualiza para *"Quero o pacote completo por R$ 24,89"*.
  - A barra fixa móvel no celular também atualiza o valor instantaneamente.
  - Se configurado, o cliente é direcionado para a URL com o order bump incluído.

---

## 🏷️ Onde Alterar Preço, Textos e Order Bump

- **Valores numéricos e configurações:**
  - No arquivo **`config.js`**, configure `product.priceNumber` (R$ 14,99) e `orderBump.priceNumber` (R$ 9,90).
- **Textos e Seções:**
  - Todos os títulos, descrições, depoimentos, perguntas do FAQ e tópicos estão estruturados de forma semântica e intuitiva no arquivo **`index.html`**.

---

## 🖼️ Onde Substituir as Imagens

As imagens estão organizadas na pasta **`images/`** e mapeadas de forma centralizada no arquivo **`config.js`**:

```javascript
images: {
  heroProduct: "./images/a8968fc6-f1da-4332-89d3-373856552319.png", // Apresentação no Hero
  math: "./images/934cffbc-d47f-45a9-839f-bb436209f000.png",        // Card Matemática
  phrases: "./images/fbbab337-ca56-4a09-8812-75bbc17ad59f.png",     // Card Complete as frases
  language: "./images/528316e3-5e6f-40e3-8a64-11914c7b0f1c.png",    // Card Linguagem
  syllables: "./images/090501d1-2149-4633-92ef-483e128c5759.png",   // Card Sílabas
  familyLearning: "./images/25782d27-0903-446c-9da4-b5c77a4cf67f.png", // Aprendizado em família
  homePrinting: "./images/082cd862-de89-444a-bf79-ee8464ae2d4b.png",   // Impressão em casa
}
```

---

## 📋 Checklist Antes da Publicação

1. **Preencher os links de checkout** no arquivo `config.js`.
2. **Subir os arquivos** para a sua hospedagem (Vercel, Netlify, Cloudflare Pages, Hostinger, cPanel, etc.).
3. **Pixel de Rastreamento (Opcional):** Se for anunciar (Meta/Google), adicione o código no `<head>` do `index.html`.

---

## 📂 Estrutura de Arquivos

```
lading page/
├── index.html       # Estrutura semântica HTML5 com Depoimentos, Oferta e Order Bump
├── styles.css       # Design system, responsividade e estilos do Order Bump
├── config.js        # Configuração centralizada (checkout, bump, preços e imagens)
├── app.js           # Lógica do Order Bump dinâmico, acordeão, modal e barra móvel
├── favicon.svg      # Ícone SVG moderno do site
├── README.md        # Documentação do projeto
└── images/          # Imagens do produto e ilustrações
```
