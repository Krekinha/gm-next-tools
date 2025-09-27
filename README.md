# GM Tools - Suite de Ferramentas

> Suite completa de ferramentas para automatizar tarefas do dia a dia

## 🚀 Visão Geral

GM Tools é uma aplicação web moderna construída com Next.js 15 e React 19, projetada para fornecer uma suite integrada de ferramentas de produtividade. A aplicação utiliza o App Router do Next.js, Server Components e componentes modernos para uma experiência de usuário fluida e responsiva.

### 🎯 Objetivo Principal
Centralizar ferramentas de produtividade em uma única interface moderna, reduzindo o context switching e melhorando a eficiência do trabalho diário.

### 🏆 Diferenciais
- **Arquitetura Moderna**: Next.js 15 com App Router e React 19
- **Performance Otimizada**: Server Components e Turbopack
- **Segurança Robusta**: Autenticação Supabase com middleware de proteção
- **UX Consistente**: Design system unificado com Shadcn UI
- **Desenvolvimento Ágil**: Biome para linting/formatting e automação completa

## 🏗️ Arquitetura

### Stack Tecnológica
- **Framework**: Next.js 15 com App Router e Turbopack
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + Shadcn UI
- **Componentes**: Radix UI primitives
- **Ícones**: Lucide React
- **Autenticação**: Supabase Auth + PostgreSQL
- **Validação**: Zod v4
- **Notificações**: Sonner
- **Linting/Formatting**: Biome 2.2
- **Package Manager**: pnpm

### Estrutura do Projeto
```
gm-tools/
├── app/                    # App Router (Next.js 15)
│   ├── layout.tsx         # Layout raiz compartilhado (sidebar + topbar)
│   ├── page.tsx           # Dashboard principal (rota root /)
│   ├── auth/              # Páginas de autenticação
│   │   ├── layout.tsx     # Layout específico para auth (sem sidebar)
│   │   ├── login/         # Página de login (/auth/login)
│   │   ├── register/      # Página de registro (/auth/register)
│   │   └── forgot-password/ # Recuperação de senha
│   ├── dashboard/         # Dashboard detalhado (/dashboard)
│   ├── documents/         # Gestão de documentos (/documents)
│   ├── reports/           # Relatórios técnicos (/reports/technical)
│   ├── profile/           # Perfil do usuário (/profile)
│   ├── settings/          # Configurações (/settings)
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes Shadcn (ignorados pelo Biome)
│   ├── layout/           # Componentes de layout (sidebar, topbar, user-menu)
│   └── dashboard/        # Componentes específicos do dashboard
├── hooks/                # Custom hooks (use-auth, use-mobile)
├── lib/                  # Utilitários e helpers
│   ├── auth/             # Utilitários de autenticação
│   ├── schemas/          # Schemas de validação Zod
│   └── supabase/         # Clientes Supabase (client, server, middleware)
├── providers/            # Context providers (theme)
├── middleware.ts         # Middleware de autenticação
├── docs/                 # Documentação técnica
├── .cursor/              # Regras de desenvolvimento organizadas
└── public/              # Assets estáticos
```

### Decisões Arquiteturais

#### 🏗️ Arquitetura de Aplicação
1. **App Router**: Escolhido para aproveitar Server Components e melhor performance
2. **Layout Compartilhado**: Sidebar e topbar compartilhados entre todas as rotas via layout root
3. **Layout de Auth**: Layout específico para páginas de autenticação sem sidebar/topbar
4. **Server-First**: Preferência por Server Components para melhor SEO e performance

#### 🔐 Segurança e Autenticação
5. **Supabase Auth**: Sistema de autenticação nativo com PostgreSQL
6. **Middleware de Proteção**: Proteção automática de rotas com redirecionamentos
7. **Sessões Persistentes**: Gerenciamento de estado de autenticação no servidor
8. **Validação Zod**: Schemas centralizados para validação de dados

#### 🛠️ Ferramentas de Desenvolvimento
9. **Biome**: Substituiu ESLint/Prettier para lint e formatação mais rápida
10. **Turbopack**: Bundler mais rápido para desenvolvimento
11. **TypeScript**: Tipagem estática para melhor DX e manutenibilidade
12. **Regras Organizadas**: Sistema de regras modular em `.cursor/rules/` para facilitar manutenção

#### 🎨 Interface e UX
13. **Shadcn UI**: Componentes customizáveis baseados em Radix UI
14. **Tema Unificado**: Sistema de cores consistente com modo claro/escuro
15. **Responsividade**: Mobile-first com breakpoints bem definidos
16. **Acessibilidade**: Componentes compatíveis com WCAG 2.1 AA

### 🌍 Ambientes

#### Desenvolvimento Local
- **URL**: `http://localhost:3000`
- **Hot Reload**: Turbopack com recarga instantânea
- **Debug**: Chrome DevTools integrado
- **Linting**: Biome em tempo real

#### Staging (Planejado)
- **URL**: `https://gm-tools-staging.vercel.app`
- **Deploy**: Automático via GitHub Actions
- **Dados**: Supabase staging environment
- **Testes**: Playwright automatizados

#### Produção (Planejado)
- **URL**: `https://gm-tools.vercel.app`
- **Deploy**: Manual via Vercel CLI
- **Dados**: Supabase production environment
- **Monitoramento**: Vercel Analytics + Sentry
- **CDN**: Global edge network

## 📦 Scripts e Automação

### 🚀 Scripts de Desenvolvimento
```bash
# Desenvolvimento
pnpm dev          # Inicia servidor de desenvolvimento com Turbopack
pnpm build        # Build de produção com Turbopack
pnpm start        # Inicia servidor de produção

# Code Quality (Automatizado)
pnpm lint         # Executa lint com Biome
pnpm format       # Formata código com Biome
pnpm check        # Verifica e formata código
pnpm fix          # Corrige problemas automaticamente
```

### 🔧 Automação Implementada
- **Linting Automático**: Biome configurado para manter consistência de código
- **Formatação Automática**: Padrões de código aplicados automaticamente
- **Hot Reload**: Turbopack com recarga instantânea durante desenvolvimento
- **Type Checking**: TypeScript em modo strict para detecção precoce de erros
- **Exclusões Inteligentes**: `components/ui` excluído do linting (gerados pelo shadcn)

### 📈 Oportunidades de Automação (Planejadas)
- **Pre-commit Hooks**: Validação automática antes de commits
- **CI/CD Pipeline**: GitHub Actions para testes e deploy
- **Geração de Componentes**: Scripts para criar componentes padronizados
- **Deploy Automatizado**: Deploy automático em push para main
- **Monitoramento**: Alertas automáticos para problemas de performance

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

### 🔐 Sistema de Autenticação
- **Login/Registro**: Páginas de autenticação com validação Zod
- **Proteção de Rotas**: Middleware automático para rotas protegidas
- **Sessões Persistentes**: Gerenciamento de sessão com Supabase
- **Layout de Auth**: Interface específica para autenticação
- **Menu do Usuário**: Dropdown com perfil, configurações e logout
- **Redirecionamentos**: Automáticos baseados no status de autenticação

### 📊 Interface Principal
- **Dashboard Principal**: Página root (/) com métricas e atividades recentes
- **Dashboard Detalhado**: Página /dashboard com análise aprofundada
- **Gestão de Documentos**: Interface para upload, organização e busca de documentos
- **Relatórios Técnicos**: Análise de performance e monitoramento do sistema
- **Perfil do Usuário**: Página de gerenciamento de perfil
- **Configurações**: Página de configurações da aplicação

### 🎨 Design e UX
- **Layout Responsivo**: Sidebar colapsível e navegação intuitiva
- **Topbar Fixa**: Barra superior que permanece fixa durante o scroll
- **Tema Claro/Escuro**: Alternância de tema com persistência (sem problemas de hidratação)
- **Navegação Centralizada**: Sistema de rotas com layout compartilhado
- **Logo GMTools**: Branding consistente com link para página principal
- **Notificações**: Sistema de toasts com Sonner
- **Estados de Loading**: Feedback visual durante operações

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

### ✅ Concluído (v0.1.0)
- [x] Layout compartilhado entre rotas
- [x] Sistema de navegação com sidebar
- [x] Dashboard como página principal (rota root)
- [x] Páginas de Dashboard, Documentos e Relatórios
- [x] Sistema de temas (claro/escuro) sem problemas de hidratação
- [x] Topbar fixa durante scroll
- [x] Logo GMTools com branding consistente
- [x] Documentação técnica organizada
- [x] Linting e formatação automatizada com Biome
- [x] **Sistema de autenticação completo**
- [x] **Proteção de rotas com middleware**
- [x] **Páginas de login, registro e recuperação de senha**
- [x] **Menu do usuário e gerenciamento de sessão**

### 🚧 Em Desenvolvimento (v0.2.0)
- [ ] API integrada com Supabase
- [ ] Testes automatizados com Playwright
- [ ] Sistema de permissões e roles
- [ ] Gestão de perfil do usuário
- [ ] Configurações avançadas

### 📋 Planejado (v0.3.0+)
- [ ] PWA support
- [ ] Internacionalização
- [ ] Analytics e métricas
- [ ] Integração com ferramentas externas
- [ ] Sistema de notificações push

---

**Versão**: 0.1.0 | **Licença**: Private | **Maintainer**: GM Tools Team
