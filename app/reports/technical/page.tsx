import {
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function TechnicalReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatório Técnico</h1>
          <p className="text-muted-foreground">
            Relatórios técnicos detalhados e análises de performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Agendar Relatório
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Resumo executivo */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Executivo</CardTitle>
          <CardDescription>
            Visão geral dos principais indicadores técnicos do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Sistema Operacional</span>
              </div>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">Uptime</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Performance</span>
              </div>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">Score médio</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Usuários Ativos</span>
              </div>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">Sessões simultâneas</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Tempo de Resposta</span>
              </div>
              <div className="text-2xl font-bold">245ms</div>
              <p className="text-xs text-muted-foreground">Média global</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas de performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance por Região</CardTitle>
            <CardDescription>Tempo de resposta médio por região geográfica</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>América do Norte</span>
                  <span>180ms</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Europa</span>
                  <span>220ms</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>América do Sul</span>
                  <span>280ms</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ásia</span>
                  <span>320ms</span>
                </div>
                <Progress value={55} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status dos Serviços</CardTitle>
            <CardDescription>Monitoramento em tempo real dos serviços críticos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">API Principal</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Online
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Banco de Dados</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Online
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Cache Redis</span>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Instável
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Serviço de Email</span>
                </div>
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  Offline
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e incidentes */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas e Incidentes Recentes</CardTitle>
          <CardDescription>Histórico de problemas técnicos e suas resoluções</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 border rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Alta latência no banco de dados</h4>
                  <Badge variant="outline">Resolvido</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Detectado aumento de 300% na latência de consultas às 14:30
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Resolvido às 15:45 • Duração: 1h 15min
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border rounded-lg">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Falha no serviço de autenticação</h4>
                  <Badge variant="outline">Resolvido</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Usuários não conseguiam fazer login devido a problema no JWT
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Resolvido às 09:20 • Duração: 45min
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Atualização de segurança aplicada</h4>
                  <Badge variant="secondary">Concluído</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Patch de segurança aplicado com sucesso em todos os servidores
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Concluído às 02:00 • Duração: 30min
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendações Técnicas</CardTitle>
          <CardDescription>
            Sugestões para melhorar a performance e estabilidade do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Otimização do Cache Redis</h4>
                <p className="text-sm text-muted-foreground">
                  Implementar estratégia de cache mais eficiente para reduzir latência
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Backup Automatizado</h4>
                <p className="text-sm text-muted-foreground">
                  Configurar backups incrementais para melhorar a recuperação de dados
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Monitoramento Avançado</h4>
                <p className="text-sm text-muted-foreground">
                  Implementar alertas proativos para detectar problemas antes que afetem usuários
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
