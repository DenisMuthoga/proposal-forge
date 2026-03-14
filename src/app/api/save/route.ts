import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized. Please log in to save your blueprint.' }, { status: 401 });
  }

  try {
    const { title, blueprint } = await req.json();

    if (!title || !blueprint) {
      return NextResponse.json({ error: 'Missing blueprint data' }, { status: 400 });
    }

    const savedIdea = await prisma.idea.create({
      data: {
        title: title,
        description: blueprint.analysis || '',
        demandScore: blueprint.marketDemandScore || 0,
        probability: blueprint.successProbability || 0,
        verdict: blueprint.verdict || 'Go',
        userId: session.user.id,
        competitors: blueprint.competitors,
        features: blueprint.features,
        techStack: blueprint.techStack,
        pricing: blueprint.pricing,
        landingPageCopy: blueprint.landingPageCopy,
        launchPlan: blueprint.launchPlan,
        granularScores: blueprint.granularScores,
        marketGap: blueprint.marketGap,
        swot: blueprint.swot,
        userPersona: blueprint.userPersona,
        revenueStreams: blueprint.revenueStreams,
      }
    });

    return NextResponse.json({ success: true, id: savedIdea.id });
  } catch (error) {
    console.error('Save failed:', error);
    return NextResponse.json({ error: 'Failed to save to dashboard' }, { status: 500 });
  }
}
