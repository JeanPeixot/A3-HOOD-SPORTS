# HOOD SPORTS — Kit de evolução de frontend

Pesquisa de 10/09/2026 para a stack existente: React 18, TypeScript, Vite 5, Tailwind CSS 3 e Lucide. A entrega contém **13 recursos selecionados**, **6 referências descartadas da adoção direta** e **3 skills originais**. Não houve instalação de dependências, integração de bibliotecas ou reformulação da interface.

## Como usar

1. Leia [pesquisa.md](pesquisa.md) para comparar recursos, licenças, fontes e limitações.
2. Abra [recursos.csv](recursos.csv) no Excel, LibreOffice ou outro leitor CSV: UTF-8, separador vírgula e primeira linha como cabeçalho. Filtre `selecao` e `recomendacao`. O arquivo usa textos simples, sem fórmulas ou macros.
3. Siga [plano-de-adocao.md](plano-de-adocao.md): base funcional → tokens → modais/teclado → microinterações → coleção com scroll → mídia/3D condicional.
4. Escolha uma skill conforme a próxima tarefa. Os pacotes estão prontos como pastas com `SKILL.md`, mas não foram instalados globalmente nem ativados automaticamente no projeto.

## As três skills

| Pasta | Quando utilizar | Entrada |
|---|---|---|
| hood-ui-system | Cores, tipografia, componentes e responsividade | [SKILL.md](skills/hood-ui-system/SKILL.md) |
| hood-scroll-motion | CSS, GSAP condicional, scroll nativo e movimento reduzido | [SKILL.md](skills/hood-scroll-motion/SKILL.md) |
| hood-frontend-review | Revisão funcional/visual, teclado, foco e performance | [SKILL.md](skills/hood-frontend-review/SKILL.md) |

Cada pasta é autocontida e tem frontmatter YAML com nome e descrição, instruções de ativação, processo, arquivos a consultar, ferramentas, restrições, aceite e exemplo. Não depende de outras skills ou serviços pagos.

Para uso direto sem instalação, indique ao agente o caminho do `SKILL.md` e peça que o leia para a tarefa. O nome `$hood-ui-system`, por exemplo, só fica disponível para descoberta automática depois que a pasta for registrada no local de skills reconhecido pelo agente. Se futuramente desejar instalar, use o fluxo de instalação do seu agente e aponte para uma das três pastas; o ZIP completo não é uma única skill. Este kit não executa nenhum instalador.

Exemplo sem registro: “Leia `deliverables/hood-frontend-kit/skills/hood-ui-system/SKILL.md` e proponha ajustes nos cards, sem editar a aplicação.” Os caminhos de componentes nas skills são relativos à raiz do HOOD, não à pasta da skill.

## Melhor retorno para o projeto

CSS/APIs nativas e Lucide reaproveitam o que já existe. Radix é a opção de maior valor para os diálogos. GSAP só entra se uma narrativa de coleção justificar o custo. 60fps orienta feedback e transições; nenhuma gravação deve ser copiada para a loja.

Three.js e Fiber são opções futuras de visualização de produto, não requisito estético. Fiber 8 é a linha indicada pelo projeto original para React 18; a linha 9 acompanha React 19. Os pares exatos de versões ainda precisam de teste. Scroll World não tem licença aberta declarada e o candidato Parallax Landing Page intercepta rolagem: ambos ficam fora da adoção.

## Conteúdo e verificação

- [Pesquisa e fontes](pesquisa.md)
- [Comparativo CSV](recursos.csv)
- [Plano de adoção](plano-de-adocao.md)
- [Registro de validação](validacao.md)
- [Pacote completo ZIP](../hood-frontend-kit.zip)

“Links verificados” significa que o conteúdo público indicado foi consultado, com redirecionamentos e falhas registrados; não significa que demos, contas, compras ou integrações foram testadas. Preços e licenças podem mudar. Revalidar a versão e os termos do recurso antes de adotá-lo.

O pacote contém somente materiais originais desta entrega e links externos. Nenhum código, vídeo, screenshot, template pago ou asset de terceiro foi redistribuído. O acesso público a um repositório não é tratado como licença. A prancheta acadêmica e a aplicação permanecem inalteradas nesta tarefa.
