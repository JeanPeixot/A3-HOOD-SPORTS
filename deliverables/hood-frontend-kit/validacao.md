# Registro de validação

Consulta e geração: 10/09/2026.

## Arquivos e tabela

- CSV em UTF-8, delimitado por vírgulas, com 20 colunas e 19 registros: 13 selecionados e 6 descartados da adoção direta.
- Tabela criada com o runtime de planilhas disponível e reimportada; valores e dimensões conferidos integralmente. Conferência adicional com o leitor CSV da biblioteca padrão Python.
- Três pastas de skills, cada uma com seu SKILL.md autocontido; nomes correspondem às pastas, descrições não vazias e dentro dos limites de tamanho.
- Frontmatter simples com duas propriedades (name e description), seções requeridas e ausência de placeholders conferidos. Caminhos explícitos do projeto citados pelas skills existem.
- Links relativos Markdown conferidos dentro da pasta de entrega. Links externos e suas limitações estão documentados na pesquisa.
- ZIP com oito arquivos UTF-8, sem assets de terceiros; abertura, CRC e comparação SHA-256 de cada entrada com o original conferidos. A pasta raiz do arquivo compactado é hood-frontend-kit/.

## Limitação do validador de skills

O script quick_validate.py da skill-creator foi tentado nas três skills, mas não iniciou por ausência de PyYAML no Python disponível (ModuleNotFoundError: yaml). Nenhuma dependência foi instalada. Foi feita uma checagem estrutural independente, usando apenas a biblioteca padrão, para o frontmatter simples e os requisitos acima. Isso não equivale à execução bem-sucedida do validador oficial nem a um teste de descoberta automática no agente.

As instruções das três skills foram revisadas para preservar escopo, identidade, regras comerciais, rolagem nativa, limpeza de efeitos e acessibilidade. As skills externas foram tratadas como documentos de pesquisa, sem ativação ou instalação.

## Escopo da evidência

As recomendações foram confrontadas com os arquivos do HOOD e fontes públicas oficiais. Não foram instalados pacotes, integradas bibliotecas, executadas demos externas, compradas assinaturas ou medidas taxas de quadros. A aplicação e a prancheta não foram alteradas nesta tarefa; as alterações anteriores existentes no repositório não foram revertidas.

O conteúdo deste kit é uma pesquisa e um plano de adoção. Compatibilidade descrita em documentação ainda exige teste das versões escolhidas quando uma integração for autorizada. Nenhum build anterior comprova as integrações sugeridas.
