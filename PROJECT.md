# GM Tools - Documentação do Projeto

## Visão Geral

**GM Tools** é uma aplicação web moderna construída com Next.js 15 e React 19, projetada para fornecer ferramentas utilitárias para desenvolvimento e produtividade. O projeto segue as melhores práticas de desenvolvimento web moderno com foco em performance, acessibilidade e experiência do usuário.

## Propósito

Desenvolver uma suite de ferramentas que auxilie desenvolvedores e usuários em tarefas cotidianas, com interface moderna e intuitiva, priorizando performance e usabilidade.

## Stack Tecnológico

### Core Technologies
- **Next.js**: `15.5.3` - Framework React com App Router
- **React**: `19.1.0` - Biblioteca de interface do usuário
- **TypeScript**: `^5` - Superset tipado do JavaScript
- **Tailwind CSS**: `^4` - Framework de CSS utilitário

### Ferramentas de Desenvolvimento
- **pnpm**: `10.15.1` - Gerenciador de pacotes
- **Turbopack**: Bundler de alta performance (via Next.js)
- **PostCSS**: `^4` - Processador de CSS

### Configurações
- **Node.js**: Versão 20+ (conforme @types/node)
- **Package Manager**: pnpm (configurado via packageManager)

## Arquitetura do Projeto

### Estrutura de Diretórios

```
gm-tools/
├── app/                    # App Router (Next.js 15)
│   ├── layout.tsx         # Layout principal da aplicação
│   ├── page.tsx           # Página inicial
│   ├── globals.css        # Estilos globais
│   └── favicon.ico        # Ícone da aplicação
├── docs/                  # Documentação do projeto
│   ├── ex-instructions/   # Instruções e exemplos
│   └── ia-suggestions/    # Sugestões de IA e seções
├── public/                # Assets estáticos
│   ├── *.svg             # Ícones SVG
│   └── ...
├── .cursor/              # Configurações do Cursor IDE
│   └── rules/            # Regras de desenvolvimento
├── package.json          # Dependências e scripts
├── tsconfig.json         # Configuração TypeScript
├── next.config.ts        # Configuração Next.js
├── postcss.config.mjs    # Configuração PostCSS
└── PROJECT.md           # Este arquivo
```

### Padrões de Arquitetura

- **App Router**: Utilização do novo App Router do Next.js 15
- **Server Components**: Preferência por React Server Components (RSC)
- **TypeScript First**: Todo código em TypeScript com tipagem estrita
- **Component-Based**: Arquitetura baseada em componentes reutilizáveis

## Funcionalidades Principais

### Implementadas
- ✅ Estrutura base com Next.js 15 e React 19
- ✅ Configuração completa de TypeScript
- ✅ Tailwind CSS 4 configurado
- ✅ Layout responsivo básico

### Em Desenvolvimento
- 🔄 Ferramentas utilitárias (a serem definidas)
- 🔄 Interface de usuário moderna
- 🔄 Sistema de componentes

### Planejadas
- 📋 Suite de ferramentas de desenvolvimento
- 📋 Dashboard interativo
- 📋 Integração com APIs externas
- 📋 Sistema de autenticação (se necessário)

## Scripts de Desenvolvimento

```bash
# Desenvolvimento com Turbopack
pnpm dev

# Build de produção com Turbopack
pnpm build

# Iniciar servidor de produção
pnpm start

# Instalar dependências
pnpm install
```

## Configurações de Ambiente

### Variáveis de Ambiente
```env
# Adicionar variáveis conforme necessário
NODE_ENV=development|production
```

### Configurações Importantes
- **Turbopack**: Habilitado para dev e build para performance máxima
- **App Router**: Configurado como padrão
- **TypeScript**: Modo estrito habilitado
- **Tailwind CSS**: Versão 4 com PostCSS

## Dependências Críticas

### Produção
- `next@15.5.3`: Framework principal, fornece SSR, SSG, App Router
- `react@19.1.0`: Biblioteca de UI, Server Components
- `react-dom@19.1.0`: Renderização DOM para React

### Desenvolvimento
- `typescript@^5`: Tipagem estática e IntelliSense
- `tailwindcss@^4`: Sistema de design e estilos
- `@types/*`: Definições de tipo para Node.js e React

## Decisões Técnicas

### App Router vs Pages Router
- **Escolha**: App Router
- **Motivo**: Melhor performance, Server Components nativos, futuro do Next.js
- **Trade-off**: Curva de aprendizado, algumas bibliotecas ainda em adaptação

### Tailwind CSS v4
- **Escolha**: Tailwind CSS 4
- **Motivo**: Performance aprimorada, melhor DX, CSS nativo
- **Trade-off**: Versão mais recente, possíveis breaking changes

### pnpm como Package Manager
- **Escolha**: pnpm
- **Motivo**: Performance superior, economia de espaço, workspaces nativos
- **Trade-off**: Menor adoção comparado ao npm/yarn

### Turbopack
- **Escolha**: Turbopack habilitado
- **Motivo**: Builds e reloads extremamente rápidos
- **Trade-off**: Tecnologia mais nova, possível instabilidade

## Convenções de Desenvolvimento

### Código
- Todos os arquivos em TypeScript
- Componentes com named exports
- Comentários em português para lógica complexa
- Early returns para melhor legibilidade

### Estrutura
- Componentes específicos de rota em `app/`
- Componentes reutilizáveis em `components/` (quando criado)
- Utilitários em `lib/` (quando criado)
- Assets estáticos em `public/`

### Estilo
- Tailwind CSS para todos os estilos
- Design system consistente
- Mobile-first approach
- Acessibilidade (A11y) como prioridade

## Fluxos de Usuário

### Atual
1. **Acesso inicial**: Usuário acessa página principal
2. **Navegação**: Interface básica disponível
3. **Interação**: Preparado para ferramentas futuras

### Planejado
1. **Dashboard**: Visão geral das ferramentas disponíveis
2. **Seleção**: Escolha da ferramenta desejada
3. **Utilização**: Interface específica para cada ferramenta
4. **Resultado**: Output/download/visualização do resultado

## Próximos Passos

1. **Definir ferramentas**: Especificar quais utilitários implementar
2. **Design System**: Criar componentes base reutilizáveis
3. **Primeira ferramenta**: Implementar funcionalidade inicial
4. **Testes**: Configurar ambiente de testes
5. **Deploy**: Configurar pipeline de CI/CD

## Manutenção

- **Atualizar**: Este documento sempre que houver mudanças significativas
- **Versioning**: Seguir semantic versioning
- **Dependencies**: Revisar e atualizar dependências mensalmente
- **Performance**: Monitorar Web Vitals e otimizar continuamente

---

**Última atualização**: Janeiro 2025  
**Versão do documento**: 1.0  
**Mantido por**: Equipe de desenvolvimento GM Tools
