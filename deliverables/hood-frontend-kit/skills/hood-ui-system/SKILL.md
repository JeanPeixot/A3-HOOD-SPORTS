---
name: hood-ui-system
description: Refinar identidade visual, tokens, tipografia, controles e responsividade do frontend HOOD SPORTS, preservando catálogo, carrinho e PDV. Use para ajustes de interface e consistência visual; não para alterar regras de venda.
---

# Sistema de interface HOOD

## Objetivo e escopo

Tornar a loja esportiva consistente e legível, preservando a identidade escura/ciano e os fluxos existentes. Se o pedido for apenas análise ou proposta, entregue recomendações sem editar a aplicação. Esta skill não é autorização para reformulação completa, instalação de pacotes ou publicação.

## Contexto a consultar

Localize a raiz do projeto informado; não suponha um caminho absoluto fixo. Leia `package.json`, `tailwind.config.js`, `src/index.css`, `index.html`, `src/App.tsx`, `src/types/index.ts` e `src/context/StoreContext.tsx`. Consulte os componentes afetados em `src/components/`: `Navbar.tsx`, `Hero.tsx`, `ProductCard.tsx`, `ProductCatalog.tsx`, `CategoryFilter.tsx`, `FeaturesBanner.tsx`, `LoyaltySection.tsx`, `Footer.tsx`, `ActiveCartDrawer.tsx`, `ReservationsModal.tsx`, `CheckoutSuccessModal.tsx`, `PdvTerminalView.tsx`.

Na base de referência, React 18, Vite 5, Tailwind 3 e Lucide já estão presentes. Reconfirme versões: não use convenções Tailwind 4 ou React 19 automaticamente. Os tokens incluem fundo #0A0D14, card #131822, ciano #00E5FF; Inter serve à leitura e Montserrat aos títulos. Preserve a identidade salvo solicitação explícita de mudança de marca.

## Processo

1. Identifique a tarefa do usuário em cada tela e registre os estados existentes. Preserve preço, tamanho, quantidade, reserva, pontos, cashback e meio de pagamento; leia o contexto para separar apresentação de regra de negócio.
2. Compare tokens configurados com cores/medidas repetidas nos componentes. Reutilize os existentes antes de acrescentar variantes. Defina diferenças intencionais entre a loja editorial e o PDV denso, sem obrigá-los a ter a mesma composição.
3. Proponha ou aplique, conforme o pedido, uma escala curta de espaçamento e tipografia. Garanta hierarquia de produto → preço → seleção → CTA. Use ciano como destaque seletivo; evite brilho competindo com texto.
4. Preserve Lucide e padronize tamanho/traço. Nomeie botões apenas com ícone; ícones decorativos não devem duplicar o texto anunciado. Não atualizar a biblioteca apenas para redesenhar um botão.
5. Verifique normal, foco, pressionado, selecionado, desabilitado, vazio e sucesso onde pertinentes. Estados não devem depender apenas de cor ou hover. Use HTML semântico antes de acrescentar ARIA.
6. Após mudança autorizada, compare as telas e execute os fluxos afetados. Informe evidências, lacunas e limitações preexistentes separadamente.

## Ferramentas e restrições

Leitura/edição de arquivos, terminal e navegador são suficientes; ferramenta de medição de contraste é necessária para aprovar contraste. Sem navegador, relate avaliação visual como não executada. Reutilize dependências locais e só acrescente uma quando o escopo permitir e houver benefício concreto. Não copiar imagens de galerias ou componentes sem licença identificada. Não inventar promoções, disponibilidade ou pagamento real.

No PDV, evitar parallax, giro 3D, grandes transições e números contando progressivamente. A atualização comercial deve ser imediata. Não modificar a prancheta ou documentos acadêmicos como efeito colateral de uma melhoria de interface.

## Critérios verificáveis

- Conferir 360, 768 e 1440 px e zoom 200%; nenhum CTA/preço inacessível nem rolagem horizontal da página.
- Medir contraste do texto normal ≥4,5:1 e grande ≥3:1 nas cores realmente compostas; verificar foco visível. Não declarar acessibilidade completa somente com essas medidas.
- Controles operáveis por teclado, estado selecionado discernível e meta de área de toque de 44×44 px para controles principais, ajustada ao contexto sem perder operabilidade.
- Compra, reserva e alternância de modos mantêm as regras e dados anteriores. Textos financeiros continuam em BRL e pontos não se confundem com dinheiro.
- Para alterações de código, `npm run build` deve passar com as dependências existentes; não dizer que esse comando testa usabilidade.

## Exemplo de solicitação

“Use $hood-ui-system para uniformizar os cards e os filtros do HOOD, preservando os preços, tamanhos, ações de compra e reserva. Mantenha as fontes e a paleta atuais e valide móvel e teclado.”
