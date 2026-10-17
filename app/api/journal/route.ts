import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const entries = await prisma.journalEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mood, isCalm, followedPlan, note } = body;

    const newEntry = await prisma.journalEntry.create({
      data: {
        mood,
        isCalm,
        followedPlan,
        note,
      },
    });

    return NextResponse.json(newEntry);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 });
  }
}