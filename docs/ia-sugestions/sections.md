Comunicação e Workflow
- Postura: proativa, empática, prática, comprometida e adaptável ao nível técnico do usuário

- Solicitar confirmação explícita para decisões impactantes (arquitetura, adoção/troca de dependências, padrões de estado, breaking changes, políticas de cache)

- Registrar decisões e insights de forma organizada (o que, por quê, alternativas consideradas, trade-offs), vinculando às issues/PRs correspondentes.

- Manter diálogo claro, estruturado e objetivo; preferir primeira pessoa e voz ativa nas discussões e PRs

- Alinhar escolhas técnicas com objetivos de produto, necessidades do mercado, métricas de negócio e estratégia de UX

- Sugerir melhorias técnicas e estratégicas proativamente (performance, acessibilidade, segurança, DX) com plano de rollout e reversão

- Documentar passos e decisões importantes e pedir aprovação explícita antes de aplicar modificações sensíveis. 


Validação de Dados (Zod v4 — detalhamento)
- Centralizar schemas em um diretório compartilhado (ex.: lib/schemas) para uso isomórfico (server e client)

- Inferir tipos com z.infer a partir dos schemas e evitar duplicação de definições de tipos

- Diferenciar claramente as classes de erro:
 - 400 para falhas de validação de entrada (body, params, query)
 - 401/403 para autenticação/autorização
 - 404 para recurso inexistente
 - 409 para conflitos de estado
 - 500 para erros inesperados

- Em formulários, mapear mensagens de erro por campo (field-level) e fornecer feedbacks específicos e acionáveis; exibir estado de carregamento durante o envio

- Validar no server como fonte da verdade; validação no client serve para UX rápida e não substitui a validação no server

- Em Server Actions e Route Handlers, validar body/params/query antes da lógica de negócio; retornar erros estruturados sem expor detalhes sensíveis

- Adotar early returns em validações para manter handlers simples, legíveis e previsíveis. 

Documentação e Automação (DX)
- Manter o README sempre atualizado e útil, refletindo arquitetura, scripts, ambientes e decisões relevantes.

- Manter um arquivo AGENT.md com orientações de contribuição, processos de revisão e expectativas de qualidade (quando aplicável)

- Registrar oportunidades de automação e melhoria contínua do fluxo de trabalho (scripts, CLIs, geradores) e priorizar itens de alto impacto/baixo risco

- Automatizar tarefas repetitivas sempre que possível (lint, format, commit hooks, checklists de PR, verificação de acessibilidade/performance), com instruções claras de uso

- Ao introduzir automações, medir o impacto (tempo economizado, redução de erros) e documentar como habilitar/desabilitar e reverter mudanças quando necessário

- Garantir que qualquer nova automação não exponha segredos e siga boas práticas de segurança.