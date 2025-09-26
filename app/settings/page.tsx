import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { authServer } from '@/lib/auth/utils'
import { redirect } from 'next/navigation'

/**
 * Componente de configurações do usuário
 */
async function UserSettings() {
  const { user, error } = await authServer.getCurrentUser()

  if (error || !user) {
    redirect('/auth/login')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações da Conta</CardTitle>
          <CardDescription>
            Gerencie as configurações da sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Função</label>
            <p className="text-sm text-muted-foreground">
              {user.role === 'admin' ? 'Administrador' : 'Usuário'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferências</CardTitle>
          <CardDescription>
            Personalize sua experiência
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tema</label>
            <p className="text-sm text-muted-foreground">
              Use o botão de tema na barra superior para alternar entre claro e escuro
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Loading skeleton para as configurações
 */
function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-64" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Página de configurações do usuário
 */
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>
      
      <Suspense fallback={<SettingsSkeleton />}>
        <UserSettings />
      </Suspense>
    </div>
  )
}
