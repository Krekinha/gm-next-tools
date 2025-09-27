# AGENT.md - Guia de Contribuição para GM Tools

## 🤖 Sobre este Arquivo

Este arquivo contém orientações específicas para agentes de IA que contribuem com o projeto GM Tools. Ele define processos de revisão, expectativas de qualidade e diretrizes para desenvolvimento eficiente.

## 📋 Processo de Contribuição

### 1. Análise de Solicitações

Antes de implementar qualquer mudança, siga este processo:

1. **Request Analysis**
   - Determine o tipo da tarefa (criação, depuração, arquitetura, etc.)
   - Identifique tecnologias envolvidas (React 19, Next.js 15, TypeScript, etc.)
   - Observe requisitos explícitos e implícitos
   - Consulte documentação oficial usando Context7 quando necessário

2. **Planejamento da Solução**
   - Divida a solução em etapas lógicas
   - Considere modularidade e reutilização
   - Identifique arquivos e dependências necessárias
   - Avalie abordagens alternativas

3. **Estratégia de Implementação**
   - Escolha padrões de design apropriados
   - Considere implicações de performance
   - Planeje tratamento de erros e edge cases
   - Garanta conformidade com acessibilidade (A11y)

### 2. Padrões de Qualidade

#### Código TypeScript
- Use TypeScript para todo o código
- Prefira interfaces em vez de types
- Evite enums; use `const maps` em vez disso
- Implemente segurança de tipo (`type safety`) adequada
- Use operador `satisfies` para validação de tipos

#### React e Next.js
- Prefira `React Server Components (RSC)` sempre que possível
- Minimize o uso das diretivas `'use client'`
- Implemente `error boundaries` adequados
- Use `Suspense` para operações assíncronas
- Otimize para performance e `Web Vitals`

#### Estrutura e Estilo
- Escreva código conciso e legível
- Use padrões de programação funcionais e declarativos
- Siga o princípio `DRY (Don't Repeat Yourself)`
- Implemente retornos antecipados (early returns)
- Adicione comentários em português para explicações complexas

### 3. Convenções de Nomenclatura

- **Arquivos**: `kebab-case` com sufixo apropriado
- **Componentes**: `PascalCase` com named exports
- **Funções**: `camelCase` com verbos auxiliares (isLoading, hasError)
- **Eventos**: Prefixe com "handle" (handleClick, handleSubmit)
- **Diretórios**: `kebab-case` (ex: components/auth-wizard)

## 🔧 Ferramentas e Automação

### Scripts Disponíveis
```bash
# Desenvolvimento
pnpm dev          # Servidor de desenvolvimento com Turbopack
pnpm build        # Build de produção
pnpm start        # Servidor de produção

# Qualidade de Código
pnpm lint         # Executa lint com Biome
pnpm format       # Formata código com Biome
pnpm check        # Verifica e formata código
pnpm fix          # Corrige problemas automaticamente

# Dependências
pnpm install      # Instala dependências
pnpm add <pkg>    # Adiciona nova dependência
```

### Verificação com Playwright
- Use Playwright para verificar alterações na interface
- Acesse `http://localhost:3000` após mudanças significativas
- Capture screenshots para documentar estados
- Verifique console para erros JavaScript
- Teste interações básicas quando relevante
- **Teste fluxos de autenticação**: login, logout, redirecionamentos
- **Verifique proteção de rotas**: acesso sem autenticação
- **Valide middleware**: comportamento em diferentes estados

## 📚 Documentação

### Estrutura de Documentação
- **README.md**: Visão geral, arquitetura e scripts
- **docs/README.md**: Documentação técnica detalhada
- **docs/PRD.md**: Product Requirements Document
- **docs/AUTOMATION.md**: Oportunidades de automação
- **.cursor/rules/**: Regras de desenvolvimento organizadas

### Padrões de Documentação
- Use português para explicações e comentários
- Código sempre em inglês
- Inclua exemplos práticos quando possível
- Mantenha documentação atualizada com mudanças
- Use emojis para melhor organização visual

## 🚨 Processo de Revisão

### Checklist de Qualidade
- [ ] Código segue padrões TypeScript estabelecidos
- [ ] Componentes seguem melhores práticas React 19
- [ ] Layout responsivo funciona em diferentes telas
- [ ] Acessibilidade (A11y) implementada adequadamente
- [ ] Performance otimizada (Web Vitals)
- [ ] Documentação atualizada
- [ ] Testes funcionais com Playwright
- [ ] **Autenticação funcionando corretamente**
- [ ] **Middleware de proteção ativo**
- [ ] **Validação de formulários com Zod**
- [ ] **Estados de loading e erro implementados**

### Validação de Mudanças
1. **Verificação Automática**: Execute `pnpm check` antes de finalizar
2. **Teste Manual**: Use Playwright para verificar interface
3. **Revisão de Código**: Verifique se segue padrões estabelecidos
4. **Documentação**: Atualize docs relevantes se necessário
5. **Teste de Autenticação**: Valide login, logout e proteção de rotas
6. **Validação de Formulários**: Teste schemas Zod e mensagens de erro

## 🎯 Expectativas de Qualidade

### Performance
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3s

### Acessibilidade
- Score WCAG 2.1 AA > 95%
- Navegação por teclado completa
- Screen reader compatibility
- Contraste de cores adequado

### Código
- Zero bugs críticos
- Cobertura de tipos TypeScript > 95%
- Componentes reutilizáveis e modulares
- Tratamento de erros adequado

## 🔄 Fluxo de Trabalho

### Para Novas Funcionalidades
1. Analise requisitos usando processo estabelecido
2. Consulte documentação oficial (Context7)
3. Implemente seguindo padrões de qualidade
4. **Configure autenticação se necessário**
5. **Valide com schemas Zod**
6. Teste com Playwright
7. Atualize documentação
8. Execute checklist de qualidade

### Para Correções de Bugs
1. Identifique causa raiz do problema
2. Implemente solução mínima e eficaz
3. **Teste autenticação se afetada**
4. **Valide middleware se modificado**
5. Teste cenários relacionados
6. Verifique se não introduziu regressões
7. Documente solução se necessário

### Para Melhorias de Performance
1. Identifique gargalos específicos
2. Implemente otimizações focadas
3. Meça impacto com Web Vitals
4. Valide em diferentes dispositivos
5. Documente melhorias implementadas

## 📞 Comunicação

### Postura Esperada
- **Proativa**: Antecipe necessidades e problemas
- **Empática**: Considere impacto nas pessoas
- **Prática**: Foque em soluções executáveis
- **Comprometida**: Entregue qualidade consistente
- **Adaptável**: Ajuste abordagem conforme contexto

### Alinhamento Técnico
- Alinhe escolhas técnicas com objetivos de produto
- Considere necessidades do mercado e métricas de negócio
- Sugira melhorias proativamente (performance, acessibilidade, segurança)
- Documente decisões importantes
- Peça aprovação para mudanças impactantes

## 🎓 Recursos de Aprendizado

### Documentação Oficial
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Zod Validation](https://zod.dev)
- [Sonner Notifications](https://sonner.emilkowal.ski)

### Ferramentas do Projeto
- Biome: Linting e formatação rápida
- Turbopack: Bundler otimizado para desenvolvimento
- Playwright: Testes de interface automatizados
- Context7: Documentação técnica atualizada
- Supabase: Autenticação e banco de dados
- Zod: Validação de schemas
- Sonner: Sistema de notificações

## 🔍 Verificação de Qualidade

### Antes de Finalizar
1. **Execute `pnpm check`** para verificar código
2. **Teste com Playwright** para validar interface
3. **Verifique autenticação** se modificada
4. **Valide middleware** se alterado
5. **Teste formulários** com schemas Zod
6. **Atualize documentação** se necessário

### Indicadores de Sucesso
- ✅ Código compila sem erros
- ✅ Interface funciona em diferentes dispositivos
- ✅ Autenticação funciona corretamente
- ✅ Middleware protege rotas adequadamente
- ✅ Formulários validam dados corretamente
- ✅ Performance atende métricas estabelecidas
- ✅ Acessibilidade atende padrões WCAG

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Responsável**: Equipe GM Tools
