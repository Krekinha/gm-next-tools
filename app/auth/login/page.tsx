import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Bem-vindo de volta</h1>
          <p className="mt-2 text-sm text-muted-foreground">Entre na sua conta para continuar</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
