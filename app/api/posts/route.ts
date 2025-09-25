import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(posts)
  } catch (_error) {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, published, authorId } = body

    if (!title || !authorId) {
      return NextResponse.json({ error: 'Título e ID do autor são obrigatórios' }, { status: 400 })
    }

    // Verificar se o autor existe
    const author = await prisma.user.findUnique({
      where: { id: authorId },
    })

    if (!author) {
      return NextResponse.json({ error: 'Autor não encontrado' }, { status: 404 })
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published ?? false,
        authorId,
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (_error) {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
