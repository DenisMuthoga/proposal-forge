import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();

  // For public sharing, we might skip this, but for now let's require auth to view your own ideas
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const idea = await prisma.idea.findUnique({
      where: { 
        id: id,
        userId: session.user.id // ensure user owns the idea
      },
    });

    if (!idea) {
      return NextResponse.json({ error: 'Blueprint not found' }, { status: 404 });
    }

    return NextResponse.json(idea);
  } catch (error) {
    console.error('Fetch idea failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
