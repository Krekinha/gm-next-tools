import { Download, Edit, Eye, FileText, Plus, Search, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
          <p className="text-muted-foreground">Gestão e organização de documentos do sistema</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Documento
        </Button>
      </div>

      {/* Barra de pesquisa e filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Pesquisar Documentos</CardTitle>
          <CardDescription>
            Encontre documentos específicos usando os filtros abaixo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Pesquisar por título, conteúdo ou autor..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline">Filtrar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de documentos */}
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Documentos Recentes</CardTitle>
            <CardDescription>Lista dos documentos mais recentes e acessados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Documento 1 */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Relatório Mensal - Janeiro 2024</h3>
                    <p className="text-sm text-muted-foreground">
                      Criado por João Silva • há 2 dias
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">PDF</Badge>
                      <Badge variant="outline">Relatório</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Documento 2 */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="font-medium">Manual de Usuário v2.1</h3>
                    <p className="text-sm text-muted-foreground">
                      Criado por Maria Santos • há 1 semana
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">DOCX</Badge>
                      <Badge variant="outline">Manual</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Documento 3 */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-purple-500" />
                  <div>
                    <h3 className="font-medium">Política de Segurança</h3>
                    <p className="text-sm text-muted-foreground">
                      Criado por Carlos Oliveira • há 2 semanas
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">PDF</Badge>
                      <Badge variant="outline">Política</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Documentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Documentos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">987</div>
              <p className="text-xs text-muted-foreground">+8% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Espaço Usado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 GB</div>
              <p className="text-xs text-muted-foreground">de 10 GB disponíveis</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
