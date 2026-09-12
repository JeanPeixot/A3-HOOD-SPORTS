# HOOD SPORTS — Nova identidade visual

Implementação de 10/09/2026, baseada no kit de pesquisa do projeto.

## Direção visual

Marca geométrica original, inclinada para sugerir movimento; assinatura tipográfica com Montserrat e Inter; fundo preto esverdeado, papel quente no catálogo, ciano nas ações principais e verde claro na área de fidelidade. O contraste entre seções separa descoberta, seleção e benefícios. Foram reutilizadas as imagens existentes do catálogo, que incluem imagens ilustrativas e não devem ser interpretadas como novas fotografias oficiais dos produtos.

O hero dá destaque à mensagem e a um produto, com seleção explícita de tamanho. O catálogo mantém os 23 produtos, com filtros em português, contagem, preços, tamanhos, reserva e adição ao carrinho. O Clube Hood mostra pontos, cashback e histórico de compras. O rodapé prioriza navegação e acesso ao PDV.

Carrinho, comprovante, reservas e PDV compartilham a linguagem visual. O checkout permite selecionar os meios de pagamento já aceitos pelo estado da aplicação. O PDV apresenta lista de resultados e seleção de tamanho; pesquisa sem correspondência mostra estado vazio. A reserva no balcão chama a mesma operação de reserva da loja, em vez do antigo alerta isolado.

## Recursos adotados

- CSS para layout e microinterações, respeitando prefers-reduced-motion.
- Lucide existente para ícones.
- Dialog nativo do navegador para modalização, Escape e controle de foco, com restauração ao acionador implementada no componente compartilhado.
- Nenhuma biblioteca nova instalada. Sem GSAP, Three.js, rolagem interceptada ou vídeos de galeria.
- StoreContext, fórmulas, dados do catálogo e tipos comerciais permaneceram sem alteração. A prancheta e o kit de pesquisa também não foram editados nesta implementação.

## Validação executada

- `npm run build`: aprovado após os ajustes finais. TypeScript e bundle Vite gerados.
- `git diff --check`: aprovado.
- Primeira conferência no Chrome isolado em 360, 768 e 1440 px: largura de página igual à largura de viewport, sem rolagem horizontal. Inspeção visual do hero, catálogo e clube, sem exceções JavaScript durante esse percurso.
- Após essa conferência, foram feitos ajustes pontuais de largura do hero, tamanho dos controles, legibilidade e acesso móvel ao PDV. Esses ajustes passaram no build, mas não receberam nova rodada de screenshots.
- Sete combinações sólidas de texto e fundo conferidas por cálculo de luminância relativa, todas acima de 4,5:1. Ver [contraste.json](contraste.json). Isso não é uma certificação de acessibilidade nem medição de todos os textos sobre imagens.
- Bundle final: JavaScript de 195,36 kB (60,15 kB gzip) e CSS de 45,50 kB (9,69 kB gzip), conforme Vite. Não é medição de carregamento em dispositivo real.

## Validações pendentes

A segunda execução do Chrome isolado, destinada aos testes funcionais completos, foi rejeitada na autorização da ferramenta. Não foi repetida por outro caminho. Portanto, seleção, agrupamento por tamanho, reserva/conversão, cashback, conclusão de compra, foco dos modais e pagamentos no PDV foram revisados no código, mas não são apresentados como testes de interação aprovados nesta entrega.

Também não foram realizados testes em aparelho físico, zoom de navegador a 200%, impressão física, leitor de tela ou medição de fps. A integração de pagamentos continua sendo simulada. Persistência e limitações anteriores de estoque/expiração de reservas não foram reformuladas.

## Como visualizar

Servidor de desenvolvimento iniciado em `http://127.0.0.1:5173/`.

Para iniciar novamente a partir da raiz do projeto:

```sh
npm run dev -- --host 127.0.0.1 --port 5173
```
