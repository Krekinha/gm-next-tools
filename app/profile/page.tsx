import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { authServer } from '@/lib/auth/utils'
import { redirect } from 'next/navigation'

/**
 * Componente de perfil do usuário
 */
async function UserProfile() {
  const { user, error } = await authServer.getCurrentUser()

  if (error || !user) {
    redirect('/auth/login')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil do Usuário</CardTitle>
        <CardDescription>
          Informações da sua conta
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nome Completo</label>
          <p className="text-sm text-muted-foreground">
            {user.full_name || 'Não informado'}
          </p>
        </div>
        
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
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Membro desde</label>
          <p className="text-sm text-muted-foreground">
            {new Date(user.created_at).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Loading skeleton para o perfil
 */
function ProfileSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

/**
 * Página de perfil do usuário
 */
export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie suas informações pessoais
        </p>
      </div>
      
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile />
      </Suspense>
    </div>
  )
}
