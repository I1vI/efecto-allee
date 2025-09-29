import type { SimulationParams, DataPoint } from '../types';

export const calculateAllee = (params: SimulationParams, months: number = 10): DataPoint[] => {
  const { r, K, A, N0 } = params;
  const dt = 0.1;
  const steps = Math.floor(months / dt);
  const data: DataPoint[] = [];

  let N = N0;

  for (let i = 0; i <= steps; i++) {
    const currentMonth = i * dt;

    if (currentMonth % 1 === 0 || i === 0) {
      data.push({ month: Math.round(currentMonth), population: Math.max(0, N) });
    }

    const dN = r * N * (1 - N / K) * (N / A - 1);
    N = N + dN * dt;

    if (N < 0.01) N = 0;
  }

  return data;
};
