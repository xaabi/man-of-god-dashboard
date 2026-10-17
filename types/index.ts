export interface PortfolioSummary {
  totalNetWorthIdr: number;
  totalNetWorthUsd: number;
  usdToIdr: number;
  core: {
    valueIdr: number;
    dailyPnlIdr: number;
    dailyPnlPercent: number;
    targetRatio: number;
  };
  tactical: {
    valueUsd: number;
    valueIdr: number;
    dailyPnlUsd: number;
    dailyPnlPercent: number;
    targetRatio: number;
    circuitBreakerTriggered: boolean;
  };
}
