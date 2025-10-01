// utils/calculateAllee.ts
import type { SimulationParams } from '../types';

export type DataPointWithEquation = {
  month: number;
  population: number;
  equation: string;
};

export const calculateAlleeWithEquations = (
  params: SimulationParams,
  months: number = 10
): DataPointWithEquation[] => {
  const { r, K, A, N0 } = params;
  const dt = 1; // paso de 1 mes
  const data: DataPointWithEquation[] = [];

  let N = N0;

  for (let i = 0; i <= months; i++) {
    if (i === 0) {
      // Primer valor sin ecuación
      data.push({
        month: i,
        population: N,
        equation: `N_{0} = ${N.toFixed(2)}`,
      });
    } else {
      // calcular siguiente valor con fórmula de Euler
      const dN = r * N * (1 - N / K) * (N / A - 1);
      const Nnext = N + dt * dN;

      // ecuación en LaTeX
      const eq = `N_{${i}} = ${N.toFixed(2)} + ${dt} \\cdot ${r.toFixed(
        2
      )} \\cdot ${N.toFixed(2)} \\left(1 - \\frac{${N.toFixed(
        2
      )}}{${K}}\\right) \\left(\\frac{${N.toFixed(2)}}{${A}} - 1\\right) \\approx ${Nnext.toFixed(
        2
      )}`;

      data.push({
        month: i,
        population: Nnext,
        equation: eq,
      });

      N = Nnext; // avanzar al siguiente valor
      if (N < 0.01) N = 0;
    }
  }

  return data;
};
