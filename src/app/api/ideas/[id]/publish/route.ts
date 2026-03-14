import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { isPublic } = await req.json();

    const idea = await prisma.idea.findUnique({
      where: { id },
    });

    if (!idea) {
      return NextResponse.json({ error: 'Blueprint not found' }, { status: 404 });
    }

    if (idea.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updatedIdea = await prisma.idea.update({
      where: { id },
      data: { isPublic },
    });

    return NextResponse.json(updatedIdea);
  } catch (error) {
    console.error('Publish toggle failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
