'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GalleryVerticalEnd } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  
  const { data: session } = useSession()

  // Se já está logado, redireciona
  if (session) {
    router.push(callbackUrl)
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: callbackUrl,
      })

      if (result.error) {
        setError(result.error.message || 'Erro ao fazer login')
      } else {
        router.push(callbackUrl)
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary text-primary-foreground flex aspect-square size-12 items-center justify-center rounded-lg">
            <GalleryVerticalEnd className="size-6" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">GM Tools</CardTitle>
        <CardDescription className="text-center">
          Faça login para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Para desenvolvimento, use:</p>
          <p className="font-mono text-xs mt-1">
            Email: admin@gmtools.com<br />
            Senha: admin123
          </p>
        </div>
      </CardContent>
    </Card>
  )
}