# useIsMobile

> Hook para detectar dispositivos móveis baseado na largura da viewport

## 📋 Visão Geral

O `useIsMobile` é um hook customizado que detecta se a largura da viewport está abaixo do breakpoint mobile (768px), útil para implementar comportamentos responsivos específicos.

## 🎯 Características

- **Responsivo**: Detecta mudanças de tamanho de tela em tempo real
- **Performance**: Usa `matchMedia` para eficiência
- **SSR Safe**: Funciona corretamente com renderização no servidor
- **TypeScript**: Tipagem completa para melhor DX

## 🚀 Uso

```tsx
'use client'

import { useIsMobile } from '@/hooks/use-mobile'

export function ResponsiveComponent() {
  const isMobile = useIsMobile()
  
  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  )
}
```

## 🔧 API

### Hook

```tsx
function useIsMobile(): boolean
```

### Retorno

- **`boolean`**: `true` se a tela for menor que 768px, `false` caso contrário

## 🏗️ Implementação

### Breakpoint

```tsx
const MOBILE_BREAKPOINT = 768
```

### Lógica

1. **Estado inicial**: `undefined` para evitar hidration mismatch
2. **Effect**: Configura listener de `matchMedia`
3. **Cleanup**: Remove listener ao desmontar
4. **Retorno**: `!!isMobile` para garantir boolean

## 📱 Comportamento

### Estados

- **Inicial**: `false` (até o primeiro effect)
- **Mobile**: `true` (largura < 768px)
- **Desktop**: `false` (largura >= 768px)

### Responsividade

- **Listener**: Atualiza automaticamente em mudanças de viewport
- **Performance**: Usa `matchMedia` em vez de `resize` events
- **Memory**: Cleanup automático do listener

## 🧪 Testes

### Cenários de Teste

1. **Renderização**: Hook retorna boolean válido
2. **Responsividade**: Muda corretamente com resize
3. **SSR**: Não quebra durante hidration
4. **Cleanup**: Remove listeners corretamente

### Exemplo de Teste

```tsx
import { renderHook } from '@testing-library/react'
import { useIsMobile } from '@/hooks/use-mobile'

test('detects mobile correctly', () => {
  // Mock window.innerWidth
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 500,
  })
  
  const { result } = renderHook(() => useIsMobile())
  expect(result.current).toBe(true)
})
```

## 🔗 Dependências

- `react` - useState, useEffect
- `window.matchMedia` - API nativa do browser

## 📝 Notas de Desenvolvimento

### Decisões Técnicas

- **Breakpoint 768px**: Padrão comum para mobile/desktop
- **matchMedia**: Mais eficiente que resize events
- **SSR Safe**: Estado inicial `undefined` evita mismatch

### Casos de Uso

- **Layouts condicionais**: Mobile vs Desktop
- **Componentes responsivos**: Mostrar/ocultar elementos
- **Navegação**: Sidebar vs Bottom navigation
- **Interações**: Touch vs Mouse events

### Melhorias Futuras

- [ ] Suporte a breakpoints customizados
- [ ] Hook para tablet (768px - 1024px)
- [ ] Detecção de orientação
- [ ] Cache de resultados

---

**Versão**: 1.0  
**Última Atualização**: Dezembro 2024  
**Responsável**: Equipe GM Tools
