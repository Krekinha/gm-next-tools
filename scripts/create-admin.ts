import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    // Verifica se já existe um usuário admin
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@gmtools.com' }
    })

    if (existingAdmin) {
      console.log('Usuário admin já existe!')
      return
    }

    // Cria o usuário admin
    const admin = await prisma.user.create({
      data: {
        email: 'admin@gmtools.com',
        name: 'Administrador',
        // Em produção, use hash de senha
        // password: await hash('admin123', 12),
      }
    })

    console.log('Usuário admin criado com sucesso:', admin)
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()