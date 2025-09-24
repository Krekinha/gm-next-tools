import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '@prisma/client'

// Initialize Prisma client
const prisma = new PrismaClient()

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Para desenvolvimento, pode ser true em produção
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24, // 1 dia
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
        required: false,
      },
    },
  },
  plugins: [],
  trustedOrigins: [
    process.env.AUTH_BASE_URL || 'http://localhost:3000',
  ],
  secret: process.env.AUTH_SECRET!,
  baseURL: process.env.AUTH_BASE_URL || 'http://localhost:3000',
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user