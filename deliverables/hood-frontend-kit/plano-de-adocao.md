# Plano de adoção — HOOD SPORTS

Data: 10/09/2026. Este é um plano para implementação futura. Nenhuma mudança de interface ou dependência foi aplicada nesta tarefa. Esforços e orçamentos abaixo são propostas de trabalho, não medições nem orçamentos comerciais.

## Sequência recomendada

| Etapa | Entrega | Recursos | Esforço relativo | Condição de avanço |
|---|---|---|---|---|
| 0 | Registrar estado atual e fluxos; distinguir defeitos existentes de regressões | hood-frontend-review | Baixo | Cenários e capturas de referência em perfil de teste; problemas do PDV registrados |
| 1 | Consolidar cores, tipografia, espaçamento e estados dos controles | hood-ui-system, CSS, Lucide existente, Colors Visualizer | Baixo a médio | Preços/CTAs legíveis, contraste medido, nenhum fluxo removido |
| 2 | Melhorar carrinho, reservas e comprovante por teclado | Radix Dialog ou alternativa nativa, conforme decisão técnica | Médio | Foco inicial/contido/restaurado, Escape, rolagem e leitura verificados |
| 3 | Adicionar microinterações discretas e feedback | CSS, Intersection Observer, referências 60fps | Baixo | Ação imediata; movimento não condiciona compra; versão reduzida equivalente |
| 4 | Prototipar uma narrativa de coleção | GSAP/ScrollTrigger + adaptador React, se CSS não bastar | Médio | Rolagem nativa, limpeza em StrictMode, orçamento e aparelho real aprovados |
| 5 | Avaliar mídia de campanha ou visualização 3D | HyperFrames OU Three.js/Fiber 8 conforme necessidade | Alto para 3D | Assets licenciados, benefício demonstrável, fallback e custo medidos |

GSAP é uma das melhores opções para um efeito específico, mas não é a primeira instalação. Não adicionar simultaneamente outra engine de animação para fazer o mesmo trabalho. 21st.dev é fonte opcional para escolher uma composição após a definição de tokens, não uma migração de design system. Skills Vercel complementam a revisão; não demandam mudança para Next.js.

## 1. Sistema visual consistente

- **Arquivos:** `tailwind.config.js`, `src/index.css`, `index.html`, `src/components/Navbar.tsx`, `Hero.tsx`, `ProductCard.tsx`, `Footer.tsx` e `PdvTerminalView.tsx`.
- **Efeito:** preservar a marca esportiva e reduzir diferenças de cinza, borda, raio e densidade entre loja e PDV. Preço e CTA principal devem vencer a decoração na hierarquia.
- **Recursos:** hood-ui-system, tokens existentes e Lucide. Colors Visualizer serve apenas como bancada de paletas; medir contraste independentemente.
- **Alternativa simples:** reutilizar as classes e a configuração atuais, sem criar um pacote de componentes ou importar outra fonte.
- **Direção inicial proposta:** manter Inter para leitura e Montserrat para títulos; escala de espaçamento 4/8/12/16/24/32/48/64 px; controles principais com alvo de 44×44 px como meta de projeto; texto operacional de 14–16 px; títulos fluidos sem cortar palavras; no máximo uma ação ciano dominante por bloco. São sugestões sujeitas ao layout real.
- **Móvel:** preservar preço, tamanho e botões; permitir quebra de filtros e evitar tabelas/CTAs fora da largura de 360 px. Não depender de hover.
- **Movimento reduzido:** mesmo layout, foco e contraste, sem pulsação decorativa.
- **Aceite:** contraste de texto normal ≥4,5:1 e texto grande ≥3:1; foco visível; zoom 200% sem perda de ação; 360/768/1440 px sem rolagem horizontal da página. Medir cores compostas reais, incluindo transparência. Referência: [W3C — contraste](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

## 2. Hero com produto e parallax sutil

- **Arquivo:** `src/components/Hero.tsx`.
- **Efeito:** destacar o produto com pequeno deslocamento da imagem ou fundo, mantendo nome, preço e CTA fixos e legíveis. Usar o asset atual ou uma imagem cuja licença tenha sido confirmada.
- **Recurso:** inicialmente CSS; GSAP/ScrollTrigger apenas se for necessário sincronizar a imagem à rolagem.
- **Alternativa nativa:** composição estática com luz/fundo em CSS e transição curta no acionamento. Não é obrigatório reproduzir parallax.
- **Móvel:** sem parallax; imagem com dimensões reservadas e CTA imediatamente acessível. Evitar grandes áreas de blur em tempo real.
- **Movimento reduzido:** estado final estático desde a primeira exibição; sem escala ou deslocamento contínuo.
- **Aceite:** nome/preço/CTA não dependem de completar animação; imagem não cobre controles; ordem de leitura preservada; não piorar o carregamento do conteúdo principal além do orçamento acordado. Deslocamento máximo inicial proposto: 16 px, validado visualmente antes de ampliar.

## 3. Coleção com narrativa por rolagem

- **Arquivos:** `src/App.tsx` para inserir uma seção editorial entre Hero e catálogo; novo componente proposto `src/components/CollectionStory.tsx`. `ProductCatalog.tsx` permanece como catálogo funcional, sem ser transformado em slideshow.
- **Efeito:** apresentar até três benefícios de uma coleção com imagem sticky e texto em fluxo normal. Âncora “Ir ao catálogo” disponível desde o início.
- **Recurso:** CSS sticky primeiro; GSAP/ScrollTrigger apenas para uma timeline coordenada e delimitada nessa seção.
- **Alternativa nativa:** `position: sticky` com cartões sequenciais; se precisar apenas marcar a etapa visível, Intersection Observer. Sem suavizador de rolagem adicional.
- **Móvel:** blocos empilhados, sem pinning e sem exigir vários gestos para chegar aos produtos.
- **Movimento reduzido:** sem scrub/parallax; imagens e textos estáticos. Sticky também pode ser desativado se prolongar navegação.
- **Aceite:** wheel, touch, PageDown, Home/End e âncoras continuam funcionando; nenhum `preventDefault` global para controlar scroll; conteúdo não é ocultado por falha de script; nenhum pin permanece ao alternar para PDV; não alterar a altura da página a cada filtro. [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) e [CSS position](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position).

## 4. Entrada progressiva sem atrasar catálogo

- **Arquivos:** `src/components/FeaturesBanner.tsx`, `LoyaltySection.tsx` e, se houver benefício medido, apenas os primeiros itens de `ProductCatalog.tsx`.
- **Efeito:** uma entrada curta para comunicar agrupamento, sem animar cada item em cada filtro.
- **Recurso:** CSS + Intersection Observer compartilhado, desconectado após o uso.
- **Alternativa nativa ainda menor:** conteúdo completamente estático; separação por espaçamento e contraste.
- **Móvel:** remover cascatas longas; limitar duração total, sem espera proporcional ao número de cards.
- **Movimento reduzido:** conteúdo visível imediatamente, sem classes que o mantenham invisível.
- **Aceite:** todos os 23 produtos continuam descobríveis; busca e filtro não reiniciam animação de entrada que atrase clique; observador e listeners removidos na desmontagem; não esconder conteúdo com `opacity: 0` antes de confirmar suporte/ativação. [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## 5. Cards, tamanhos e filtros

- **Arquivos:** `src/components/ProductCard.tsx`, `CategoryFilter.tsx`, `ProductCatalog.tsx`.
- **Efeito:** estados normal/foco/selecionado/pressionado/sucesso claros. A seleção deve permanecer perceptível sem depender só da cor. Texto de resultado acompanha filtro.
- **Recurso:** CSS e Lucide existente; observar exemplos de confirmação no 60fps, sem copiar gravações.
- **Alternativa nativa:** mudança de borda e rótulo instantânea, `aria-pressed` nos controles de alternância e sem animação.
- **Móvel:** toque não exige hover; filtros quebram linha; nomes e preços não são truncados de modo a impedir identificação.
- **Movimento reduzido:** trocar estados sem scale/slide; manter ícone e mensagem.
- **Aceite:** Tab/Enter/Espaço operam tamanhos e filtros; M e G do mesmo produto continuam separados no carrinho; duas adições do mesmo tamanho continuam agrupadas; consulta vazia mantém mensagem apropriada; efeito não chama a ação comercial duas vezes. Transições iniciais propostas: 120–180 ms, não um requisito de biblioteca.

## 6. Feedback e acessibilidade do carrinho/modais

- **Arquivos:** `src/components/ActiveCartDrawer.tsx`, `ReservationsModal.tsx`, `CheckoutSuccessModal.tsx`, `src/App.tsx` para o aviso global.
- **Efeito:** feedback imediato de adição e total; diálogo com título, foco coerente e fechamento previsível. Confirmação de pagamento continua explicitamente simulada.
- **Recurso:** Radix Dialog para estrutura e CSS para transição. Reutilizar o aviso atual; não instalar biblioteca de toast apenas por estética.
- **Alternativa nativa:** elemento `<dialog>` com comportamento testado, ou correção do diálogo atual; a alternativa exige cuidar de foco, fundo inerte, teclado e restauração de scroll.
- **Móvel:** gaveta/janela respeita viewport dinâmica e teclado virtual; resumo e finalizar alcançáveis com carrinho longo; fundo não rola durante a interação modal.
- **Movimento reduzido:** abrir/fechar sem deslizamento, mantendo gestão de foco. Mensagem `role="status"` pode anunciar alterações sem roubar foco.
- **Aceite:** título acessível, foco inicial útil, Tab contido, Escape fecha quando apropriado, foco retorna ao acionador; não deixar foco em botão removido após excluir item; anúncio único por operação; fechar não limpa o carrinho; impressão ainda disponível; nenhuma alteração nos valores. [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog), [ARIA status](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role).

## 7. Fidelidade e PDV

- **Arquivos:** `src/components/LoyaltySection.tsx`, `PdvTerminalView.tsx`.
- **Efeito:** benefícios legíveis e confirmação clara. No PDV, hierarquia de produto, quantidade, subtotal, desconto, cashback e valor final; nenhuma sequência cinematográfica.
- **Recurso:** tokens, CSS e Lucide existente.
- **Alternativa nativa:** números estáticos atualizados instantaneamente; dispensar contadores animados.
- **Móvel:** colunas empilhadas em ordem operacional; manter meios de pagamento acessíveis e não sobrepor controles.
- **Movimento reduzido:** mesmo comportamento estático; não contar saldo de zero até o novo valor.
- **Aceite:** alteração de quantidade atualiza totais sem esperar transição; distinguir pontos de moeda; métodos continuam disponíveis; trocar loja/PDV preserva carrinho e perfil; instruções não representam simulação como recebimento real. Falhas preexistentes de busca/reserva devem ser tratadas em escopo funcional próprio, sem alegar que animação as resolve.

## 8. Mídia e visualização 3D opcionais

- **Arquivos:** ponto de entrada em `Hero.tsx`; novo componente proposto `ProductViewer.tsx` apenas se aprovado; assets separados de `mockProducts.ts` até a modelagem ser definida.
- **Efeito:** permitir inspecionar características que a foto não explica, como solado. Uma animação decorativa isolada não justifica 3D.
- **Recurso:** Three.js + Fiber 8 para React 18. HyperFrames é alternativa para gerar um vídeo de campanha fora do frontend, não substitui o visualizador interativo nem deve ser instalado no runtime da loja.
- **Alternativa nativa:** galeria de imagens estáticas frente/lado/solado ou vídeo curto com controles e poster.
- **Móvel:** imagem padrão; carregar 3D somente após intenção explícita; reduzir resolução e pausar fora da área visível. Se GPU/WebGL falhar, manter a foto e a compra acessíveis.
- **Movimento reduzido:** não girar automaticamente; controles manuais e descrição textual. Nenhum conteúdo comercial essencial só no canvas/vídeo.
- **Aceite:** modelo e texturas com origem/licença registradas; carregamento sob demanda em chunk separado; nenhum download de modelo na abertura comum do catálogo/PDV; recursos de GPU liberados ao sair; memória não cresce continuamente após cinco aberturas; medir custo real antes de definir limite em MB. Não combinar Three atual com Fiber 8 sem verificar peers e testes. [Pareamento Fiber/React](https://github.com/pmndrs/react-three-fiber).

## Verificação de performance e regressão

Antes/depois devem usar o mesmo conjunto de dados, build de produção, rede, viewport e máquina. Registrar navegador e versões exatas durante a execução. Matriz proposta: Chrome em desktop 1440×900; Safari em iPhone 13 real; Chrome em Android intermediário, por exemplo Galaxy A54 real. Esses dispositivos são alvos sugeridos, não equipamentos testados nesta pesquisa. Sem acesso físico, relatar emulação como emulação.

Executar três passagens por cenário: abrir loja, rolar Hero/coleção, filtrar Times, buscar, adicionar e remover, abrir/fechar carrinho, alternar PDV. Medir peso JS/CSS e mídia, LCP/CLS/INP quando a ferramenta e a coleta forem adequadas, duração de tarefas longas, memória e frames durante o movimento. Perfis de laboratório não equivalem aos percentis de usuários reais.

Objetivos de projeto: próxima de 60 fps em tela de 60 Hz (orçamento nominal ~16,7 ms por frame), sem travamentos perceptíveis ou regressão material nas interações. Orçamento inicial proposto para etapas 1–3: até +20 kB gzip de JS em relação à base, ajustado após medir Radix; se exceder, justificar e revisar a solução. Não é tamanho medido de biblioteca. Para GSAP e 3D, registrar incremento separado e justificar o carregamento. Não prometer 60 fps pelo nome de uma galeria.

Usar `npm run build` apenas na futura tarefa de implementação, com as dependências existentes. O build não valida teclado, foco, preço ou fps. Preservar estes invariantes ao testar em dados fictícios:

- Carrinho inicial: subtotal R$ 849,70; desconto R$ 15,00; total R$ 834,70 sem cashback; R$ 772,20 com R$ 62,50 resgatados.
- Compra desse total: 1.158 pontos ganhos e R$ 38,61 de novo cashback; distinguir contador online do físico.
- Reserva da loja pode ser liberada ou convertida em item do carrinho; não alegar expiração real onde ainda não existe.
- Alternar modo não duplica adições, handlers, timers ou animações. Fechar um modal não refaz checkout.

Priorizar verificação visual e funcional independente do novo efeito. Registre o que foi executado, não executado, falhou e já falhava antes. Remova a animação se o benefício não compensar o custo, preservando a melhoria de estrutura e acessibilidade.
