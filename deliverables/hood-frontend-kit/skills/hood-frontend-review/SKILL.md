---
name: hood-frontend-review
description: Revisar visual e funcionalmente catálogo, filtros, carrinho, modais e PDV do HOOD SPORTS, verificando teclado, foco, responsividade, performance e build. Use para auditoria ou validação de mudanças de frontend, sem corrigir fora do escopo pedido.
---

# Revisão de frontend HOOD

## Objetivo e escopo

Encontrar problemas que prejudiquem seleção, compra, reserva e operação de balcão; diferenciar regressões, limitações anteriores e hipóteses. Uma solicitação de revisão produz achados e evidências, não autoriza uma reformulação. Corrija somente quando o usuário também pedir correção, preservando o escopo.

## Arquivos a consultar

Leia `package.json`, `src/main.tsx`, `src/App.tsx`, `src/context/StoreContext.tsx`, `src/types/index.ts`, `src/data/mockProducts.ts`, `src/index.css` e `tailwind.config.js`. Conforme os fluxos, consulte `src/components/Navbar.tsx`, `Hero.tsx`, `ProductCatalog.tsx`, `ProductCard.tsx`, `CategoryFilter.tsx`, `ActiveCartDrawer.tsx`, `ReservationsModal.tsx`, `CheckoutSuccessModal.tsx`, `LoyaltySection.tsx`, `PdvTerminalView.tsx`, `FeaturesBanner.tsx` e `Footer.tsx`.

## Processo de revisão

1. Registre versão/estado atual, escopo da mudança e condições de teste. Leia o comportamento antes de presumir funcionalidades. Use um perfil de navegador isolado com dados fictícios; não apagar o carrinho do usuário para criar uma base de teste.
2. Inspecione a interface em 360/768/1440 px e zoom 200%. Confira hierarquia de nome, preço, seleção de tamanho e CTA. Verifique rótulos, imagens quebradas, estados vazios e botões cobertos por menus ou janelas.
3. Execute os cenários pertinentes abaixo e anote passos, entrada, esperado e observado. “Inspeção” não é “teste executado”; erro de console é evidência complementar, não substituto do fluxo.
4. Percorra o fluxo só com teclado: Tab, Shift+Tab, Enter, Espaço e Escape. Confira foco inicial, contenção e restauração em modais; anuncie resultado sem mover foco desnecessariamente. Teste movimento reduzido.
5. Para performance, compare builds de produção no mesmo aparelho/rede e registre peso de mídia/JS, frames em rolagem e tarefas longas. Emulação não comprova comportamento no dispositivo real.
6. Se houver alterações autorizadas, execute `npm run build` com as dependências existentes e repita apenas verificações afetadas. Não instalar ferramentas nem mudar configuração silenciosamente para transformar uma revisão em projeto de infraestrutura.

## Cenários do domínio

- Catálogo/filtros: conferir contagem atual, categorias, busca sem resultado e limpeza. No conjunto de referência são 23 itens, 15 de Times; ajustar expectativa se os dados tiverem sido alterados legitimamente.
- Tamanho/carrinho: mesmo produto e tamanho agrupam; tamanhos distintos permanecem em linhas separadas. Quantidade, remoção e esvaziamento recalculam sem ação duplicada.
- Referência financeira, somente se fixtures e regras continuam iguais: subtotal inicial R$ 849,70, desconto R$ 15,00, total R$ 834,70; ao resgatar R$ 62,50, total R$ 772,20. Nesse checkout, ganho de 1.158 pontos e R$ 38,61 de cashback. Não modificar regras para fazer o teste passar.
- Reservas da loja: criar, visualizar, cancelar e converter para carrinho. A ausência preexistente de expiração real ou de registro no PDV deve ser relatada, não apresentada como regressão da animação.
- Checkout simulado: carrinho vazio não gera pedido; pedido mostra itens, totais e método; fechamento não efetua nova compra. Não executar cobrança externa se o projeto tiver evoluído para pagamento real sem autorização correspondente.
- Persistência e canais: recarregar dados fictícios, alternar loja/PDV e conferir contadores online/físico. Fechar uma janela não deve limpar o carrinho. Repetir alternância para detectar efeitos/listeners duplicados.
- PDV: tempo de acesso a produto, quantidade e pagamento prevalece sobre decoração. Pesquisar sem correspondência e conferir que não aparece item indevido; registrar se a limitação já existia.

## Ferramentas e restrições

Leitura de arquivos, terminal e navegador. Ferramentas automatizadas de acessibilidade/performance são complementares quando disponíveis; não afirmar conformidade total por um único escore. Sem acesso ao navegador, entregar somente inspeção e cenários pendentes. Não instalar memória persistente, depender de subagentes ou exigir comandos de outro agente para usar esta skill.

## Critérios e formato dos achados

Priorize bloqueios de compra, perda de dados, valores incorretos e ação inacessível, seguidos por performance e consistência visual. Cada achado deve conter: gravidade, tela/arquivo, condição de reprodução, comportamento esperado/observado, evidência e menor correção viável. Se não for reproduzido, marcar como hipótese ou inspeção.

Critérios de aprovação: controles alcançáveis por teclado/toque; foco não perdido; conteúdo/CTA disponíveis com movimento reduzido; regras preservadas; nenhum erro novo de execução nos cenários verificados; build passando quando executado. Relate separadamente testes aprovados, falhas e não executados. Não afirmar “100% funcional”, “60 fps” ou “acessível” sem delimitar a evidência.

## Exemplo de solicitação

“Use $hood-frontend-review para revisar a nova gaveta do carrinho e os modais. Verifique teclado, foco, cálculo de cashback e alternância para PDV. Entregue achados e evidências sem alterar o projeto.”
