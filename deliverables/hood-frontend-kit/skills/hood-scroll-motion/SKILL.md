---
name: hood-scroll-motion
description: Planejar ou implementar movimento discreto no HOOD SPORTS com CSS e, quando necessário, GSAP/ScrollTrigger, mantendo rolagem nativa, limpeza em React e alternativa para movimento reduzido. Use em hero, coleção e transições de estado.
---

# Movimento HOOD

## Objetivo e escopo

Usar movimento para explicar hierarquia ou mudança de estado sem atrasar a compra. Respeite a modalidade do pedido: pesquisa/plano não autoriza implementar nem instalar. Não transformar o catálogo ou o PDV em uma experiência de rolagem controlada.

## Arquivos a consultar

Na raiz informada, leia `package.json`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `tailwind.config.js`, `src/context/StoreContext.tsx` e os alvos em `src/components/Hero.tsx`, `FeaturesBanner.tsx`, `ProductCatalog.tsx`, `ProductCard.tsx`, `CategoryFilter.tsx`, `LoyaltySection.tsx`, `ActiveCartDrawer.tsx` e `PdvTerminalView.tsx`. Consulte os modais se abertura/fechamento estiver no escopo. Confira se StrictMode continua ativo e quais bibliotecas de animação já existem.

## Processo de decisão e execução

1. Descreva a informação que o efeito comunica e sua alternativa estática. Se a diferença for apenas ornamental e cara, mantenha CSS ou layout estático.
2. Prefira CSS para hover/foco/pressão e Intersection Observer para uma entrada pontual. Use sticky nativo para imagem acompanhando texto. Não adicionar GSAP para uma simples transição de cor.
3. Se houver timeline sincronizada ao scroll, avalie GSAP/ScrollTrigger. Verifique versão/licença e pares de dependências nas fontes oficiais antes de uma instalação autorizada. Use uma engine de animação por finalidade, sem duplicar com Motion ou suavizadores por padrão.
4. No React, limite seletores ao componente por ref. Com @gsap/react, use `useGSAP` e a limpeza do contexto; se valores recriam o efeito, avalie `revertOnUpdate`. Animações criadas em callbacks posteriores precisam ser associadas ao contexto, por exemplo com `contextSafe`, quando aplicável. Sem adaptador, use contexto/revert no retorno do efeito.
5. Limpe também listeners, timers, observadores, callbacks e objetos de media query que não estejam cobertos pelo contexto. Não usar uma limpeza global que encerre animações de outros componentes. Alterne loja/PDV e monte/desmonte repetidamente para detectar duplicações em StrictMode.
6. Mantenha conteúdo visível por padrão. Só aplique estado inicial oculto após confirmar que o efeito será ativado; falha ou ausência de suporte não pode deixar produto ou CTA invisível.
7. Meça antes/depois em condições iguais. Entregue o comportamento em desktop, móvel, movimento reduzido e sem suporte, além da evidência de execução.

## Restrições de interação

- Nunca interceptar globalmente wheel/touch/teclado para simular avanço de página, nem obrigar a assistir uma sequência antes do catálogo.
- Hero: preço/CTA estáticos e acessíveis; parallax curto apenas se justificado. Coleção: texto em fluxo normal e atalho ao catálogo. Em telas estreitas, preferir blocos empilhados sem pinning.
- `prefers-reduced-motion: reduce`: sem parallax, scrub, giro ou contagem animada; conteúdo final imediato. Detectar também mudança de preferência durante a sessão e limpar efeitos anteriores.
- Hover só complementa; toda ação funciona por toque e teclado. Nunca fazer confirmação comercial depender de `onComplete` da animação.
- PDV e totais financeiros: atualização imediata, sem histórias por scroll, canvas ou animações de fundo contínuas.
- Animar `transform`/`opacity` quando adequados; grandes sombras, filtros e layouts por frame exigem medição. Usar `will-change` seletivamente, não em todos os produtos permanentemente.

## Ferramentas e dependências

Editor/terminal, navegador com perfil de performance e controle de preferência de movimento. CSS não exige pacote adicional. GSAP/@gsap/react são opcionais, não presumidos instalados. Se o navegador ou aparelho real estiver indisponível, não afirmar fps ou aprovação móvel. Não depender de Higgsfield, vídeo pago ou skill externa para um efeito simples.

Fontes para confirmar comportamento de uma integração: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [adaptador React](https://github.com/greensock/react), [licença GSAP](https://gsap.com/community/standard-license/), [movimento reduzido](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/prefers-reduced-motion).

## Critérios verificáveis

Rolagem/âncoras/teclado nativos; ausência de conteúdo inacessível; nenhum efeito residual após cinco alternâncias de modo; nenhum listener ou timer duplicado; preferência reduzida respeitada ao carregar e ao mudar; CTA acionável durante movimento; build aprovado após mudanças de código. Registrar dispositivo, navegador, versão, rede, bundle e frames. Sessenta fps em tela de 60 Hz é objetivo (~16,7 ms/frame), nunca garantia. Retirar o efeito se a compra perder fluidez.

## Exemplo de solicitação

“Use $hood-scroll-motion para propor uma seção de coleção sticky antes do catálogo, com alternativa CSS e regras de movimento reduzido. Nesta etapa, entregue apenas o plano, sem instalar GSAP.”
