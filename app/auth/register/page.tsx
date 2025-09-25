import { RegisterForm } from '@/components/auth/register-form'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Criar conta</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Crie sua conta para começar a usar o sistema
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
