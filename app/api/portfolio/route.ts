import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let portfolio = await prisma.portfolio.findFirst();
    if (!portfolio) {
      portfolio = await prisma.portfolio.create({
        data: {
          corePortfolioIDR: 226000000,
          tacticalPortfolioUSD: 26000,
          usdToIdrRate: 15800,
          dailyLossPercent: 10.66,
          maxDrawdownLimit: 5.0,
        },
      });
    }
    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json(
      {
        corePortfolioIDR: 226000000,
        tacticalPortfolioUSD: 26000,
        usdToIdrRate: 15800,
        dailyLossPercent: 10.66,
        maxDrawdownLimit: 5.0,
      },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { corePortfolioIDR, tacticalPortfolioUSD, dailyLossPercent, maxDrawdownLimit } = body;

    let portfolio = await prisma.portfolio.findFirst();

    if (portfolio) {
      portfolio = await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: {
          corePortfolioIDR: Number(corePortfolioIDR),
          tacticalPortfolioUSD: Number(tacticalPortfolioUSD),
          dailyLossPercent: Number(dailyLossPercent),
          maxDrawdownLimit: Number(maxDrawdownLimit),
        },
      });
    } else {
      portfolio = await prisma.portfolio.create({
        data: {
          corePortfolioIDR: Number(corePortfolioIDR),
          tacticalPortfolioUSD: Number(tacticalPortfolioUSD),
          dailyLossPercent: Number(dailyLossPercent),
          maxDrawdownLimit: Number(maxDrawdownLimit),
        },
      });
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}