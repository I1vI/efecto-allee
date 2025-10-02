import { useState } from 'react';
import ParameterControl from './components/ParameterControl';
import GrowthChart from './components/GrowthChart';
import DataTable from './components/DataTable';
import CasesAnalysis from './components/CasesAnalysis';
import BeeAnimation from './components/BeeAnimation';
import type { SimulationParams } from './types';
import { calculateAlleeWithEquations } from './utils/calculateAllee';
import type { DataPointWithEquation } from './utils/calculateAllee';
import 'katex/dist/katex.min.css';
import umsaLogo from './images/umsa.png';

function App() {
  const [params, setParams] = useState<SimulationParams>({
    r: 0.5,
    K: 100,
    A: 20,
    N0: 30,
  });

  const data: DataPointWithEquation[] = calculateAlleeWithEquations(params, 10);
  const finalPopulation = data[data.length - 1].population;

  // Autores ordenados alfabéticamente por apellido
  const autores = [
    'Aliaga Yujra Edwin',
    'Jurado Ever Emerson',
    'Lobo Rodriguez Fabian Andres',
    'Ticona Laura Yoel',
    'Troche Colque Alan Franco'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50">
      <div className="p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          
          {/* HEADER - TÍTULO */}
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-8 border-blue-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              {/* IZQUIERDA: Logo + Título */}
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-2 sm:p-3 shadow-md flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 50 50" className="text-white sm:w-[32px] sm:h-[32px]">
                    <path d="M25 5 L45 15 L45 35 L25 45 L5 35 L5 15 Z" fill="currentColor" opacity="0.9"/>
                    <circle cx="25" cy="25" r="8" fill="white" opacity="0.3"/>
                  </svg>
                </div>

                <div className="flex flex-col">
                  <h1 className="text-xl sm:text-3xl font-bold text-gray-800 leading-tight">
                    Modelo Logístico Extendido
                  </h1>
                  <p className="text-sm sm:text-lg font-semibold text-blue-600">(Allee)</p>
                </div>
              </div>

              {/* DERECHA: Botones + Logo UMSA */}
              <div className="flex items-center gap-2 sm:gap-3 justify-between sm:justify-end w-full sm:w-auto flex-wrap">

                {/* YouTube */}
                <a
                  href="https://youtu.be/lXLxsZmGmCQ"
                  target="_blank" rel="noopener noreferrer"
                  className="group relative px-3 py-2 sm:px-4 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold sm:font-bold shadow-md hover:shadow-xl hover:scale-105 transition-all"
                >
                  <span className="relative flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="text-sm sm:text-base">YouTube</span>
                  </span>
                </a>

                {/* TikTok */}
                <a
                  href="https://vm.tiktok.com/ZMAmD5uuP/"
                  target="_blank" rel="noopener noreferrer"
                  className="group relative px-3 py-2 sm:px-4 rounded-lg bg-gradient-to-r from-gray-800 to-black text-white font-semibold sm:font-bold shadow-md hover:shadow-xl hover:scale-105 transition-all"
                >
                  <span className="relative flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    <span className="text-sm sm:text-base">TikTok</span>
                  </span>
                </a>

                {/* Descargar App */}
                <a
                  href="/app-debug.apk" download
                  className="group relative px-3 py-2 sm:px-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold sm:font-bold shadow-md hover:shadow-xl hover:scale-105 transition-all"
                >
                  <span className="relative flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86-1.07-6.5-4.53-6.5-8.5V8.75L12 5.5l6.5 3.25V11.5c0 3.97-2.64 7.43-6.5 8.5z"/>
                      <path d="M10.5 14.5L8 12l-1.5 1.5L10.5 17l7-7-1.5-1.5z"/>
                    </svg>
                    <span className="text-sm sm:text-base">Descargar App</span>
                  </span>
                </a>

                {/* Logo UMSA */}
                <img
                  src={umsaLogo}
                  alt="UMSA Logo"
                  className="w-10 h-10 sm:w-14 sm:h-14 object-contain drop-shadow-md ml-auto sm:ml-0"
                />
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
              <DataTable
                data={data}
                r={params.r}
                K={params.K}
                A={params.A}
                dt={1}
              />
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

          {/* SECCIÓN DE AUTORES */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-2 shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Autores</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {autores.map((autor, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-300 to-transparent"></div>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    {autor}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;