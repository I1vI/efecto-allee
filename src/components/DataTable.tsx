import type { DataPoint } from '../types';

const DataTable: React.FC<{ data: DataPoint[] }> = ({ data }) => (
  <div className="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col">
    <h3 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-blue-400 pb-1">
      📋 Tabla de Valores
    </h3>
    
    {/* Contenedor con scroll propio */}
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
              className={`
                ${i % 2 ? 'bg-white' : 'bg-blue-50'} 
                hover:bg-blue-100 transition-colors duration-150
              `}
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
    
    <div className="mt-2 text-xs text-gray-500 text-center">
      Total: {data.length} meses
    </div>
  </div>
);

export default DataTable;