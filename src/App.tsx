import { useState } from 'react';
import ParameterControl from './components/ParameterControl';
import GrowthChart from './components/GrowthChart';
import DataTable from './components/DataTable';
import CasesAnalysis from './components/CasesAnalysis';
import BeeAnimation from './components/BeeAnimation';
import type { SimulationParams } from './types';
import { calculateAllee } from './utils/calculateAllee';

// importa tu logo UMSA desde src/images
import umsaLogo from './images/umsa.png';

function App() {
  const [params, setParams] = useState<SimulationParams>({
    r: 0.5,
    K: 100,
    A: 20,
    N0: 30,
  });

  const data = calculateAllee(params, 10);
  const finalPopulation = data[data.length - 1].population;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50">
      <div className="p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          
          {/* HEADER - TÍTULO */}
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-8 border-blue-500">
            <div className="flex items-center justify-between">
              {/* Parte izquierda: título */}
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-3 shadow-md">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 50 50"
                    className="text-white"
                  >
                    <path
                      d="M25 5 L45 15 L45 35 L25 45 L5 35 L5 15 Z"
                      fill="currentColor"
                      opacity="0.9"
                    />
                    <circle
                      cx="25"
                      cy="25"
                      r="8"
                      fill="white"
                      opacity="0.3"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                    Modelo Logístico Extendido
                  </h1>
                  <p className="text-base md:text-lg font-semibold text-blue-600">
                    (Allee)
                  </p>
                </div>
              </div>

              {/* Parte derecha: logo UMSA + texto */}
              <div className="flex items-center gap-2">
                <img
                  src={umsaLogo}
                  alt="UMSA Logo"
                  className="w-12 h-12 object-contain"
                />
                <span className="text-lg md:text-xl font-bold text-gray-700">
                  UMSA
                </span>
              </div>
            </div>
          </div>

          {/* FILA SUPERIOR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-3 h-[380px] md:h-[400px]">
              <ParameterControl params={params} setParams={setParams} />
            </div>
            <div className="lg:col-span-6 h-[380px] md:h-[400px]">
              <GrowthChart data={data} params={params} />
            </div>
            <div className="lg:col-span-3 h-[380px] md:h-[400px]">
              <DataTable data={data} />
            </div>
          </div>

          {/* FILA INFERIOR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4">
              <CasesAnalysis params={params} />
            </div>
            <div className="lg:col-span-8 h-[320px] md:h-[360px]">
              <BeeAnimation
                initialPop={params.N0}
                finalPop={finalPopulation}
                params={params}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
