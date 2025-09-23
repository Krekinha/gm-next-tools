# AGENT.md - Guia de Contribuição GM Tools

## 🤖 Sobre Este Documento

Este documento fornece orientações para IAs e desenvolvedores que contribuem com o projeto GM Tools. Contém padrões de código, processos de revisão e expectativas de qualidade.

## 📋 Informações do Projeto

- **Nome**: GM Tools - Suite de Ferramentas
- **Versão**: 0.1.0
- **Stack**: Next.js 15 + React 19 + TypeScript + Tailwind CSS + Shadcn UI
- **Linting**: Biome 2.2
- **Package Manager**: pnpm

## 🛠️ Configuração do Ambiente

### Pré-requisitos
```bash
# Versões mínimas
Node.js >= 18
pnpm >= 8
```

### Setup Inicial
```bash
# Clone e instale dependências
git clone <repo-url>
cd gm-tools
pnpm install

# Execute em desenvolvimento
pnpm dev

# Verifique qualidade do código
pnpm check
```

## 📝 Padrões de Código

### TypeScript
- **Strict Mode**: Sempre habilitado
- **Interfaces vs Types**: Prefira `interface` para objetos, `type` para unions/primitives
- **Imports**: Use `import type` para importações de tipos
- **Naming**: PascalCase para componentes, camelCase para funções/variáveis

```typescript
// ✅ Bom
interface UserProps {
  name: string
  email: string
}

import type { ReactNode } from 'react'

// ❌ Evitar
type UserProps = {
  name: string
  email: string
}

import { ReactNode } from 'react' // Sem 'type'
```

### React Components
- **Function Components**: Sempre use function declarations
- **Props Interface**: Defina interfaces explícitas para props
- **Exports**: Use named exports por padrão
- **Hooks**: Prefixe custom hooks com 'use'

```typescript
// ✅ Estrutura recomendada
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: ReactNode
  onClick?: () => void
}

export function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button
      className={cn('btn', `btn-${variant}`)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### Styling
- **Tailwind CSS**: Use classes utilitárias primeiro
- **Shadcn UI**: Para componentes base (em `components/ui/`)
- **Custom Classes**: Apenas quando necessário
- **Responsive**: Mobile-first approach

```typescript
// ✅ Bom
<div className="flex flex-col gap-4 md:flex-row md:gap-6">

// ❌ Evitar
<div style={{ display: 'flex', flexDirection: 'column' }}>
```

## 🏗️ Estrutura de Arquivos

### Organização
```
components/
├── ui/           # Shadcn components (não editar diretamente)
├── layout/       # Componentes de layout
├── dashboard/    # Componentes específicos
└── forms/        # Componentes de formulário

hooks/
├── use-mobile.ts # Custom hooks
└── use-*.ts      # Padrão: use-kebab-case

lib/
├── utils.ts      # Utilitários gerais
├── constants.ts  # Constantes globais
└── types.ts      # Tipos compartilhados
```

### Convenções de Nomenclatura
- **Arquivos**: kebab-case (`user-profile.tsx`)
- **Componentes**: PascalCase (`UserProfile`)
- **Hooks**: camelCase com 'use' (`useIsMobile`)
- **Utilitários**: camelCase (`formatDate`)

## 🔍 Code Quality

### Biome Configuration
O projeto usa Biome para linting e formatação:

```bash
# Scripts disponíveis
pnpm lint         # Verificar problemas
pnpm format       # Formatar código
pnpm check        # Verificar + formatar
pnpm fix          # Corrigir automaticamente
```

### Regras Importantes
- **No Console**: Não use `console.log` em produção
- **Explicit Any**: Evite `any`, use tipos específicos
- **Import Protocol**: Use `node:` para imports do Node.js
- **Unused Variables**: Remova variáveis não utilizadas

## 🧪 Testes (Futuro)

### Estratégia de Testes
```typescript
// Estrutura planejada
__tests__/
├── components/   # Testes de componentes
├── hooks/        # Testes de hooks
├── lib/          # Testes de utilitários
└── e2e/          # Testes end-to-end
```

### Padrões de Teste
- **Unit Tests**: Jest + Testing Library
- **Integration Tests**: Para fluxos críticos
- **E2E Tests**: Playwright para cenários principais
- **Coverage**: Meta de 80%+ de cobertura

## 📦 Dependências

### Adição de Dependências
```bash
# Produção
pnpm add package-name

# Desenvolvimento
pnpm add -D package-name
```

### Critérios para Novas Dependências
1. **Necessidade**: Resolve problema específico?
2. **Manutenção**: Projeto ativo e bem mantido?
3. **Tamanho**: Bundle size aceitável?
4. **Compatibilidade**: Funciona com React 19/Next.js 15?

### Dependências Aprovadas
- **UI**: @radix-ui/*, lucide-react
- **Styling**: tailwindcss, class-variance-authority
- **Utils**: clsx, tailwind-merge
- **Forms**: react-hook-form, zod (futuro)
- **Data**: @tanstack/react-query (futuro)

## 🔄 Processo de Contribuição

### Fluxo de Trabalho
1. **Análise**: Entenda o requisito completamente
2. **Planejamento**: Use TODO lists para tarefas complexas
3. **Implementação**: Siga padrões de código
4. **Verificação**: Execute `pnpm check` antes de finalizar
5. **Documentação**: Atualize docs se necessário

### Commits
```bash
# Padrão de commit messages
feat: adicionar calculadora avançada
fix: corrigir navegação mobile
docs: atualizar README com novos scripts
style: formatar código com Biome
refactor: melhorar estrutura de componentes
```

### Code Review
- **Funcionalidade**: Código funciona conforme esperado?
- **Padrões**: Segue convenções do projeto?
- **Performance**: Não introduz problemas de performance?
- **Acessibilidade**: Mantém padrões de a11y?
- **Testes**: Inclui testes quando aplicável?

## 🚀 Deploy e CI/CD

### Build Process
```bash
# Build local
pnpm build

# Verificar build
pnpm start
```

### Ambientes
- **Development**: `pnpm dev` (localhost:3000)
- **Preview**: Vercel preview deployments
- **Production**: Vercel production (main branch)

### Checklist de Deploy
- [ ] `pnpm check` passa sem erros
- [ ] Build local funciona (`pnpm build`)
- [ ] Testes passam (quando implementados)
- [ ] Performance mantida (Core Web Vitals)
- [ ] Acessibilidade preservada

## 📚 Recursos e Referências

### Documentação Oficial
- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn UI Docs](https://ui.shadcn.com)
- [Biome Docs](https://biomejs.dev)

### Ferramentas Úteis
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind Play](https://play.tailwindcss.com)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Lucide Icons](https://lucide.dev)

## 🐛 Troubleshooting

### Problemas Comuns

**Biome não está funcionando**
```bash
# Reinstale o Biome
pnpm remove @biomejs/biome
pnpm add -D @biomejs/biome
```

**Build falhando**
```bash
# Limpe cache e reinstale
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

**TypeScript errors**
```bash
# Verifique configuração
npx tsc --noEmit
```

## 🎯 Objetivos de Qualidade

### Métricas de Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

### Métricas de Código
- **Cobertura de Testes**: > 80%
- **Bundle Size**: < 1MB gzipped
- **Lighthouse Score**: > 95
- **Biome Issues**: 0 errors, minimal warnings

## 📞 Suporte

### Contatos
- **Tech Lead**: [definir]
- **Documentação**: `/docs/README.md`
- **Issues**: GitHub Issues (quando disponível)

### Canais de Comunicação
- **Discussões Técnicas**: [definir canal]
- **Code Reviews**: Pull Request comments
- **Documentação**: Este arquivo + `/docs/`

---

**Versão**: 1.0  
**Última Atualização**: Dezembro 2024  
**Próxima Revisão**: Janeiro 2025

> Este documento evolui com o projeto. Contribua com melhorias e mantenha-o atualizado!
