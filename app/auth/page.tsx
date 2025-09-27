'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { z } from 'zod'
import { useAuthActions } from '@/hooks/use-auth'

// Schema para validação do email de reset
const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ter um formato válido'),
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

/**
 * Página de recuperação de senha
 * 
 * Funcionalidades:
 * - Formulário para solicitar reset de senha
 * - Validação de email
 * - Estados de loading e erro
 * - Feedback visual com toasts
 * - Redirecionamento após envio
 */
export default function ForgotPasswordPage() {
  const router = useRouter()
  const { resetPassword, loading, error } = useAuthActions()
  
  const [emailSent, setEmailSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    const result = await resetPassword(data.email)
    
    if (result.success) {
      toast.success('Email de recuperação enviado! Verifique sua caixa de entrada.')
      setEmailSent(true)
    } else {
      toast.error(result.error || 'Erro ao enviar email de recuperação')
    }
  }

  if (emailSent) {
    return (
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Email Enviado
          </CardTitle>
          <CardDescription className="text-center">
            Verifique sua caixa de entrada
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Enviamos um link de recuperação para seu email.
            </p>
            <p className="text-sm text-muted-foreground">
              Clique no link para redefinir sua senha.
            </p>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/auth/login')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Login
            </Button>
            
            <Button
              variant="link"
              className="w-full"
              onClick={() => setEmailSent(false)}
            >
              Tentar outro email
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          Recuperar Senha
        </CardTitle>
        <CardDescription className="text-center">
          Digite seu email para receber um link de recuperação
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
                Enviando...
              </>
            ) : (
              'Enviar Link de Recuperação'
            )}
          </Button>
        </form>

        {/* Links adicionais */}
        <div className="mt-6 space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push('/auth/login')}
            disabled={loading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Login
          </Button>
          
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
