# Pesquisa de frontend — HOOD SPORTS

Consulta: **10/09/2026**. Escopo: pesquisa, curadoria e preparação de skills. Nenhuma dependência foi instalada e nenhuma integração foi executada. As decisões “adotar agora” indicam prioridade para uma próxima tarefa autorizada, não alterações já realizadas.

## Contexto confirmado

Foram conferidos `package.json`, `tailwind.config.js`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/context/StoreContext.tsx`, tipos, catálogo e componentes. O projeto usa React 18.3.1, TypeScript 5.6, Vite 5, Tailwind 3 e Lucide React 0.460 na declaração de dependências. Os números são faixas declaradas, não promessa de compatibilidade com versões futuras.

A marca já tem fundo #0A0D14, superfície #131822, ciano #00E5FF, Inter no corpo e Montserrat nos títulos. A configuração oferece tokens, mas os componentes também repetem cores literais. Há 12 componentes: Navbar, Hero, FeaturesBanner, ProductCatalog, ProductCard, CategoryFilter, LoyaltySection, Footer, ActiveCartDrawer, ReservationsModal, CheckoutSuccessModal e PdvTerminalView. A aplicação monta em React StrictMode, importante para testar limpeza de efeitos.

Loja e PDV compartilham dados pelo StoreContext. Catálogo tem 23 produtos e 15 camisas de times; há seleção de tamanho, carrinho, reservas, benefícios e pagamento simulado. Carrinho, cliente e reservas são salvos no navegador. Não há modelos 3D no conjunto de assets consultado. Há fotografias externas e ilustrações locais: não pressupor que alguma delas seja modelo tridimensional ou esteja licenciada para gerar derivados.

Limitações relevantes à reformulação: a reserva do PDV apenas mostra uma mensagem; a busca vazia no PDV pode exibir produto sem correspondência; não há baixa efetiva de estoque nem expiração de reservas. A análise visual futura deve separar essas limitações preexistentes das regressões introduzidas pela interface. Não alterar preços, descontos, pontos, cashback ou regras de reserva em uma tarefa estética.

As referências a arquivos neste kit atendem ao pedido técnico atual; a prancheta anterior permanece sem referências ao código e não foi modificada.

## Critério de seleção

**13 recursos selecionados**, incluindo ferramentas de consulta e opções condicionais, e **6 referências descartadas da adoção direta**. Não são 13 dependências para instalar. GSAP e ScrollTrigger foram agrupados com seu adaptador React; Three.js e Fiber aparecem separados para explicitar custo e pareamento de versões. Não é recomendada outra engine de animação concorrente.

Prioridade: benefício no fluxo de compra → preservação da stack → acessibilidade → custo de operação/manutenção → expressão visual. Licenças, preços e compatibilidade são fatos documentais; dificuldade, aplicação e impacto esperado são avaliações para o HOOD, sem benchmark. As fontes são oficiais ou repositórios do autor. “Não confirmado” não equivale a gratuito, proibido ou abandonado.

## Cinco escolhas mais fortes

1. **CSS e APIs nativas:** estados claros nos cards/filtros, entrada pontual e cabeçalho estável, com mínimo peso.
2. **Radix Dialog:** maior retorno estrutural no carrinho e nos modais, especialmente foco e teclado.
3. **GSAP + ScrollTrigger:** uma opção de narrativa de coleção, após validar a versão CSS; não animar o PDV.
4. **Lucide existente:** coerência dos controles sem adicionar outra biblioteca nem fazer migração de versão.
5. **60fps.design:** referência de transições de estado e feedback, não fonte de mídia para copiar.

O plano detalha alternativas nativas, critérios de aceite e momentos de adoção. As skills originais são o padrão recomendado de trabalho; as externas são complementos opcionais.

## Recursos selecionados e avaliados

### R01 — CSS + Intersection Observer + reduced motion

- **Categoria e decisão:** APIs nativas / técnica · Adotar agora.
- **Site:** https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- **GitHub:** Não se aplica: recurso do navegador
- **Demo:** https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- **Download/release/código-fonte:** Não se aplica: nenhuma biblioteca para baixar
- **Licença comercial:** Uso das APIs não exige licença de biblioteca; não redistribuir exemplos/documentação sem verificar sua licença.
- **Custo:** Gratuito; custo de implementação e teste.
- **Stack:** React 18/TS/Vite 5/Tailwind 3: usar efeitos com limpeza e CSS existente; conferir suporte nos navegadores-alvo.
- **Manutenção observada:** Documentação MDN disponível; compatibilidade por navegador, sem versão de pacote. Consulta: 2026-09-10.
- **Dificuldade:** Baixa. **Performance:** Sem dependência adicional; animar opacity/transform. Efeitos de blur e listeners por item podem pesar.
- **Acessibilidade:** Manter conteúdo acessível antes da animação; respeitar prefers-reduced-motion e foco visível.
- **Aplicação e julgamento:** ProductCard, CategoryFilter e FeaturesBanner: feedback de estado, hover e entrada discreta.
- **Evidências:** [fonte 1](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), [fonte 2](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/prefers-reduced-motion), [fonte 3](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position).

### R02 — Radix Primitives — Dialog

- **Categoria e decisão:** Biblioteca de primitivas React · Adotar agora.
- **Site:** https://www.radix-ui.com/primitives/docs/components/dialog
- **GitHub:** https://github.com/radix-ui/primitives
- **Demo:** https://www.radix-ui.com/primitives/docs/components/dialog
- **Download/release/código-fonte:** https://github.com/radix-ui/primitives
- **Licença comercial:** MIT; permite uso comercial preservando licença e aviso de copyright.
- **Custo:** Gratuito; custo de migração e testes.
- **Stack:** Manifesto de Dialog declara React/ReactDOM 18 entre os peers e tipos TS; sem dependência de Tailwind 4. Validar a versão publicada escolhida.
- **Manutenção observada:** Mantido por WorkOS; manifesto consultado declara 1.1.23. Página de releases acessível, mas sem lista útil no extrator; data da última publicação não confirmada. Consulta: 2026-09-10.
- **Dificuldade:** Média. **Performance:** Adiciona dependências para foco, portal e bloqueio de rolagem; importar apenas a primitiva necessária.
- **Acessibilidade:** Oferece gerenciamento de foco e teclado; título, descrição e retorno ao acionador ainda precisam ser configurados e testados.
- **Aplicação e julgamento:** ActiveCartDrawer, ReservationsModal e CheckoutSuccessModal: criar um padrão de diálogo sem mudar ações do StoreContext.
- **Evidências:** [fonte 1](https://www.radix-ui.com/primitives/docs/components/dialog), [fonte 2](https://raw.githubusercontent.com/radix-ui/primitives/main/packages/react/dialog/package.json), [fonte 3](https://raw.githubusercontent.com/radix-ui/primitives/main/LICENSE).

### R03 — GSAP + ScrollTrigger + @gsap/react

- **Categoria e decisão:** Biblioteca de animação e integração React · Experimentar depois.
- **Site:** https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **GitHub:** https://github.com/greensock/GSAP
- **Demo:** https://demos.gsap.com/
- **Download/release/código-fonte:** https://github.com/greensock/GSAP
- **Licença comercial:** Licença própria GSAP Standard No Charge: uso comercial permitido; restringe ferramentas visuais concorrentes das capacidades de animação do Webflow. Não é MIT.
- **Custo:** Gratuito para usos permitidos, inclusive plugins; custo de engenharia e validação.
- **Stack:** @gsap/react 2.1.2 declara React >=17 e GSAP ^3.12.5. Compatível em princípio com React 18 e Vite; sem instalação/teste neste projeto.
- **Manutenção observada:** Documentação oficial ativa; manifesto do adaptador 2.1.2 consultado. Última data de release do núcleo não confirmada. Consulta: 2026-09-10.
- **Dificuldade:** Média. **Performance:** Carregar apenas onde necessário; um efeito coordenado, sem biblioteca concorrente de movimento. Medir bundle, frames e desmontagem.
- **Acessibilidade:** Usar rolagem nativa, conteúdo estático no modo de movimento reduzido, sem prender teclado ou atrasar CTA.
- **Aplicação e julgamento:** Hero e seção de coleção antes do ProductCatalog: parallax sutil e narrativa curta; não aplicar ao PDV.
- **Evidências:** [fonte 1](https://gsap.com/community/standard-license/), [fonte 2](https://github.com/greensock/react), [fonte 3](https://raw.githubusercontent.com/greensock/react/main/package.json), [fonte 4](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

### R04 — Lucide React — manter o existente

- **Categoria e decisão:** Biblioteca de ícones · Adotar agora.
- **Site:** https://lucide.dev/guide/react
- **GitHub:** https://github.com/lucide-icons/lucide
- **Demo:** https://lucide.dev/guide/react
- **Download/release/código-fonte:** https://github.com/lucide-icons/lucide/releases
- **Licença comercial:** ISC; preservar os avisos de licença, inclusive os relativos à origem Feather quando aplicáveis.
- **Custo:** Gratuito; já presente no HOOD.
- **Stack:** Projeto usa lucide-react ^0.460.0. A documentação atual é v1 e inclui migração: conservar a linha atual nesta melhoria; não copiar APIs novas sem conferir.
- **Manutenção observada:** Releases do repositório incluem 1.43.0 em 08/09 e atividade em 10/09; isto não é uma recomendação de atualizar a versão instalada. Consulta: 2026-09-10.
- **Dificuldade:** Baixa. **Performance:** Reutilizar imports nomeados; não incluir uma segunda família de ícones ou catálogo dinâmico completo.
- **Acessibilidade:** Ícones decorativos devem ser ignorados por leitores de tela; botões só com ícone precisam de nome acessível.
- **Aplicação e julgamento:** Navbar, quantidade/remover no carrinho e métodos do PDV: normalizar tamanho, traço e rótulos.
- **Evidências:** [fonte 1](https://lucide.dev/license), [fonte 2](https://lucide.dev/guide/react), [fonte 3](https://github.com/lucide-icons/lucide/releases).

### R05 — 60fps.design

- **Categoria e decisão:** Galeria de interações e movimento · Adotar agora.
- **Site:** https://60fps.design/
- **GitHub:** Não identificado repositório oficial de componentes
- **Demo:** https://60fps.design/
- **Download/release/código-fonte:** Não identificado download de componentes; biblioteca visual online
- **Licença comercial:** Serviço sujeito a termos próprios; gravações de apps não equivalem a código ou assets licenciados para o HOOD. Usar como referência, sem redistribuir.
- **Custo:** Acesso público e assinatura PRO; preço exato não confirmado na extração.
- **Stack:** Independente da stack: traduzir padrões para React/CSS, sem importar runtime.
- **Manutenção observada:** Site acessível; termos atualizados em 02/08/2026. Isso comprova atualização do serviço, não qualidade técnica de cada referência. Consulta: 2026-09-10.
- **Dificuldade:** Baixa. **Performance:** Sem peso na aplicação se usado apenas para pesquisa; evitar reproduzir todos os efeitos observados.
- **Acessibilidade:** Selecionar padrões de feedback e não copiar movimento excessivo; cada implementação precisa de alternativa estática.
- **Aplicação e julgamento:** Carrinho, filtro e fidelidade: observar confirmação, transições de estado e contadores legíveis.
- **Evidências:** [fonte 1](https://60fps.design/), [fonte 2](https://60fps.design/pro), [fonte 3](https://60fps.design/terms).

### R06 — 21st.dev

- **Categoria e decisão:** Marketplace/galeria de componentes · Experimentar depois.
- **Site:** https://21st.dev/
- **GitHub:** https://github.com/21st-dev
- **Demo:** https://21st.dev/
- **Download/release/código-fonte:** https://21st.dev/ — obtenção por item, conforme acesso e licença
- **Licença comercial:** Licença deve ser confirmada em cada componente. Termos distinguem código de demos, previews e mídia; não há autorização geral para copiar a galeria.
- **Custo:** Consulta gratuita; página de planos indica 2 cópias/instalações por dia no Free; Builder US$6/mês e Builder + AI US$15/mês, ambos na cobrança anual.
- **Stack:** React/Tailwind é próximo da stack; verificar por item dependências, Tailwind 3 versus 4, APIs React 19 e convenções Next.js.
- **Manutenção observada:** Blog oficial com publicação em 07/09/2026; manutenção do marketplace não garante a de cada componente. Consulta: 2026-09-10.
- **Dificuldade:** Média. **Performance:** Prefira layout simples; cards com shaders, vídeo ou engines adicionais podem aumentar muito o custo.
- **Acessibilidade:** Aparência pronta não comprova semântica, teclado ou reduced motion; revisar tudo antes de incorporar.
- **Aplicação e julgamento:** Hero e apresentação de coleção: selecionar uma composição e reconstruir com tokens HOOD. Nenhum componente específico foi baixado ou aprovado.
- **Evidências:** [fonte 1](https://21st.dev/), [fonte 2](https://21st.dev/plans), [fonte 3](https://21st.dev/terms), [fonte 4](https://21st.dev/blog), [fonte 5](https://github.com/21st-dev).

### R07 — Colors Palette Visualizer

- **Categoria e decisão:** Ferramenta de paleta · Adotar agora.
- **Site:** https://colors-visualizer.vercel.app/
- **GitHub:** Não identificado
- **Demo:** https://colors-visualizer.vercel.app/
- **Download/release/código-fonte:** Exportação indicada no site; formatos e restrições não confirmados
- **Licença comercial:** Licença de código e condições de reutilização de layouts não identificadas; usar somente para explorar combinações próprias.
- **Custo:** Página pública acessível; cobrança e limites não confirmados.
- **Stack:** Independente da stack; transferir manualmente apenas decisões de cor para tokens existentes.
- **Manutenção observada:** Site identifica Yacouri como criador; não expõe histórico de versões no conteúdo consultado. Consulta: 2026-09-10.
- **Dificuldade:** Baixa. **Performance:** Nenhum custo de runtime ao usar apenas como ferramenta de consulta.
- **Acessibilidade:** Não substitui medição de contraste; validar texto e foco sobre fundos reais.
- **Aplicação e julgamento:** Comparar #00E5FF, #0A0D14, #131822 e tons de apoio antes de consolidar tailwind.config.js.
- **Evidências:** [fonte 1](https://colors-visualizer.vercel.app/), [fonte 2](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

### R08 — Three.js

- **Categoria e decisão:** Biblioteca 3D · Experimentar depois.
- **Site:** https://threejs.org/
- **GitHub:** https://github.com/mrdoob/three.js
- **Demo:** https://threejs.org/examples/
- **Download/release/código-fonte:** https://github.com/mrdoob/three.js/releases
- **Licença comercial:** MIT para a biblioteca; licença não cobre automaticamente modelos, texturas, marcas ou assets de exemplos.
- **Custo:** Gratuito; produção/licenciamento de modelos e otimização podem ter custo.
- **Stack:** Integração JS/TS possível com Vite; requer gestão de canvas, GPU e descarte. Versão deve ser pareada com eventual adaptador React.
- **Manutenção observada:** Release r186 visível em 08/09/2026; não significa compatibilidade automática com Fiber 8. Consulta: 2026-09-10.
- **Dificuldade:** Alta. **Performance:** GPU, transferência de modelos/texturas, memória e bateria; medir em aparelho real. Sem assets 3D no projeto, retorno imediato baixo.
- **Acessibilidade:** Imagem alternativa e informações textuais equivalentes; visualizador opcional por clique e sem giro automático com reduced motion.
- **Aplicação e julgamento:** Somente futuro visualizador de detalhes de um tênis, se houver modelo licenciado e necessidade de examinar solado/material.
- **Evidências:** [fonte 1](https://threejs.org/), [fonte 2](https://threejs.org/examples/), [fonte 3](https://github.com/mrdoob/three.js/releases), [fonte 4](https://raw.githubusercontent.com/mrdoob/three.js/dev/LICENSE).

### R09 — React Three Fiber

- **Categoria e decisão:** Renderizador React para Three.js · Experimentar depois.
- **Site:** https://github.com/pmndrs/react-three-fiber
- **GitHub:** https://github.com/pmndrs/react-three-fiber
- **Demo:** https://github.com/pmndrs/react-three-fiber — exemplos no README
- **Download/release/código-fonte:** https://github.com/pmndrs/react-three-fiber/releases
- **Licença comercial:** MIT; manter avisos. Three.js e assets têm suas próprias licenças.
- **Custo:** Gratuito; mesmo custo de criação/otimização dos assets 3D.
- **Stack:** README oficial: Fiber 8 acompanha React 18, Fiber 9 acompanha React 19. Fixar linha 8 se conservar a stack e revisar peers de Three/Drei; matriz exata não testada.
- **Manutenção observada:** Repositório e releases acessíveis; evolução na linha 9 não prova suporte ativo à linha 8. Data final de suporte da linha 8 não confirmada. Consulta: 2026-09-10.
- **Dificuldade:** Alta. **Performance:** É camada sobre Three.js, não substituto mais leve; combinar apenas se 3D for aprovado. Não adicionar Drei sem necessidade concreta.
- **Acessibilidade:** Canvas não substitui descrição, controles de compra ou acesso por teclado; oferecer fallback estático.
- **Aplicação e julgamento:** Adaptador opcional de R08 para um visualizador isolado, carregado sob demanda; nenhum Canvas no PDV.
- **Evidências:** [fonte 1](https://github.com/pmndrs/react-three-fiber), [fonte 2](https://github.com/pmndrs/react-three-fiber/releases), [fonte 3](https://raw.githubusercontent.com/pmndrs/react-three-fiber/master/LICENSE).

### R10 — HyperFrames (HeyGen)

- **Categoria e decisão:** Framework de produção de vídeo · Experimentar depois.
- **Site:** https://hyperframes.heygen.com/introduction
- **GitHub:** https://github.com/heygen-com/hyperframes
- **Demo:** https://hyperframes.heygen.com/showcase
- **Download/release/código-fonte:** https://github.com/heygen-com/hyperframes/releases
- **Licença comercial:** Apache-2.0: uso comercial permitido, preservar licença/avisos e indicar alterações quando aplicável. Mídias usadas na composição exigem direitos próprios.
- **Custo:** Framework aberto sem taxa por render declarada; computação, geração por IA e serviços externos podem custar.
- **Stack:** Converte HTML em vídeo; ferramenta separada da aplicação, não biblioteca para animar componentes React. Renderização usa navegador e FFmpeg.
- **Manutenção observada:** Releases incluem v0.8.32 em 08/09/2026; documentação e exemplos acessíveis. Consulta: 2026-09-10.
- **Dificuldade:** Média. **Performance:** Renderizar fora da loja. Se publicar vídeo, custo vira transferência/decodificação; usar poster e carregamento por intenção.
- **Acessibilidade:** Legenda/transcrição quando houver informação falada, botão de reprodução e alternativa estática.
- **Aplicação e julgamento:** Campanha de lançamento ou vídeo de coleção para Hero; não inserir ferramenta de renderização no bundle da loja.
- **Evidências:** [fonte 1](https://hyperframes.heygen.com/introduction), [fonte 2](https://github.com/heygen-com/hyperframes), [fonte 3](https://github.com/heygen-com/hyperframes/releases), [fonte 4](https://raw.githubusercontent.com/heygen-com/hyperframes/main/LICENSE).

### R11 — Vercel React Best Practices

- **Categoria e decisão:** Skill existente · Adotar agora.
- **Site:** https://github.com/vercel-labs/agent-skills
- **GitHub:** https://github.com/vercel-labs/agent-skills
- **Demo:** Não se aplica; exemplos e regras no pacote
- **Download/release/código-fonte:** https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/SKILL.md
- **Licença comercial:** MIT declarada no frontmatter e README; preservar atribuição e termos ao copiar o pacote.
- **Custo:** Gratuita; custo do agente e da revisão.
- **Stack:** Usar regras de React cliente e bundle; adaptar importação dinâmica para Vite. Regras Next.js/RSC/servidor não se aplicam automaticamente ao HOOD.
- **Manutenção observada:** Frontmatter v1.0.0; histórico do repositório mostra atividade em agosto de 2026, sem comprovar data individual de cada regra. Consulta: 2026-09-10.
- **Dificuldade:** Baixa. **Performance:** Sem runtime no site; pode orientar profiling e carregamento condicional, sem justificar memoização de tudo.
- **Acessibilidade:** Não é auditoria completa de acessibilidade; combinar com revisão de teclado e semântica.
- **Aplicação e julgamento:** Revisar renderizações do StoreContext, catálogo e carregamento condicional de PDV/mídia.
- **Evidências:** [fonte 1](https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/SKILL.md), [fonte 2](https://github.com/vercel-labs/agent-skills), [fonte 3](https://github.com/vercel-labs/agent-skills/commits/main/).

### R12 — Vercel Web Design Guidelines

- **Categoria e decisão:** Skill existente de revisão · Adotar agora.
- **Site:** https://github.com/vercel-labs/agent-skills
- **GitHub:** https://github.com/vercel-labs/agent-skills
- **Demo:** Não se aplica; roteiro de revisão
- **Download/release/código-fonte:** https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/web-design-guidelines/SKILL.md
- **Licença comercial:** MIT declarada para o repositório; confirmar também termos do documento remoto ao redistribuí-lo. Kit apenas referencia.
- **Custo:** Gratuita; requer agente com leitura de arquivos e acesso web para obter a diretriz atual.
- **Stack:** Revisão de interface independente de Vite/Tailwind; mapear WebFetch para ferramenta disponível. Não instalar dependências de runtime.
- **Manutenção observada:** Frontmatter v1.0.0; origem Vercel verificada. Documento remoto de diretrizes foi consultado separadamente. Consulta: 2026-09-10.
- **Dificuldade:** Baixa. **Performance:** Sem peso no frontend; recomendações devem ser validadas contra medições reais.
- **Acessibilidade:** Útil para nomes de controles, foco e estados; não substitui teste com teclado e leitor de tela.
- **Aplicação e julgamento:** Revisão de Navbar, cards, carrinho, reservas, comprovante e PDV antes/depois das mudanças.
- **Evidências:** [fonte 1](https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/web-design-guidelines/SKILL.md), [fonte 2](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md), [fonte 3](https://github.com/vercel-labs/agent-skills).

### R13 — Anthropic frontend-design

- **Categoria e decisão:** Skill existente de direção de interface · Experimentar depois.
- **Site:** https://github.com/anthropics/skills/tree/main/skills/frontend-design
- **GitHub:** https://github.com/anthropics/skills/tree/main/skills/frontend-design
- **Demo:** Não se aplica; instruções de design
- **Download/release/código-fonte:** https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md
- **Licença comercial:** Apache-2.0 no LICENSE.txt da própria skill; preservar atribuições e avisos ao redistribuir.
- **Custo:** Gratuita; custo de uso do agente.
- **Stack:** Não depende de framework específico; limitar ao React/Vite atual e à identidade HOOD. Preferências estéticas genéricas não devem substituir a marca.
- **Manutenção observada:** Histórico da pasta inclui alteração em 09/06/2026; conteúdo e licença acessíveis. Consulta: 2026-09-10.
- **Dificuldade:** Baixa. **Performance:** Não inclui runtime; propostas geradas ainda precisam de orçamento de mídia e animação.
- **Acessibilidade:** Direção visual não garante acessibilidade; aplicar critérios do plano e da skill HOOD.
- **Aplicação e julgamento:** Explorar hierarquia e composição de Hero/coleção. Usar como alternativa à skill original hood-ui-system, sem empilhar instruções redundantes.
- **Evidências:** [fonte 1](https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md), [fonte 2](https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/LICENSE.txt), [fonte 3](https://github.com/anthropics/skills/commits/main/skills/frontend-design/).

### X01 — Scroll World — candidato robbertvanempel

- **Categoria e decisão:** Skill de landing cinematográfica · Descartar da seleção atual.
- **Site:** https://github.com/robbertvanempel/scroll-world-skill
- **GitHub:** https://github.com/robbertvanempel/scroll-world-skill
- **Demo:** Não confirmada demo pública independente
- **Download/release/código-fonte:** Fonte pública, sem autorização de redistribuição confirmada
- **Licença comercial:** README declara explicitamente ausência de licença open source; não copiar, adaptar nem empacotar.
- **Custo:** Código visível; execução depende de Higgsfield autenticado/créditos, FFmpeg/ffprobe e mídia gerada.
- **Stack:** Motor JavaScript independente de framework, mas requer adaptação do ciclo React e pipeline de vídeo.
- **Manutenção observada:** README e SKILL.md acessíveis; manutenção continuada não confirmada. Consulta: 2026-09-10.
- **Dificuldade:** Alta. **Performance:** Vídeo controlado por scroll exige otimização de seek, rede e decodificação; alto custo para o catálogo.
- **Acessibilidade:** Skill menciona móvel/reduced motion; não foi validada. Nunca esconder CTA atrás da sequência.
- **Aplicação e julgamento:** Pista encontrada corresponde a um projeto com esse nome; sem confirmação de ser exatamente a referência pretendida.
- **Evidências:** [fonte 1](https://github.com/robbertvanempel/scroll-world-skill), [fonte 2](https://raw.githubusercontent.com/robbertvanempel/scroll-world-skill/main/SKILL.md).

### X02 — Parallax landings — candidato hoodini

- **Categoria e decisão:** Termo genérico / skill encontrada · Descartar da seleção atual.
- **Site:** https://github.com/hoodini/ai-agents-skills
- **GitHub:** https://github.com/hoodini/ai-agents-skills
- **Demo:** Exemplos locais descritos no README; demo hospedada não confirmada
- **Download/release/código-fonte:** https://raw.githubusercontent.com/hoodini/ai-agents-skills/master/skills/parallax-landing-page/SKILL.md
- **Licença comercial:** Licença específica não confirmada; campo MIT de exemplo no README não comprova licença da skill.
- **Custo:** Leitura pública; precisa de vídeo próprio, Python, FFmpeg/ffprobe e execução local.
- **Stack:** Gera HTML/JS com viewport travado e controle virtual de scroll; não é componente React pronto.
- **Manutenção observada:** Fonte e README acessíveis; instruções inspecionadas, execução não testada. Consulta: 2026-09-10.
- **Dificuldade:** Alta. **Performance:** Pré-carrega frames de vídeo e intercepta entradas; custo incompatível com a prioridade do checkout.
- **Acessibilidade:** Intercepção de wheel/touch/teclado contraria o requisito de não sequestrar rolagem.
- **Aplicação e julgamento:** Não adotar o template. O termo é amplo; este é apenas um candidato encontrado, não identidade oficial única.
- **Evidências:** [fonte 1](https://github.com/hoodini/ai-agents-skills), [fonte 2](https://raw.githubusercontent.com/hoodini/ai-agents-skills/master/skills/parallax-landing-page/SKILL.md).

### X03 — BrandBird

- **Categoria e decisão:** Ferramenta SaaS de mockups e imagens sociais · Descartar da seleção de frontend.
- **Site:** https://www.brandbird.app/
- **GitHub:** Não identificado repositório oficial do produto
- **Demo:** https://www.brandbird.app/
- **Download/release/código-fonte:** Exportação na ferramenta; não há código-fonte do produto confirmado
- **Licença comercial:** Serviço proprietário; licença comercial dos templates/exports não confirmada nesta análise.
- **Custo:** Pricing exibe Free US$0 e Pro US$15/mês; preços e condições devem ser revistos antes de contratar.
- **Stack:** Produz imagens fora da aplicação; não melhora os componentes React diretamente.
- **Manutenção observada:** Site e preços acessíveis; data da última atualização funcional não confirmada. Consulta: 2026-09-10.
- **Dificuldade:** Baixa. **Performance:** Sem runtime adicional; imagens exportadas precisam de compressão se usadas na web.
- **Acessibilidade:** Texto dentro de imagens não deve substituir informações acessíveis em HTML.
- **Aplicação e julgamento:** Útil para divulgação e apresentação do projeto, mas secundário à evolução da loja.
- **Evidências:** [fonte 1](https://www.brandbird.app/), [fonte 2](https://www.brandbird.app/pricing).

### X04 — DesignVault → ScreensDesign

- **Categoria e decisão:** Galeria / pesquisa de apps · Descartar da seleção atual.
- **Site:** https://screensdesign.com/
- **GitHub:** Não identificado
- **Demo:** https://screensdesign.com/
- **Download/release/código-fonte:** Não identificado download oficial de componentes
- **Licença comercial:** Não confirmada licença de reutilização das telas; consultar como referência, não copiar assets.
- **Custo:** Conteúdo público acessível; preços e limites não confirmados.
- **Stack:** Referências de apps, sem integração React ou Tailwind.
- **Manutenção observada:** designvault.io redirecionou para screensdesign.com em 10/09/2026; identidade observada difere da pista antiga. Consulta: 2026-09-10.
- **Dificuldade:** Baixa. **Performance:** Sem runtime; utilidade limitada ao estudo visual.
- **Acessibilidade:** Padrões móveis precisam ser adaptados ao navegador e ao teclado.
- **Aplicação e julgamento:** Redundante com 60fps para este kit; foco em apps e paywalls não é prioridade da loja.
- **Evidências:** [fonte 1](https://designvault.io/), [fonte 2](https://screensdesign.com/).

### X05 — Shortcuts.design

- **Categoria e decisão:** Diretório de atalhos de ferramentas · Descartar da seleção de frontend.
- **Site:** https://shortcuts.design/
- **GitHub:** https://github.com/michelvanheest/shortcuts-design-data
- **Demo:** https://shortcuts.design/
- **Download/release/código-fonte:** https://github.com/michelvanheest/shortcuts-design-data
- **Licença comercial:** Licença da base de dados não confirmada; não copiar o conjunto para a loja.
- **Custo:** Consulta pública; não foi necessário cadastro.
- **Stack:** Ferramenta de produtividade do designer; não fornece componentes React para o HOOD.
- **Manutenção observada:** Site atribui autoria a Michel van Heest e vincula repositório de dados; data de release não confirmada. Consulta: 2026-09-10.
- **Dificuldade:** Baixa. **Performance:** Nenhum impacto no frontend se apenas consultado.
- **Acessibilidade:** Atalhos de apps de design não devem ser transplantados para o PDV sem pesquisa com operadores.
- **Aplicação e julgamento:** Baixo ganho direto no catálogo, carrinho ou modais; manter apenas como referência de trabalho.
- **Evidências:** [fonte 1](https://shortcuts.design/), [fonte 2](https://github.com/michelvanheest/shortcuts-design-data?ref=shortcuts.design).

### X06 — thedotmack / design-is

- **Categoria e decisão:** Perfil GitHub / skill de auditoria · Descartar adoção direta.
- **Site:** https://github.com/thedotmack
- **GitHub:** https://github.com/thedotmack/claude-mem
- **Demo:** Não se aplica; perfil e instruções de auditoria
- **Download/release/código-fonte:** https://raw.githubusercontent.com/thedotmack/claude-mem/main/plugin/skills/design-is/SKILL.md
- **Licença comercial:** Repositório claude-mem declara Apache-2.0; preservar licença/avisos e verificar escopo se extrair arquivos. Nenhum arquivo copiado.
- **Custo:** Leitura pública; executar o workflow depende de agente, subagentes, /make-plan e ferramenta de navegador mencionada.
- **Stack:** thedotmack é o perfil de Alex Newman, não biblioteca de UI. design-is avalia design e encaminha plano, não implementa componentes.
- **Manutenção observada:** Perfil, skill e licença consultados. Não inferir atualização de design-is a partir de popularidade do claude-mem. Consulta: 2026-09-10.
- **Dificuldade:** Média. **Performance:** Sem runtime, porém auditoria delegada ampla pode ser desproporcional; não instalar memória persistente para resolver UI.
- **Acessibilidade:** Requer evidências e avalia acessibilidade, mas impõe pontuações e premissas genéricas que precisam de revisão.
- **Aplicação e julgamento:** Descartar adoção direta; hood-frontend-review oferece revisão focada no fluxo esportivo sem /make-plan ou subagentes obrigatórios.
- **Evidências:** [fonte 1](https://github.com/thedotmack), [fonte 2](https://raw.githubusercontent.com/thedotmack/claude-mem/main/plugin/skills/design-is/SKILL.md), [fonte 3](https://raw.githubusercontent.com/thedotmack/claude-mem/main/LICENSE).

## Auditoria das skills existentes

As instruções abaixo foram lidas como material de pesquisa, não ativadas ou executadas. Nenhuma instalação foi feita. Um `SKILL.md` com frontmatter identifica uma skill; um site, uma lista de prompts ou um perfil GitHub não se torna skill por associação.

| Skill | Origem/formato | Instruções e dependências verificadas | Decisão para o HOOD |
|---|---|---|---|
| vercel-react-best-practices | Vercel; YAML com name, description e licença, corpo Markdown e referências de regras | Regras de React e Next.js; consultar também arquivos de regras referenciados ao instalar o pacote completo. Não há necessidade de runtime no site. | Usar a parte de React cliente; não aplicar Next/RSC ou React 19 a esta stack. |
| web-design-guidelines | Vercel; YAML + Markdown | Pede leitura dos arquivos e obtenção de um documento remoto; esse documento também foi consultado. O nome WebFetch exige equivalência com a ferramenta disponível. | Complemento de revisão; requer rede para atualizar diretrizes. |
| frontend-design | Anthropic; YAML + Markdown, LICENSE.txt próprio | Orienta composição e escolhas visuais; sem ferramenta externa obrigatória declarada na entrada consultada. | Opcional; a identidade esportiva existente prevalece sobre preferências genéricas da skill. |
| scroll-world | robbertvanempel; YAML + Markdown e arquivos de apoio | Exige Higgsfield, autenticação/créditos e FFmpeg/ffprobe; pipeline de imagens/vídeos e motor de scrub. | Não reutilizar: licença ausente declarada pelo autor e custo excessivo para o fluxo atual. |
| parallax-landing-page | hoodini; entrada SKILL.md e referências/scripts no repositório | Usa vídeo, extração de frames, corpo travado, intercepção de wheel/touch/teclado e fontes de outra identidade. A linha de gatilho também demanda revisão de formato antes de uma instalação. | Rejeitada pelo comportamento e por licença específica não confirmada. |
| design-is | thedotmack/claude-mem; YAML + Markdown | Impõe coleta delegada, notas por princípios e encaminhamento /make-plan; cita agente de navegador e contém premissa de conversa anterior. | Não instalar o plugin de memória para revisar a loja; usar skill original focalizada. |

O kit contém somente três skills **originais**, não cópias ou adaptações literais dessas entradas. Cada uma é autocontida, tem nome/descrição em YAML e pode ser entregue ao agente como pasta. Instalação global não foi realizada. As skills não autorizam publicação, compra, instalação ou mudanças fora do escopo de uma futura solicitação.

## Verificação de links e limites da pesquisa

Todos os sites principais, repositórios e arquivos de skill citados como evidência foram abertos na navegação em 10/09/2026. Isso significa conteúdo textual acessível, não teste de conta, checkout, execução de demo, download de pacote ou promessa de disponibilidade futura. Links GitHub de código-fonte são a opção de obtenção quando não há release útil; nenhum arquivo de terceiro integra o ZIP.

Redirecionamentos observados: designvault.io → screensdesign.com; brandbird.app → www.brandbird.app; gsap.com/licensing/ → licença na comunidade GSAP; gsap.com/demos/ → demos.gsap.com; documentação antiga de Lucide React → /guide/react. O catálogo atual do Lucide está na linha v1, enquanto o HOOD conserva v0.

Limitações: a introdução em r3f.docs.pmnd.rs apresentou erro no extrator, então o pareamento de React foi verificado no README original; uma tentativa de manifesto em uma branch presumida v8 não retornou conteúdo e não é usada como evidência. A página gsap.matchMedia também não ficou disponível no extrator; não foi contornado bloqueio. Os arquivos LICENSE na raiz de Vercel e hoodini não retornaram conteúdo: para Vercel há declaração MIT no README e no frontmatter de React Best Practices; para hoodini a licença específica permanece não confirmada. Páginas de releases de GSAP e Radix não forneceram lista útil; não atribuí data recente a elas. Preços completos do 60fps e limites do Colors Visualizer não foram confirmados. Não houve acesso autenticado, assinatura, scraping da galeria ou download de conteúdo pago.

“Scroll World” e “Parallax landings” não vieram acompanhados de URL no pedido: os candidatos encontrados são identificados como tais. “thedotmack” foi confirmado como perfil; não é o nome de um pacote frontend. O redirecionamento de DesignVault é registrado sem presumir continuidade de todo o catálogo antigo.

## Estado das validações

- Confirmado por leitura local: stack, tokens, componentes, estado compartilhado e ausência de modelo 3D nos assets consultados.
- Confirmado por documentação externa: finalidade, origem e condições assinaladas em cada recurso.
- Gerado: documentação, comparativo CSV, três skills e pacote ZIP.
- Não executado: integração com GSAP/Radix/Three, instalação de skills externas, teste funcional da aplicação ou medição de fps nesta tarefa.
- O build aprovado na análise anterior não testa as integrações sugeridas neste kit. Não é apresentado como aprovação delas.

Os arquivos e skills gerados foram submetidos à validação estrutural; os detalhes estão em `validacao.md`. Sessenta fps é objetivo de medição em dispositivos definidos, nunca garantia de biblioteca ou galeria.
