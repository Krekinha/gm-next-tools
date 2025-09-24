# MainToggleTheme

> Componente para alternar entre tema claro e escuro da aplicação

## 📋 Visão Geral

O `MainToggleTheme` é um componente especializado para alternar entre os temas claro e escuro da aplicação, oferecendo uma interface intuitiva com ícones representativos.

## 🎯 Características

- **Visual**: Ícones de sol e lua para representar os temas
- **Acessível**: Labels descritivos em português
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Integrado**: Funciona com o sistema de temas do Next.js
- **Sem Hidratação**: Não usa useEffect, evitando problemas de hidratação

## 🚀 Uso

```tsx
import { MainToggleTheme } from '@/components/layout/main-toggle-theme'

export function Header() {
  return (
    <header>
      <MainToggleTheme />
    </header>
  )
}
```

## 🏗️ Estrutura

### Elementos Principais

1. **Container**: Div com borda arredondada
2. **Botão Sol**: Ativa tema claro
3. **Botão Lua**: Ativa tema escuro

### Layout

```
┌─────────────────┐
│ [☀️] [🌙] │
└─────────────────┘
```

## 🎨 Estilização

### Classes CSS Principais

- `inline-flex items-center rounded-full border p-0.5 border-gray-700`
- `size-7 rounded-full p-1.5` (ícones)

### Estados Visuais

#### Tema Claro
- **Sol**: `text-amber-400` (ativo)
- **Lua**: `text-gray-700 hover:text-gray-500` (inativo)

#### Tema Escuro
- **Sol**: `dark:text-gray-700 dark:hover:text-gray-500` (inativo)
- **Lua**: `dark:text-amber-400` (ativo)

## 🔧 Props

```tsx
interface MainToggleThemeProps {
  // Atualmente não recebe props
}
```

## 📱 Comportamento

### Interações

- **Clique no Sol**: Ativa tema claro (`setTheme('light')`)
- **Clique na Lua**: Ativa tema escuro (`setTheme('dark')`)
- **Hover**: Efeitos visuais nos botões

### Estados

- **Tema Claro**: Sol destacado, lua atenuada
- **Tema Escuro**: Lua destacada, sol atenuado
- **Transição**: Animações suaves entre estados

## 🧪 Testes

### Cenários de Teste

1. **Renderização**: Componente renderiza sem erros
2. **Alternância**: Temas alternam corretamente
3. **Persistência**: Tema mantido entre sessões
4. **Acessibilidade**: Labels funcionam com leitores de tela

## 🔗 Dependências

- `next-themes` - Gerenciamento de temas
- `lucide-react` - Ícones de sol e lua

## 📝 Notas de Desenvolvimento

### Decisões de Design

- **Dois botões**: Interface mais clara que um toggle único
- **Ícones grandes**: `size-7` para melhor usabilidade
- **Cores contrastantes**: Amber para ativo, gray para inativo

### Acessibilidade

- **aria-label**: Descrições em português
- **Botões semânticos**: Uso de `<button>` em vez de `<div>`
- **Foco**: Navegação por teclado funcional

### Melhorias Futuras

- [ ] Adicionar animações de transição
- [ ] Suporte a tema automático (sistema)
- [ ] Indicador visual do tema atual
- [ ] Atalhos de teclado

---

**Versão**: 1.0  
**Última Atualização**: Dezembro 2024  
**Responsável**: Equipe GM Tools
