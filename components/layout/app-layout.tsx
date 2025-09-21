"use client"

import { ReactNode } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Home,
  Settings,
  FileText,
  Calculator,
  Calendar,
  Database,
  Users,
  BarChart3,
} from "lucide-react"

interface AppLayoutProps {
  children: ReactNode
}

// Menu items de exemplo para ferramentas de trabalho
const menuItems = [
  {
    title: "Ferramentas Principais",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
        description: "Visão geral das ferramentas"
      },
      {
        title: "Calculadora Avançada",
        url: "/calculator",
        icon: Calculator,
        description: "Cálculos complexos e conversões"
      },
      {
        title: "Gerador de Relatórios",
        url: "/reports",
        icon: FileText,
        description: "Criação automática de relatórios"
      },
      {
        title: "Agenda Inteligente",
        url: "/calendar",
        icon: Calendar,
        description: "Gestão de compromissos e tarefas"
      }
    ]
  },
  {
    title: "Dados e Análises",
    items: [
      {
        title: "Base de Dados",
        url: "/database",
        icon: Database,
        description: "Consulta e gestão de dados"
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart3,
        description: "Análise de performance e métricas"
      },
      {
        title: "Gestão de Equipe",
        url: "/team",
        icon: Users,
        description: "Controle de colaboradores"
      }
    ]
  }
]

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <Sidebar variant="sidebar" className="border-r">
          <SidebarHeader className="border-b px-6 h-16 flex items-center py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Settings className="h-4 w-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">GM Tools</span>
                <span className="truncate text-xs text-muted-foreground">
                  Suite de Ferramentas
                </span>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-2">
            {menuItems.map((group) => (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          tooltip={item.description}
                          className="w-full justify-start"
                        >
                          <a href={item.url} className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <div className="grid flex-1 text-left text-sm leading-tight">
                              <span className="truncate font-medium">
                                {item.title}
                              </span>
                              <span className="truncate text-xs text-muted-foreground">
                                {item.description}
                              </span>
                            </div>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          
          <SidebarFooter className="border-t px-6 py-4">
            <div className="text-xs text-muted-foreground">
              GM Tools v1.0 • 2025
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* TopBar */}
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-[3.95rem] items-center gap-4 px-6">
              <SidebarTrigger className="-ml-1" />
              <div className="flex-1">
                <h1 className="font-semibold text-lg">GM Tools Dashboard</h1>
              </div>
              {/* Espaço reservado para futuros controles do TopBar */}
              <div className="flex items-center gap-2">
                {/* Aqui podem ser adicionados botões, notificações, perfil, etc. */}
              </div>
            </div>
          </header>

          {/* Main content with rounded view */}
          <main className="flex-1 p-6">
            <div className="mx-auto max-w-7xl">
              <div className="rounded-xl border bg-card text-card-foreground shadow-sm min-h-[600px] p-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
