import type { SimulationParams } from '../types';

const Stat: React.FC<{
  label: string;
  value: React.ReactNode;
  children: React.ReactNode;
}> = ({ label, value, children }) => (
  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-2 rounded-lg shadow-sm border border-blue-100">
    {/* Fila: Label y Valor */}
    <div className="flex items-center justify-between mb-1">
      <label className="text-gray-700 font-semibold text-xs">{label}</label>
      <span className="text-blue-600 font-bold text-sm min-w-[2.5rem] text-right">
        {value}
      </span>
    </div>
    {/* Barra deslizante */}
    <div className="w-full">{children}</div>
  </div>
);

const ParameterControl: React.FC<{
  params: SimulationParams;
  setParams: (p: SimulationParams) => void;
}> = ({ params, setParams }) => (
  <div className="bg-white rounded-xl shadow-lg p-4">
    <h2 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-blue-400 pb-1">
      📊 Parámetros
    </h2>
    
    <div className="flex flex-col gap-2">
      <Stat label="r (Tasa de crecimiento)" value={params.r.toFixed(2)}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={params.r}
          onChange={(e) =>
            setParams({ ...params, r: parseFloat(e.target.value) })
          }
          className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </Stat>

      <Stat label="K (Capacidad de carga)" value={params.K}>
        <input
          type="range"
          min="50"
          max="200"
          step="1"
          value={params.K}
          onChange={(e) =>
            setParams({ ...params, K: parseFloat(e.target.value) })
          }
          className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </Stat>

      <Stat label="A (Umbral de Allee)" value={params.A}>
        <input
          type="range"
          min="5"
          max="50"
          step="1"
          value={params.A}
          onChange={(e) =>
            setParams({ ...params, A: parseFloat(e.target.value) })
          }
          className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </Stat>

      <Stat label="N₀ (Población inicial)" value={params.N0}>
        <input
          type="range"
          min="1"
          max="100"
          step="1"
          value={params.N0}
          onChange={(e) =>
            setParams({ ...params, N0: parseFloat(e.target.value) })
          }
          className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </Stat>
    </div>
  </div>
);

export default ParameterControl;