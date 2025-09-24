# App Layout

## 📋 Visão Geral

O layout raiz da aplicação (`app/layout.tsx`) define a estrutura base compartilhada entre todas as rotas, incluindo sidebar, topbar e configurações globais.

## 🎯 Funcionalidades

### Layout Compartilhado
- **Sidebar**: Navegação lateral responsiva
- **Topbar**: Barra superior com controles
- **SidebarProvider**: Gerenciamento de estado do sidebar
- **SidebarInset**: Área de conteúdo adaptável

### Configuração de Fontes
- **Geist Sans**: Fonte principal para interface
- **Geist Mono**: Fonte monospace para código
- Variáveis CSS para uso em Tailwind

### Theme Provider
- Suporte a tema claro/escuro
- Persistência de preferência do usuário
- Transições suaves entre temas

## 🏗️ Estrutura do Componente

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider
            style={
              {
                '--sidebar-width': '19rem',
              } as React.CSSProperties
            }
          >
            <AppSidebar />
            <SidebarInset>
              <AppTopbar />
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## 🎨 Design e Configuração

### Metadados
- **Título**: "GM Tools - Suite de Ferramentas"
- **Descrição**: "Suite completa de ferramentas para automatizar tarefas do dia a dia"
- **Idioma**: Português Brasileiro (pt-BR)

### Layout Responsivo
- **Sidebar Width**: 19rem (304px)
- **SidebarInset**: Área de conteúdo que se ajusta
- **Padding**: 4 unidades com pt-0 para topbar
- **Gap**: 4 unidades entre elementos

### Fontes
- **Geist Sans**: Fonte moderna e legível para interface
- **Geist Mono**: Fonte monospace para código e dados
- **Antialiasing**: Suavização de fontes habilitada

## 🔧 Tecnologias Utilizadas

- **Next.js 15**: App Router
- **React 19**: Componente funcional
- **TypeScript**: Tipagem estática
- **next-themes**: Gerenciamento de temas
- **Tailwind CSS**: Classes utilitárias
- **Shadcn UI**: Componentes de sidebar

## 🚀 Melhorias Futuras

- [ ] Configuração de PWA
- [ ] Meta tags dinâmicas
- [ ] Configuração de analytics
- [ ] Suporte a múltiplos idiomas
- [ ] Configuração de SEO
- [ ] Breadcrumbs dinâmicos
- [ ] Notificações globais

## 📝 Decisões Arquiteturais

### Layout Compartilhado
- **Benefício**: Consistência visual entre rotas
- **Performance**: Evita re-renderização desnecessária
- **Manutenibilidade**: Mudanças centralizadas

### SidebarProvider
- **Estado Global**: Gerencia abertura/fechamento do sidebar
- **Responsividade**: Adapta-se a diferentes tamanhos de tela
- **Acessibilidade**: Suporte a navegação por teclado

---

**Última Atualização**: Dezembro 2024  
**Responsável**: Equipe GM Tools