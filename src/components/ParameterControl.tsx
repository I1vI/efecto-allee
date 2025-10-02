import React, { useState } from 'react';
import type { SimulationParams } from '../types';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from './Math';
import ModalLatex from './ModalLatex';



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
}> = ({ params, setParams }) => {
  const [showModal, setShowModal] = useState(false);

  const modalContent = (
    <>
      {/* TEORÍA: Malthus, Verhulst (Logístico), Allee y método de Euler */}
      <section className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-cyan-500">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full p-2 shadow">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 13h2v-2H3v2zm4 0h14v-2H7v2zM3 17h2v-2H3v2zm4 0h14v-2H7v2zM3 9h2V7H3v2zm4 0h14V7H7v2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Fundamentos teóricos</h2>
        </div>

        {/* Malthus */}
        <h3 className="text-xl font-semibold text-gray-900 mt-2">Modelo de Malthus</h3>
        <p className="text-gray-700 leading-relaxed">
          El crecimiento malthusiano asume una tasa per cápita constante y ausencia de limitaciones ambientales.
          Se modela por la ecuación diferencial:
        </p>
        <BlockMath math={"\\frac{dN}{dt} = rN" }/>
        <p className="text-gray-700 leading-relaxed">
          cuya solución es exponencial <InlineMath math="N(t)=N_0 e^{rt}" />.
          Si <InlineMath math="r>0" /> la población crece sin límite; si <InlineMath math="r<0" /> decrece hacia la extinción.
        </p>

        {/* Verhulst / Logístico */}
        <h3 className="text-xl font-semibold text-gray-900 mt-4">Modelo de Verhulst (Logístico)</h3>
        <p className="text-gray-700 leading-relaxed">
          Para incorporar la limitación de recursos, Verhulst propuso la dinámica logística:
        </p>
        <BlockMath math={"\\frac{dN}{dt} = rN\\left(1 - \\frac{N}{K}\\right)" }/>
        <p className="text-gray-700 leading-relaxed">
          donde <InlineMath math="K" /> es la capacidad de carga.
          El crecimiento es casi exponencial cuando <InlineMath math={"N \\ll K" } />, se desacelera por competencia y converge a <InlineMath math="K" />.
        </p>

        {/* Allee */}
        <h3 className="text-xl font-semibold text-gray-900 mt-4">Efecto Allee (Modelo Logístico Extendido)</h3>
        <p className="text-gray-700 leading-relaxed">
          En muchas poblaciones, densidades bajas reducen la supervivencia o reproducción. Este <em>efecto Allee</em> se incorpora extendiendo el término logístico:
        </p>
        <BlockMath math={"\\frac{dN}{dt} = rN\\left(1 - \\frac{N}{K}\\right)\\left(\\frac{N}{A} - 1\\right)" }/>
        <p className="text-gray-700 leading-relaxed">
          con umbral <InlineMath math="A" />. Los equilibrios son <InlineMath math={"N^*=0,\\; N^*=A,\\; N^*=K" }/>.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li><span className="font-semibold">Bajas densidades (<InlineMath math="0&lt;N&lt;A" />):</span> la población tiende a 0.</li>
          <li><span className="font-semibold">Umbral (<InlineMath math="N=A" />):</span> equilibrio inestable que separa extinción y persistencia.</li>
          <li><span className="font-semibold">Intermedio (<InlineMath math="A&lt;N&lt;K" />):</span> la población crece hasta <InlineMath math="K" />.</li>
          <li><span className="font-semibold">Sobrepoblación (<InlineMath math="N&gt;K" />):</span> decrece hasta <InlineMath math="K" />.</li>
        </ul>

        {/* Método de Euler */}
        <h3 className="text-xl font-semibold text-gray-900 mt-4">Por qué usamos el método de Euler</h3>
        <p className="text-gray-700 leading-relaxed">
          Para visualizar trayectorias numéricas usamos el esquema de Euler explícito, que aproxima:
        </p>
        <BlockMath math={"N_{t+\\Delta t} \\approx N_t + \\Delta t \\, f(N_t)"} />
        <p className="text-gray-700 leading-relaxed">
          donde <InlineMath math={"f(N)=rN\\left(1-\\frac{N}{K}\\right)\\left(\\frac{N}{A}-1\\right)" }/>.
          Elegimos Euler porque es <span className="font-semibold">simple, eficiente y didáctico</span>: permite conectar directamente el campo de tasas con cambios poblacionales paso a paso.
        </p>
        <p className="text-gray-700 leading-relaxed">
          La precisión depende de <InlineMath math={"\\Delta t"} />: pasos pequeños reducen el error local <InlineMath math={"\\mathcal{O}(\\Delta t^2)" }/> y el global <InlineMath math={"\\mathcal{O}(\\Delta t)" }/>.
        </p>
      </section>
    </>
  );

  return (
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

      <button
        onClick={() => setShowModal(true)}
        className="mt-2 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Explicación 🤯
      </button>

      {/* Modal: pasamos el contenido como children */}
      <ModalLatex
        show={showModal}
        onClose={() => setShowModal(false)}
        title="📐 Ecuaciones de la Simulación"
      >
        {modalContent}
      </ModalLatex>
    </div>
  );
};

export default ParameterControl;
