import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { corePortfolioIDR, tacticalPortfolioUSD, dailyLossPercent, maxDrawdownLimit } = body;

    const existing = await prisma.portfolio.findFirst();

    if (existing) {
      const updated = await prisma.portfolio.update({
        where: { id: existing.id },
        data: {
          corePortfolioIDR: parseFloat(corePortfolioIDR),
          tacticalPortfolioUSD: parseFloat(tacticalPortfolioUSD),
          dailyLossPercent: parseFloat(dailyLossPercent),
          maxDrawdownLimit: parseFloat(maxDrawdownLimit),
        },
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.portfolio.create({
        data: {
          corePortfolioIDR: parseFloat(corePortfolioIDR),
          tacticalPortfolioUSD: parseFloat(tacticalPortfolioUSD),
          dailyLossPercent: parseFloat(dailyLossPercent),
          maxDrawdownLimit: parseFloat(maxDrawdownLimit),
        },
      });
      return NextResponse.json(created);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}