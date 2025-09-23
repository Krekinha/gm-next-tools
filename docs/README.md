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
pnpm dev          # Servidor de desenvolvimento
pnpm build        # Build de produção
pnpm start        # Servidor de produção
pnpm check        # Verificar código com Biome
pnpm fix          # Corrigir problemas automaticamente
```

## 📚 Documentação por Categoria

### 🧩 Componentes Próprios

Componentes desenvolvidos internamente, excluindo bibliotecas externas:

#### Layout
- **[AppLayout](components/layout/app-layout.md)** - Layout principal da aplicação com sidebar
- **[AppSidebar](components/layout/app-sidebar.md)** - Barra lateral de navegação

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

- **[app/layout.tsx](app/layout.md)** - Layout raiz da aplicação
- **[app/page.tsx](app/page.md)** - Página inicial do dashboard

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
├── components/            
│   ├── layout/            # Componentes de layout próprios
│   ├── dashboard/         # Componentes do dashboard próprios
│   └── ui/               # Componentes Shadcn (não documentados)
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e helpers
└── docs/                 # Esta documentação
```

## 🎨 Padrões de Desenvolvimento

### Convenções de Código
- **Componentes**: PascalCase (`AppLayout`)
- **Arquivos**: kebab-case (`app-layout.tsx`)
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

