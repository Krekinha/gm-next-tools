Builder

2 context(s) used

Análise concluída. Abaixo listo quais instruções do arquivo `instrucoes-ex.md` fazem sentido incorporar ao seu arquivo de regras `project_rules.md` , considerando seu stack (TypeScript, React 19, Next.js 15 App Router, Vercel AI SDK, Shadcn UI, Zod v4, Radix UI, Tailwind CSS) e ignorando tudo que é específico do Igniter.js.

O que você pode aproveitar e incluir (não-Igniter)

1. 1.
   Diretrizes de Comunicação e Processo (Adicionar — não estão no seu arquivo)
- Solicitar confirmação explícita do usuário para decisões importantes.
- Registrar insights e decisões de forma organizada para rastreabilidade.
- Alinhar continuamente a visão técnica com objetivos de produto, necessidades de mercado e estratégia de negócios.
- Oferecer insights que aumentem produtividade e mantenibilidade do código.
- Sugerir melhorias técnicas e estratégicas proativamente.
- Documentar passos e decisões importantes, pedindo aprovação antes de mudanças sensíveis.
- Manter a regra de idioma: comunicar-se no idioma do usuário e escrever arquivos e código em inglês (esta já está no seu arquivo e pode ser mantida/reforçada).
Sugestão de seção a adicionar em project_rules.md:

- Título: Comunicação e Workflow
  - Solicitar confirmação para decisões impactantes (arquitetura, dependências, breaking changes).
  - Registrar decisões (o quê, por quê, alternativas) junto às PRs ou tasks.
  - Conectar escolhas técnicas a objetivos de negócio e UX.
  - Propor melhorias contínuas de DX, performance e acessibilidade.
  - Documentar mudanças relevantes e pedir aprovação antes de aplicá-las.
2. 1.
   Validação com Zod v4 (Refinar — parcialmente coberto, vale explicitar padrões)
   O documento enfatiza a validação formal de entrada com Zod e, separadamente, a validação de regras de negócio. Sem Igniter, você pode institucionalizar estes padrões:
- Padronizar Zod v4 para validar dados em:
  - Server Actions/Route Handlers (body, query, params)
  - Formulários no cliente (com safeParse + mensagens de erro amigáveis)
- Centralizar schemas reutilizáveis em lib/validators (ou lib/schemas) para compartilhamento entre server e client.
- Inferir tipos com z.infer para garantir type-safety ponta a ponta.
- Tratar regras de negócio com assertivas claras e mensagens específicas (por exemplo, helpers util/ensure.ts) — sem plugins externos, apenas boas práticas de checagem e early return.
- Superfícies de erro: retornar erros estruturados e mapeáveis no UI (erro de validação vs erro de regra de negócio vs erro inesperado).
Sugestão de seção a adicionar/expandir:

- Título: Validação de Dados (Zod v4)
  - Usar Zod v4 para validar inputs (server e client).
  - Centralizar schemas e reutilizar entre camadas; usar z.infer para tipos.
  - Distinguir erros de validação (400) de erros de regra de negócio (403/404/etc.) e de falhas inesperadas (500).
  - Em formulários, exibir estados de carregamento, mensagens específicas por campo e resumo de erros.
  - Preferir validação server-side como fonte da verdade; client-side apenas para UX.
3. 1.
   Padrões de Arquitetura/Next.js/React (Reforçar — já contemplado no seu arquivo)
   Estes pontos aparecem no documento e já estão na sua regra atual; recomendo manter e reforçar:
- App Router como base da estrutura do projeto.
- Preferir React Server Components; minimizar 'use client'.
- Usar Suspense para operações assíncronas e implementar error boundaries.
- Otimizar para Web Vitals e performance (minimizar estado no cliente, evitar efeitos desnecessários).
- Data fetching preferencialmente em Server Components, com tratamento de estados de loading e erro.
- Roteamento: seguir convenções do App Router, rotas dinâmicas e paralelas quando necessário.
- Formulários: validação com Zod, estados de carregamento no submit, e tratamento de erros claro.
O que deve ser ignorado (específico do Igniter.js)

- Qualquer referência a:
  - app/api/[[...igniter]]/route.ts e nextRouteHandlerAdapter (2.1).
  - Estrutura de API por controladores/ações, src/igniter.ts, src/igniter.router.ts, procedures e contexto (2.2, 3.1, 3.2, 3.3, 3.5).
  - Cliente universal igniter, hooks useQuery/useMutation/useRealtime próprios (2.3, 5.2, 5.3).
  - Revalidação automática via response.revalidate e SSE/Revalidation Scopes (4.3, exemplos de streaming/realtime).
  - Store (Redis) e Jobs (BullMQ) do ecossistema Igniter (4.1, 4.2).
  - API de resposta/response encadeável do Igniter.
Resumo prático do que inserir no seu project_rules.md

- Adicionar uma seção “Comunicação e Workflow” com os bullets de processo (confirmação, registro de decisões, alinhamento com produto, sugestões proativas, documentação/approvals).
- Expandir a seção de “Formulários e Validação” detalhando o uso de Zod v4 (schemas compartilhados, z.infer, diferenciação de erros, UX de formulários).
- Reforçar as boas práticas de Next.js/React 19 já existentes (RSC por padrão, Suspense, error boundaries, data fetching no server, performance).
Se quiser, eu já posso preparar o texto exato dessas novas seções para colar diretamente no `project_rules.md` . Quer que eu proponha o wording?

Krekinha

Copy

Delete

proponha o wording, mas não exclua nenhuma instrução do project_rules.md nem inclua instruções existentes (sem repetições)

Builder

Used 1 context

project_rules.md

.trae\rules\project_rules.md

docs\ex\instrucoes-ex.md

Perfeito. Seguem textos prontos para você colar no final do arquivo `project_rules.md` , sem remover nada do conteúdo atual e sem repetir instruções existentes. Todo o conteúdo abaixo adapta partes relevantes de `instrucoes-ex.md` que não são específicas do Igniter.js.

Seção nova: Comunicação e Workflow

- Postura: proativa, empática, prática, comprometida e adaptável ao nível técnico do time.
- Solicitar confirmação explícita para decisões impactantes (arquitetura, adoção/troca de dependências, padrões de estado, breaking changes, políticas de cache).
- Registrar decisões e insights de forma organizada (o que, por quê, alternativas consideradas, trade-offs), vinculando às issues/PRs correspondentes.
- Manter diálogo claro, estruturado e objetivo; preferir primeira pessoa e voz ativa nas discussões e PRs.
- Alinhar escolhas técnicas com objetivos de produto, necessidades do mercado, métricas de negócio e estratégia de UX.
- Sugerir melhorias técnicas e estratégicas proativamente (performance, acessibilidade, segurança, DX) com plano de rollout e reversão.
- Documentar passos e decisões importantes e pedir aprovação explícita antes de aplicar modificações sensíveis.
Seção nova: Validação de Dados (Zod v4 — detalhamento)

- Centralizar schemas em um diretório compartilhado (ex.: lib/schemas ou lib/validators) para uso isomórfico (server e client).
- Inferir tipos com z.infer a partir dos schemas e evitar duplicação de definições de tipos.
- Diferenciar claramente as classes de erro:
  - 400 para falhas de validação de entrada (body, params, query)
  - 401/403 para autenticação/autorização
  - 404 para recurso inexistente
  - 409 para conflitos de estado
  - 500 para erros inesperados
- Em formulários, mapear mensagens de erro por campo (field-level) e fornecer feedbacks específicos e acionáveis; exibir estado de carregamento durante o envio.
- Validar no server como fonte da verdade; validação no client serve para UX rápida e não substitui a validação no server.
- Em Server Actions e Route Handlers, validar body/params/query antes da lógica de negócio; retornar erros estruturados sem expor detalhes sensíveis.
- Adotar early returns em validações para manter handlers simples, legíveis e previsíveis.
Seção nova: Documentação e Automação (DX)

- Manter o README sempre atualizado e útil, refletindo arquitetura, scripts, ambientes e decisões relevantes.
- Manter um arquivo AGENT.md com orientações de contribuição, processos de revisão e expectativas de qualidade (quando aplicável).
- Registrar oportunidades de automação e melhoria contínua do fluxo de trabalho (scripts, CLIs, geradores) e priorizar itens de alto impacto/baixo risco.
- Automatizar tarefas repetitivas sempre que possível (lint, format, commit hooks, checklists de PR, verificação de acessibilidade/performance), com instruções claras de uso.
- Ao introduzir automações, medir o impacto (tempo economizado, redução de erros) e documentar como habilitar/desabilitar e reverter mudanças quando necessário.
- Garantir que qualquer nova automação não exponha segredos e siga boas práticas de segurança.