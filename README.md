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
- **Linting/Formatting**: Biome 2.2
- **Package Manager**: pnpm

### Estrutura do Projeto
```
gm-tools/
├── app/                    # App Router (Next.js 15)
│   ├── layout.tsx         # Layout raiz com fontes Geist
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes Shadcn (ignorados pelo Biome)
│   ├── layout/           # Componentes de layout
│   └── dashboard/        # Componentes específicos do dashboard
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e helpers
├── docs/                 # Documentação técnica
└── public/              # Assets estáticos
```

### Decisões Arquiteturais

1. **App Router**: Escolhido para aproveitar Server Components e melhor performance
2. **Biome**: Substituiu ESLint/Prettier para lint e formatação mais rápida
3. **Shadcn UI**: Componentes customizáveis baseados em Radix UI
4. **TypeScript**: Tipagem estática para melhor DX e manutenibilidade
5. **Turbopack**: Bundler mais rápido para desenvolvimento

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

## 🛠️ Ferramentas Integradas

A aplicação oferece uma interface unificada para várias ferramentas:

- **Dashboard**: Visão geral e acesso rápido
- **Calculadora Avançada**: Cálculos complexos e conversões
- **Gerador de Relatórios**: Criação automática de documentos
- **Agenda Inteligente**: Gestão de compromissos e tarefas
- **Base de Dados**: Consulta e gestão de informações
- **Analytics**: Análise de performance e métricas
- **Gestão de Equipe**: Controle de colaboradores

## 🎨 Design System

- **UI Components**: Baseado em Shadcn UI com Radix primitives
- **Tema**: Sistema de cores consistente com modo claro/escuro
- **Tipografia**: Fontes Geist Sans e Geist Mono
- **Layout**: Sidebar responsiva com navegação intuitiva
- **Acessibilidade**: Componentes compatíveis com screen readers

## 📚 Documentação

- **Técnica**: `/docs/README.md` - Documentação completa da API
- **PRD**: `/docs/PRD.md` - Product Requirements Document
- **Contribuição**: `AGENT.md` - Guia para contribuidores

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

- [ ] Implementação das ferramentas principais
- [ ] Sistema de autenticação
- [ ] API integrada
- [ ] Testes automatizados
- [ ] PWA support
- [ ] Internacionalização

---

**Versão**: 0.1.0 | **Licença**: Private | **Maintainer**: GM Tools Team
