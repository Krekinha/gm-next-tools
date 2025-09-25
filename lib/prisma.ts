import { PrismaClient } from '@prisma/client'

// Singleton pattern para evitar múltiplas instâncias do Prisma Client
// durante o desenvolvimento com hot reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
