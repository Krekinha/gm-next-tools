'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { loginSchema, type LoginFormData } from '@/lib/schemas/auth'
import { useAuthActions } from '@/hooks/use-auth'

/**
 * Componente interno do formulário de login
 */
function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, loading, error } = useAuthActions()
  
  const [showPassword, setShowPassword] = useState(false)
  
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn(data.email, data.password)
    
    if (result.success) {
      toast.success('Login realizado com sucesso!')
      router.push(redirectTo)
    } else {
      toast.error(result.error || 'Erro ao fazer login')
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          Entrar
        </CardTitle>
        <CardDescription className="text-center">
          Digite suas credenciais para acessar sua conta
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo de email */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register('email')}
              disabled={loading}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo de senha */}
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Senha
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Sua senha"
                {...register('password')}
                disabled={loading}
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Erro geral */}
          {error && (
            <div className="rounded-md bg-destructive/15 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Botão de submit */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>

        {/* Links adicionais */}
        <div className="mt-6 space-y-4">
          <div className="text-center">
            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => router.push('/auth/forgot-password')}
              disabled={loading}
            >
              Esqueceu sua senha?
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Button
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={() => router.push('/auth/register')}
              disabled={loading}
            >
              Criar conta
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Página de login
 * 
 * Funcionalidades:
 * - Formulário de login com validação Zod
 * - Estados de loading e erro
 * - Redirecionamento após login bem-sucedido
 * - Feedback visual com toasts
 * - Design responsivo e acessível
 */
export default function LoginPage() {
  return (
    <Suspense fallback={
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Entrar
          </CardTitle>
          <CardDescription className="text-center">
            Carregando...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-10 bg-muted animate-pulse rounded" />
            <div className="h-10 bg-muted animate-pulse rounded" />
            <div className="h-10 bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    }>
      <LoginForm />
    </Suspense>
  )
}
