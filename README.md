# GM Tools - Suite de Ferramentas

> Suite completa de ferramentas para automatizar tarefas do dia a dia

## 🚀 Visão Geral

GM Tools é uma aplicação web moderna construída com Next.js 15 e React 19, projetada para fornecer uma suite integrada de ferramentas de produtividade. A aplicação utiliza o App Router do Next.js e componentes modernos para uma experiência de usuário fluida e responsiva.

## 🏗️ Arquitetura

### Stack Tecnológica
- **Framework**: Next.js 15 com App Router e Turbopack
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + Shadcn UI
- **Componentes**: Radix UI primitives
- **Ícones**: Lucide React
- **Autenticação**: Better Auth com Supabase
- **Banco de Dados**: PostgreSQL + Prisma ORM
- **Validação**: Zod v4
- **Linting/Formatting**: Biome 2.2
- **Package Manager**: pnpm

### Estrutura do Projeto
```
gm-tools/
├── app/                    # App Router (Next.js 15)
│   ├── layout.tsx         # Layout raiz compartilhado (sidebar + topbar)
│   ├── page.tsx           # Dashboard principal (rota root /)
│   ├── api/auth/          # API routes do Better Auth
│   ├── auth/              # Páginas de autenticação (/auth/login, /auth/register)
│   ├── dashboard/         # Dashboard detalhado (/dashboard)
│   ├── documents/         # Gestão de documentos (/documents)
│   ├── reports/           # Relatórios técnicos (/reports/technical)
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes Shadcn (ignorados pelo Biome)
│   ├── layout/           # Componentes de layout (sidebar, topbar)
│   ├── auth/             # Componentes de autenticação
│   └── dashboard/        # Componentes específicos do dashboard
├── hooks/                # Custom hooks
│   ├── use-auth.ts       # Hooks de autenticação
│   └── use-mobile.ts     # Hook para detectar mobile
├── lib/                  # Utilitários e helpers
│   ├── auth.ts           # Configuração do Better Auth
│   ├── schemas/          # Schemas de validação Zod
│   ├── prisma.ts         # Cliente Prisma
│   ├── supabase.ts       # Cliente Supabase
│   └── utils.ts          # Utilitários gerais
├── prisma/               # Schema e migrações do banco
├── scripts/              # Scripts de automação
├── docs/                 # Documentação técnica
├── .cursor/              # Regras de desenvolvimento organizadas
└── public/              # Assets estáticos
```

### Decisões Arquiteturais

1. **App Router**: Escolhido para aproveitar Server Components e melhor performance
2. **Layout Compartilhado**: Sidebar e topbar compartilhados entre todas as rotas via layout root
3. **Better Auth**: Sistema de autenticação moderno com Supabase para segurança e escalabilidade
4. **Prisma + Supabase**: ORM type-safe com banco PostgreSQL gerenciado
5. **Zod v4**: Validação de dados robusta e type-safe
6. **Biome**: Substituiu ESLint/Prettier para lint e formatação mais rápida
7. **Shadcn UI**: Componentes customizáveis baseados em Radix UI
8. **TypeScript**: Tipagem estática para melhor DX e manutenibilidade
9. **Turbopack**: Bundler mais rápido para desenvolvimento
10. **Regras Organizadas**: Sistema de regras modular em `.cursor/rules/` para facilitar manutenção

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia servidor de desenvolvimento com Turbopack

# Build e Deploy
pnpm build        # Build de produção com Turbopack
pnpm start        # Inicia servidor de produção

# Code Quality
pnpm lint         # Executa lint com Biome
pnpm format       # Formata código com Biome
pnpm check        # Verifica e formata código
pnpm fix          # Corrige problemas automaticamente

# Banco de Dados
pnpm db:studio    # Interface visual do Prisma
pnpm db:migrate   # Aplica migrações do banco
pnpm db:generate  # Gera cliente Prisma

# Autenticação e Supabase
pnpm setup-supabase-auth    # Cria tabelas do Better Auth no Supabase
pnpm show-supabase-sql      # Exibe SQL para execução manual
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- pnpm 8+

### Instalação e Execução
```bash
# Clone o repositório
git clone <repo-url>
cd gm-tools

# Instale as dependências
pnpm install

# Execute em modo de desenvolvimento
pnpm dev

# Abra http://localhost:3000
```

## 🛠️ Funcionalidades Implementadas

A aplicação oferece uma interface unificada com as seguintes funcionalidades:

### ✅ **Core Features**
- **Dashboard Principal**: Página root (/) com métricas e atividades recentes
- **Dashboard Detalhado**: Página /dashboard com análise aprofundada
- **Gestão de Documentos**: Interface para upload, organização e busca de documentos
- **Relatórios Técnicos**: Análise de performance e monitoramento do sistema

### ✅ **Sistema de Autenticação**
- **Login/Registro**: Páginas de autenticação com validação Zod
- **Proteção de Rotas**: Middleware que protege todas as páginas
- **Sessões Persistentes**: Gerenciamento seguro de sessões com Better Auth
- **Menu do Usuário**: Dropdown com informações do usuário e logout
- **Dois Níveis de Acesso**: Usuário comum e administrador

### ✅ **Interface e UX**
- **Layout Responsivo**: Sidebar colapsível e navegação intuitiva
- **Topbar Fixa**: Barra superior que permanece fixa durante o scroll
- **Tema Claro/Escuro**: Alternância de tema com persistência (sem problemas de hidratação)
- **Navegação Centralizada**: Sistema de rotas com layout compartilhado
- **Logo GMTools**: Branding consistente com link para página principal
- **Loading States**: Estados de carregamento e feedback visual
- **Error Handling**: Tratamento de erros com mensagens amigáveis

## 🎨 Design System

- **UI Components**: Baseado em Shadcn UI com Radix primitives
- **Tema**: Sistema de cores consistente com modo claro/escuro
- **Tipografia**: Fontes Geist Sans e Geist Mono
- **Layout**: Sidebar responsiva com navegação intuitiva
- **Acessibilidade**: Componentes compatíveis com screen readers

## 📚 Documentação

- **Técnica**: `/docs/README.md` - Documentação completa da API e componentes
- **PRD**: `/docs/PRD.md` - Product Requirements Document
- **Automação**: `/docs/AUTOMATION.md` - Oportunidades de automação e DX
- **Contribuição**: `AGENT.md` - Guia para contribuidores
- **Regras**: `/.cursor/rules/` - Regras de desenvolvimento organizadas

## 🔧 Configuração do Biome

O projeto usa Biome para linting e formatação com as seguintes configurações:
- Formatação: espaços, aspas simples, trailing commas
- Lint: regras recomendadas + regras customizadas
- Exclusões: `components/ui`, pastas de build, configurações

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Deploy automático via Git
git push origin main
```

### Build Manual
```bash
pnpm build
pnpm start
```

## 📈 Roadmap

### ✅ **Concluído (v0.1.0)**
- [x] Layout compartilhado entre rotas
- [x] Sistema de navegação com sidebar
- [x] Dashboard como página principal (rota root)
- [x] Páginas de Dashboard, Documentos e Relatórios
- [x] Sistema de temas (claro/escuro) sem problemas de hidratação
- [x] Topbar fixa durante scroll
- [x] Logo GMTools com branding consistente
- [x] Documentação técnica organizada
- [x] Linting e formatação automatizada com Biome
- [x] **Sistema de autenticação completo com Better Auth**
- [x] **Proteção de rotas com middleware**
- [x] **Validação de dados com Zod v4**
- [x] **Integração com Supabase + Prisma**

### 🚧 **Em Desenvolvimento (v0.2.0)**
- [ ] API integrada
- [ ] Testes automatizados com Playwright
- [ ] PWA support
- [ ] Internacionalização
- [ ] Gestão de usuários avançada
- [ ] Relatórios automatizados

---

**Versão**: 0.1.0 | **Licença**: Private | **Maintainer**: GM Tools Team
