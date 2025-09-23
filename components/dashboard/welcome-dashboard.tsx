import { ArrowRight, BarChart3, Calculator, Calendar, FileText, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const featuredTools = [
  {
    title: 'Calculadora Avançada',
    description:
      'Realize cálculos complexos, conversões de unidades e operações matemáticas avançadas',
    icon: Calculator,
    color: 'bg-blue-500/10 text-blue-600',
    href: '/calculator',
  },
  {
    title: 'Gerador de Relatórios',
    description:
      'Crie relatórios automatizados com templates personalizáveis e exportação múltipla',
    icon: FileText,
    color: 'bg-green-500/10 text-green-600',
    href: '/reports',
  },
  {
    title: 'Agenda Inteligente',
    description: 'Gerencie compromissos, tarefas e lembretes com sincronização automática',
    icon: Calendar,
    color: 'bg-purple-500/10 text-purple-600',
    href: '/calendar',
  },
  {
    title: 'Analytics',
    description: 'Analise métricas de performance, gere insights e monitore indicadores chave',
    icon: BarChart3,
    color: 'bg-orange-500/10 text-orange-600',
    href: '/analytics',
  },
]

const quickStats = [
  { label: 'Ferramentas Ativas', value: '7', trend: '+2' },
  { label: 'Tarefas Automatizadas', value: '24', trend: '+8' },
  { label: 'Tempo Economizado', value: '4.2h', trend: '+1.1h' },
  { label: 'Eficiência', value: '94%', trend: '+12%' },
]

export function WelcomeDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao GM Tools</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Sua suite completa de ferramentas para automatizar e otimizar tarefas do dia a dia.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Tools */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Ferramentas em Destaque</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredTools.map((tool) => (
            <div
              key={tool.title}
              className="group rounded-lg border bg-card p-6 text-card-foreground shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tool.color}`}>
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg">{tool.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  asChild
                >
                  <a href={tool.href}>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="rounded-lg border bg-muted/50 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Começando</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                1
              </div>
              <div>
                <p className="font-medium">Explore as ferramentas</p>
                <p className="text-sm text-muted-foreground">Navegue pelo menu lateral</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                2
              </div>
              <div>
                <p className="font-medium">Configure suas preferências</p>
                <p className="text-sm text-muted-foreground">Personalize sua experiência</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                3
              </div>
              <div>
                <p className="font-medium">Automatize suas tarefas</p>
                <p className="text-sm text-muted-foreground">Economize tempo e esforço</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
