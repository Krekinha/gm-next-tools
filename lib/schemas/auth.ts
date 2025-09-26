import { z } from 'zod'

/**
 * Schema para validação de dados de login
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ter um formato válido'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres'),
})

/**
 * Schema para validação de dados de registro
 */
export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ter um formato válido'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'
    ),
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
})

/**
 * Schema para validação de dados de perfil do usuário
 */
export const profileSchema = z.object({
  full_name: z
    .string()
    .min(1, 'Nome completo é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  avatar_url: z
    .string()
    .url('URL do avatar deve ser válida')
    .optional()
    .or(z.literal('')),
})

/**
 * Schema para validação de alteração de senha
 */
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Senha atual é obrigatória'),
  newPassword: z
    .string()
    .min(6, 'Nova senha deve ter pelo menos 6 caracteres')
    .max(100, 'Nova senha deve ter no máximo 100 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Nova senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'
    ),
  confirmNewPassword: z
    .string()
    .min(1, 'Confirmação da nova senha é obrigatória'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Novas senhas não coincidem',
  path: ['confirmNewPassword'],
})

// Tipos inferidos dos schemas
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

/**
 * Tipos para dados do usuário autenticado
 */
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

/**
 * Tipos para resposta de autenticação
 */
export interface AuthResponse {
  user: User | null
  error: string | null
}
