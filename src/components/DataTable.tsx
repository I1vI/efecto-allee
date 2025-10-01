// DataTable.tsx
import React, { useState } from 'react';
import type { DataPointWithEquation } from '../utils/calculateAllee';
import ModalLatex from './ModalLatex';

interface DataTableProps {
  data: DataPointWithEquation[];
  r: number;
  K: number;
  A: number;
  dt: number;
}

const DataTable: React.FC<DataTableProps> = ({ data, r, K, A, dt }) => {
  const [showModal, setShowModal] = useState(false);

  // Genera ecuaciones en LaTeX basadas en data y en los parámetros (usa el valor anterior y el actual)
  const equations: string[] = data.slice(1).map((p, idx) => {
    const prev = data[idx].population;
    // Construyo la cadena en LaTeX. Usa \\cdot para multiplicación y \\dfrac para fracciones.
    // Ejemplo resultante: N_{1} = 30.00 + 1 \cdot 0.5 \cdot 30.00 \left(1 - \dfrac{30.00}{100}\right)\left(\dfrac{30.00}{20} - 1\right) \approx 35.25
    const lhs = `N_{${p.month}}`;
    const rhs =
      `${prev.toFixed(2)} + ${dt} \\cdot ${r} \\cdot ${prev.toFixed(2)} ` +
      `\\left(1 - \\dfrac{${prev.toFixed(2)}}{${K}}\\right)` +
      `\\left(\\dfrac{${prev.toFixed(2)}}{${A}} - 1\\right)`;
    const approx = `\\approx\\ ${p.population.toFixed(2)}`;
    return `${lhs} = ${rhs} \\quad ${approx}`;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col">
      <h3 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-blue-400 pb-1">
        📋 Tabla de Valores
      </h3>

      <div className="flex-1 overflow-auto rounded-lg border border-gray-200 min-h-0">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-500 to-cyan-500 sticky top-0 z-10">
            <tr className="text-white text-sm">
              <th className="text-center py-2.5 px-3 font-bold">Mes</th>
              <th className="text-center py-2.5 px-3 font-bold">Población (N)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {data.map((p, i) => (
              <tr
                key={i}
                className={`${i % 2 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100 transition-colors duration-150`}
              >
                <td className="py-2 px-3 text-center font-semibold text-gray-700">
                  {p.month}
                </td>
                <td className="py-2 px-3 text-center text-gray-800">
                  {p.population.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mt-2 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        🔍 Mostrar Ecuaciones
      </button>

      <div className="mt-2 text-xs text-gray-500 text-center">
        Total: {data.length} meses
      </div>

      <ModalLatex
        show={showModal}
        onClose={() => setShowModal(false)}
        equations={equations}
        title="📐 Ecuaciones de la Simulación"
      />
    </div>
  );
};

export default DataTable;
