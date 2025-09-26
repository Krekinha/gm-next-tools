'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Settings, LogOut, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useUserProfile } from '@/hooks/use-auth'
import { useAuthActions } from '@/hooks/use-auth'

/**
 * Componente de menu do usuário
 * 
 * Funcionalidades:
 * - Avatar do usuário com fallback para iniciais
 * - Dropdown menu com opções de perfil
 * - Logout funcional
 * - Estados de loading
 * - Feedback visual com toasts
 */
export function UserMenu() {
  const router = useRouter()
  const { profile, loading: profileLoading } = useUserProfile()
  const { signOut, loading: signOutLoading } = useAuthActions()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    const result = await signOut()
    
    if (result.success) {
      toast.success('Logout realizado com sucesso!')
      router.push('/auth/login')
    } else {
      toast.error(result.error || 'Erro ao fazer logout')
    }
  }

  const handleProfileClick = () => {
    router.push('/profile')
    setIsOpen(false)
  }

  const handleSettingsClick = () => {
    router.push('/settings')
    setIsOpen(false)
  }

  // Se ainda está carregando o perfil, mostrar skeleton
  if (profileLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
        <div className="h-4 w-20 bg-muted animate-pulse rounded" />
      </div>
    )
  }

  // Se não há perfil, não mostrar o menu
  if (!profile) {
    return null
  }

  // Gerar iniciais do nome ou email
  const getInitials = () => {
    if (profile.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return profile.email.slice(0, 2).toUpperCase()
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={profile.avatar_url || undefined} 
              alt={profile.full_name || profile.email}
            />
            <AvatarFallback className="text-xs">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile.full_name || 'Usuário'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {profile.email}
            </p>
            {profile.role === 'admin' && (
              <p className="text-xs leading-none text-primary font-medium">
                Administrador
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleProfileClick}>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleSettingsClick}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          disabled={signOutLoading}
          className="text-destructive focus:text-destructive"
        >
          {signOutLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
