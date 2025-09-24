# Documentação Técnica - GM Tools

> Documentação completa das APIs públicas, componentes próprios, hooks e utilitários do GM Tools

## 📋 Visão Geral

Esta documentação cobre exclusivamente os componentes desenvolvidos internamente, hooks customizados, utilitários e páginas do App Router. Os componentes do Shadcn UI (`components/ui/`) não estão incluídos por serem bibliotecas externas.

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+
- pnpm 8+

### Instalação
```bash
# Clone o repositório
git clone <repo-url>
cd gm-tools

# Instale as dependências
pnpm install

# Execute em desenvolvimento
pnpm dev

# Abra http://localhost:3000
```

### Scripts Disponíveis
```bash
pnpm dev          # Servidor de desenvolvimento com Turbopack
pnpm build        # Build de produção com Turbopack
pnpm start        # Servidor de produção
pnpm lint         # Linting com Biome
pnpm format       # Formatação com Biome
pnpm check        # Verificar código com Biome
pnpm fix          # Corrigir problemas automaticamente
```

## 📚 Documentação por Categoria

### 🧩 Componentes Próprios

Componentes desenvolvidos internamente, excluindo bibliotecas externas:

#### Layout
- **[AppSidebar](components/layout/app-sidebar.md)** - Barra lateral com logo GMTools e navegação responsiva
- **[AppTopbar](components/layout/app-topbar.md)** - Barra superior fixa com controles e toggle de tema
- **[MainToggleTheme](components/layout/main-toggle-theme.md)** - Toggle de tema sem problemas de hidratação

#### Dashboard
- **[WelcomeDashboard](components/dashboard/welcome-dashboard.md)** - Componente de boas-vindas do dashboard

### 🪝 Hooks Customizados

Hooks React desenvolvidos para o projeto:

- **[useIsMobile](hooks/use-is-mobile.md)** - Hook para detectar dispositivos móveis

### 🛠️ Utilitários

Funções auxiliares e utilitários:

- **[cn](lib/cn.md)** - Utilitário para combinação de classes CSS

### 📄 Páginas do App Router

Documentação das páginas e layouts do Next.js:

- **[app/layout.tsx](app/layout.md)** - Layout raiz compartilhado com sidebar e topbar
- **[app/page.tsx](app/page.md)** - Dashboard principal (página root /)
- **[app/dashboard/page.tsx](app/dashboard/page.md)** - Dashboard detalhado (/dashboard)
- **[app/documents/page.tsx](app/documents/page.md)** - Gestão de documentos
- **[app/reports/technical/page.tsx](app/reports/technical/page.md)** - Relatórios técnicos

## 📖 Documentação Complementar

### Product Requirements Document
**[📋 PRD.md](PRD.md)** - Documento de requisitos do produto

Contém a visão completa do produto, incluindo:
- Objetivos e métricas de sucesso
- Personas e casos de uso
- Roadmap de funcionalidades
- Especificações técnicas e de design
- Critérios de aceitação e plano de lançamento

### Oportunidades de Automação
**[🤖 AUTOMATION.md](AUTOMATION.md)** - Plano de automação e melhorias

Documenta oportunidades de automação no fluxo de trabalho:
- Matriz de priorização de automações
- Implementações já realizadas (Biome, documentação)
- Roadmap de automações futuras (CI/CD, testes, monitoramento)
- ROI estimado e métricas de sucesso

## 🏗️ Arquitetura do Projeto

### Stack Tecnológica
- **Frontend**: React 19 + Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4 + Shadcn UI
- **Language**: TypeScript (strict mode)
- **Linting**: Biome 2.2
- **Package Manager**: pnpm

### Estrutura de Diretórios
```
gm-tools/
├── app/                    # App Router (páginas e layouts)
│   ├── layout.tsx          # Layout raiz compartilhado (sidebar + topbar fixa)
│   ├── page.tsx            # Dashboard principal (rota root /)
│   ├── dashboard/          # Dashboard detalhado (/dashboard)
│   ├── documents/          # Gestão de documentos (/documents)
│   └── reports/            # Relatórios técnicos (/reports/technical)
├── components/            
│   ├── layout/            # Componentes de layout próprios
│   │   ├── app-sidebar.tsx    # Barra lateral com logo GMTools
│   │   ├── app-topbar.tsx     # Barra superior com controles
│   │   └── main-toggle-theme.tsx # Toggle de tema
│   ├── dashboard/         # Componentes do dashboard próprios
│   │   └── welcome-dashboard.tsx # Dashboard de boas-vindas
│   └── ui/               # Componentes Shadcn (não documentados)
├── hooks/                # Custom hooks
│   └── use-mobile.ts     # Hook para detectar mobile
├── lib/                  # Utilitários e helpers
│   └── utils.ts          # Função cn para classes CSS
├── providers/            # Providers React
│   └── theme-provider.tsx # Provider de tema
├── .cursor/              # Regras de desenvolvimento organizadas
└── docs/                 # Esta documentação
```

## 🎨 Padrões de Desenvolvimento

### Convenções de Código
- **Componentes**: PascalCase (`AppTopbar`, `MainToggleTheme`)
- **Arquivos**: kebab-case (`app-topbar.tsx`, `main-toggle-theme.tsx`)
- **Hooks**: camelCase com 'use' (`useIsMobile`)
- **Exports**: Named exports preferencialmente

### Qualidade de Código
- **TypeScript**: Strict mode habilitado
- **Linting**: Biome com regras customizadas
- **Formatação**: Automática via Biome
- **Imports**: `import type` para tipos

## 📞 Suporte

### Recursos Úteis
- **Guia de Contribuição**: `../AGENT.md`
- **README Principal**: `../README.md`
- **Configuração Biome**: `../biome.json`

### Documentação Externa
- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn UI Docs](https://ui.shadcn.com)

---

**Versão da Documentação**: 1.0  
**Última Atualização**: Dezembro 2024  
**Responsável**: Equipe GM Tools

