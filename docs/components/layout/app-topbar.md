# AppTopbar

> Componente da barra superior da aplicação com controles de navegação e tema

## 📋 Visão Geral

O `AppTopbar` é o componente responsável pela barra superior da aplicação, contendo o trigger da sidebar, título da aplicação e controles de tema.

## 🎯 Características

- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Sticky**: Permanece fixo no topo durante o scroll
- **Acessível**: Suporte completo a navegação por teclado
- **Tema**: Integração com sistema de temas claro/escuro

## 🚀 Uso

```tsx
import { AppTopbar } from '@/components/layout/app-topbar'

export function Layout() {
  return (
    <div>
      <AppTopbar />
      {/* Conteúdo da aplicação */}
    </div>
  )
}
```

## 🏗️ Estrutura

### Elementos Principais

1. **SidebarTrigger**: Botão para abrir/fechar a sidebar
2. **Separator**: Separador visual vertical
3. **Título**: "GM Tools Dashboard"
4. **MainToggleTheme**: Controle de tema claro/escuro

### Layout

```
┌─────────────────────────────────────────────────────────┐
│ [☰] │ GM Tools Dashboard                    [🌙☀️] │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Estilização

### Classes CSS Principais

- `flex h-16 shrink-0 items-center justify-between gap-2 px-4`
- `sticky top-0 z-40 border-b bg-background/95 backdrop-blur`

### Responsividade

- **Desktop**: Layout completo com todos os elementos
- **Mobile**: Adaptação automática do espaçamento

## 🔧 Props

```tsx
interface AppTopbarProps {
  // Atualmente não recebe props
}
```

## 📱 Comportamento

### Interações

- **SidebarTrigger**: Alterna a visibilidade da sidebar
- **MainToggleTheme**: Alterna entre tema claro e escuro
- **Hover**: Efeitos visuais nos elementos interativos

### Estados

- **Tema Claro**: Ícone do sol ativo
- **Tema Escuro**: Ícone da lua ativo
- **Sidebar Aberta**: Trigger com estado visual diferente

## 🧪 Testes

### Cenários de Teste

1. **Renderização**: Componente renderiza sem erros
2. **Interatividade**: Botões respondem a cliques
3. **Responsividade**: Layout adapta-se a diferentes telas
4. **Acessibilidade**: Navegação por teclado funciona

## 🔗 Dependências

- `@/components/ui/sidebar` - SidebarTrigger
- `@/components/layout/main-toggle-theme` - Toggle de tema
- `@/components/ui/separator` - Separador visual

## 📝 Notas de Desenvolvimento

### Decisões de Design

- **justify-between**: Garante posicionamento correto dos elementos
- **h-16**: Altura fixa para consistência visual
- **backdrop-blur**: Efeito de desfoque para melhor legibilidade

### Melhorias Futuras

- [ ] Adicionar breadcrumbs dinâmicos
- [ ] Implementar notificações
- [ ] Adicionar busca global
- [ ] Suporte a múltiplos temas

---

**Versão**: 1.0  
**Última Atualização**: Dezembro 2024  
**Responsável**: Equipe GM Tools
