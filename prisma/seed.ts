import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.portfolio.deleteMany();
  await prisma.portfolio.create({
    data: {
      corePortfolioIDR: 226000000,
      tacticalPortfolioUSD: 26000,
      usdToIdrRate: 15800,
      dailyLossPercent: 10.66,
      maxDrawdownLimit: 5.0,
    },
  });
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());