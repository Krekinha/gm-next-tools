# useIsMobile Hook

Hook customizado para detectar dispositivos móveis baseado no breakpoint de largura da tela.

## 📋 Visão Geral

O `useIsMobile` é um hook que detecta se o usuário está em um dispositivo móvel baseado na largura da tela. Usa MediaQuery API para monitoramento em tempo real e otimização de performance.

## 🎯 Funcionalidades

- **Detecção de Mobile**: Identifica dispositivos móveis baseado em breakpoint
- **Monitoramento em Tempo Real**: Atualiza quando a tela é redimensionada
- **Performance Otimizada**: Usa MediaQuery API nativa
- **Breakpoint Configurável**: Breakpoint padrão de 768px
- **Estados de Loading**: Retorna undefined durante hidratação

## 📦 Importação

```tsx
import { useIsMobile } from '@/hooks/use-mobile'
```

## 🚀 Uso

### Uso Básico
```tsx
import { useIsMobile } from '@/hooks/use-mobile'

export function ResponsiveComponent() {
  const isMobile = useIsMobile()

  if (isMobile === undefined) {
    return <div>Carregando...</div>
  }

  return (
    <div>
      {isMobile ? (
        <div>Layout Mobile</div>
      ) : (
        <div>Layout Desktop</div>
      )}
    </div>
  )
}
```

### Com Layout Condicional
```tsx
import { useIsMobile } from '@/hooks/use-mobile'

export function Navigation() {
  const isMobile = useIsMobile()

  return (
    <nav>
      {isMobile ? (
        <MobileMenu />
      ) : (
        <DesktopMenu />
      )}
    </nav>
  )
}
```

### Com Classes CSS Condicionais
```tsx
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

export function Card({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()

  return (
    <div className={cn(
      'p-4 rounded-lg',
      isMobile ? 'w-full' : 'w-1/2'
    )}>
      {children}
    </div>
  )
}
```

## 🏗️ Implementação Interna

### Código Fonte
```tsx
import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}
```

### Explicação da Implementação

1. **Estado Inicial**: `undefined` para evitar problemas de hidratação
2. **MediaQuery**: Usa `window.matchMedia` para monitoramento eficiente
3. **Event Listener**: Escuta mudanças no tamanho da tela
4. **Cleanup**: Remove listener no cleanup do useEffect
5. **Boolean Conversion**: `!!isMobile` converte para boolean

## 🔧 Configuração

### Breakpoint Padrão
```tsx
const MOBILE_BREAKPOINT = 768 // pixels
```

### Customização do Breakpoint
```tsx
// Para usar breakpoint diferente, modifique o hook
const MOBILE_BREAKPOINT = 1024 // tablets como mobile

// Ou crie um hook customizado
export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)')
    const onChange = () => {
      setIsTablet(window.innerWidth < 1024)
    }
    mql.addEventListener('change', onChange)
    setIsTablet(window.innerWidth < 1024)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isTablet
}
```

## 📱 Breakpoints e Responsividade

### Breakpoint Atual
- **Mobile**: < 768px
- **Desktop**: ≥ 768px

### Alinhamento com Tailwind
```css
/* Tailwind CSS breakpoints */
sm: 640px
md: 768px  ← Breakpoint do hook
lg: 1024px
xl: 1280px
```

### Uso com Tailwind
```tsx
import { useIsMobile } from '@/hooks/use-mobile'

export function ResponsiveGrid() {
  const isMobile = useIsMobile()

  return (
    <div className={cn(
      'grid gap-4',
      isMobile ? 'grid-cols-1' : 'grid-cols-3'
    )}>
      {/* Conteúdo */}
    </div>
  )
}
```

## 🔄 Estados e Comportamento

### Estados Possíveis
- **undefined**: Durante hidratação (SSR)
- **true**: Dispositivo móvel (< 768px)
- **false**: Dispositivo desktop (≥ 768px)

### Ciclo de Vida
1. **Inicialização**: `undefined` → `true/false`
2. **Resize**: Atualização automática
3. **Cleanup**: Remoção de listeners

## 📝 Notas de Implementação

### Hidratação Segura
```tsx
// Estado inicial undefined evita problemas de SSR
const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

// Verificação antes de usar
if (isMobile === undefined) {
  return <div>Carregando...</div>
}
```

### Performance
- **MediaQuery API**: Mais eficiente que resize listeners
- **Event Delegation**: Um listener por hook
- **Cleanup Automático**: Remove listeners no unmount

### Acessibilidade
- **Sem Dependência de JS**: Funciona mesmo com JS desabilitado
- **Fallbacks**: CSS responsivo como fallback

## 🚀 Exemplos de Uso Avançados

### Hook Composto
```tsx
import { useIsMobile } from '@/hooks/use-mobile'

export function useResponsiveLayout() {
  const isMobile = useIsMobile()

  return {
    isMobile,
    isDesktop: isMobile === false,
    isLoading: isMobile === undefined,
    columns: isMobile ? 1 : 3,
    spacing: isMobile ? 'compact' : 'comfortable',
  }
}
```

### Componente de Layout
```tsx
import { useIsMobile } from '@/hooks/use-mobile'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()

  if (isMobile === undefined) {
    return <div className="flex items-center justify-center h-screen">
      <div>Carregando...</div>
    </div>
  }

  return (
    <div className={cn(
      'min-h-screen',
      isMobile ? 'flex flex-col' : 'grid grid-cols-[250px_1fr]'
    )}>
      {isMobile ? (
        <>
          <MobileHeader />
          <main className="flex-1 p-4">{children}</main>
        </>
      ) : (
        <>
          <Sidebar />
          <main className="p-6">{children}</main>
        </>
      )}
    </div>
  )
}
```

### Hook para Sidebar
```tsx
import { useIsMobile } from '@/hooks/use-mobile'

export function useSidebar() {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  return {
    isOpen: isMobile ? isOpen : true, // Desktop sempre aberto
    toggle,
    close,
    variant: isMobile ? 'overlay' : 'inset',
  }
}
```

### Componente de Menu
```tsx
import { useIsMobile } from '@/hooks/use-mobile'

export function NavigationMenu() {
  const isMobile = useIsMobile()

  if (isMobile === undefined) {
    return <div className="h-12 bg-muted animate-pulse" />
  }

  return (
    <nav className={cn(
      'flex items-center',
      isMobile ? 'justify-between px-4' : 'space-x-6'
    )}>
      <Logo />
      {isMobile ? (
        <MobileMenuButton />
      ) : (
        <DesktopMenuItems />
      )}
    </nav>
  )
}
```

## 🔮 Melhorias Futuras

- [ ] **Breakpoints Múltiplos**: Hook para diferentes tamanhos
- [ ] **Orientação**: Detecção de portrait/landscape
- [ ] **Touch Support**: Detecção de dispositivos touch
- [ ] **Performance**: Debounce para resize events
- [ ] **SSR**: Melhor suporte a server-side rendering

## 🧪 Testes

### Cenários de Teste
1. **Desktop**: Retorna false para telas ≥ 768px
2. **Mobile**: Retorna true para telas < 768px
3. **Resize**: Atualiza quando tela é redimensionada
4. **Hidratação**: Retorna undefined inicialmente
5. **Cleanup**: Remove listeners no unmount

### Testes com Jest
```tsx
import { renderHook } from '@testing-library/react'
import { useIsMobile } from '@/hooks/use-mobile'

describe('useIsMobile', () => {
  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  it('should return false for desktop', () => {
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('should return true for mobile', () => {
    Object.defineProperty(window, 'innerWidth', { value: 600 })
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })
})
```

---

**Última Atualização**: Dezembro 2024  
**Versão**: 1.0  
**Dependências**: React Hooks, MediaQuery API
