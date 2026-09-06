# HOOD SPORTS - E-commerce & Terminal PDV Omnichannel

Aplicação moderna, 100% funcional e responsiva para a **HOOD SPORTS**, loja especializada em esportes de alta performance, calçados com propulsão, vestuário de compressão e equipamentos de treino.

O projeto une a experiência de uma **Landing Page de Alta Conversão** com um **Terminal PDV / Balcão de Checkout Interativo**, fiel ao design fornecido e preparado para receber autenticação, banco de dados relacional e a totalidade dos 15 requisitos funcionais e 5 não-funcionais.

---

## 📸 Identidade Visual & Mockup Integrado

- **Logo**: Logotipo oficial com o símbolo 'H' em seta ascendente ciano/preta.
- **Paleta de Cores**:
  - `Grafite Profundo`: `#0A0D14` / `#131822` / `#1E2536`
  - `Ciano Neon / Turquesa de Performance`: `#00E5FF` / `#00C8E0`
  - `Branco & Slate`: `#FFFFFF` / `#94A3B8`
- **Modo Terminal PDV (Balcão de Atendimento)**:
  - Réplica fiel da interface enviada com catálogo rápido, filtros por pílula (*Shoes*, *Apparel*, *Equipment*), *Active Cart* com cálculo dinâmico, perfil do cliente (*João da Silva*), pontos de fidelidade (2050 pts), saldo de cashback (R$ 62,50) e métodos de pagamento (*Credit Card*, *Debit Card*, *Cash*, *Pix* e botão luminoso *Use Cashback*).

---

## 🚀 Funcionalidades Implementadas (100% Funcionais)

1. **Catálogo Dinâmico & Reativo**:
   - Filtro instantâneo por categorias (*Shoes*, *Apparel*, *Equipment* ou *Todos*).
   - Barra de busca em tempo real com debounce por modelo, categoria ou palavras-chave.
   - Cards com foto em alta resolução, seletor de tamanho (*38 ao 44*, *P ao GG*), preço promocional e preço original riscado.

2. **Carrinho de Compras Ativo (Active Cart)**:
   - Adição com um clique via botão **Add to Order** ou catálogo principal.
   - Incremento, decremento e remoção de itens com recálculo instantâneo de subtotal.
   - Aplicação de descontos automáticos.
   - **Sistema de Cashback**: Botão interativo para abater até o valor total disponível na carteira de cashback do cliente.
   - Gaveta lateral (Drawer) na Landing Page e painel fixo central no Terminal PDV.

3. **Sistema de Reserva em Loja Física (Reserve)**:
   - Botão **Reserve** em todos os produtos.
   - Modal exclusivo de gerenciamento de reservas (guarda o produto por 3 dias para retirada em loja ou conversão direta para compra).

4. **Clube de Fidelidade & Cashback**:
   - Acúmulo de **1.5 pontos por real** gasto.
   - Geração de **5% de cashback** a cada pedido concluído.
   - Métricas de compras em loja física (*10 compras*) e online (*5 compras*).

5. **Fechamento de Pedido & Cupom Fiscal Simulado**:
   - Modal com comprovante / cupom detalhado de venda.
   - Discriminação de itens, tamanhos, descontos, cashback utilizado e forma de pagamento.
   - Opção de impressão direta do cupom (`window.print()`).

6. **Alternador Rápido de Modos**:
   - Botão **"Terminal PDV (Mockup)"** no cabeçalho permite alternar a qualquer momento entre a Loja Virtual e o Terminal de Caixa.

---

## 🛠️ Tecnologias Utilizadas

- **React 18** com **TypeScript**
- **Vite 5** (bundler ultrarrápido)
- **Tailwind CSS 3** (design system customizado)
- **Lucide React** (ícones de alta legibilidade)
- **Context API & LocalStorage** (persistência em tempo real no navegador)

---

## 💻 Como Rodar o Projeto Localmente

1. Abra o terminal na pasta do projeto:
   ```bash
   cd c:\Users\jean\Downloads\A3-LojaSports
   ```

2. Instale as dependências (já instaladas):
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   Acesse no seu navegador: `http://localhost:5173`

4. Para gerar o build de produção:
   ```bash
   npm run build
   ```

---

## 🏗️ Preparação para os 15 Requisitos Funcionais & 5 Não-Funcionais

O código está estruturado com tipagem estrita em `src/types/index.ts` e serviços desacoplados em `src/context/StoreContext.tsx`. Para conectar um banco de dados real (PostgreSQL, Supabase ou MySQL) e uma API REST/GraphQL futuramente:
- Basta substituir as chamadas de estado local em `StoreContext.tsx` por requisições `fetch`/`axios` ou clientes ORM como Prisma/Supabase-js.
- As entidades `Product`, `CustomerProfile`, `CartItem`, `Order` e `Reservation` já estão modeladas como schemas relacionais.

