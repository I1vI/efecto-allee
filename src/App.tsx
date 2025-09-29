import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

// Tipos
interface SimulationParams {
  r: number;
  K: number;
  A: number;
  N0: number;
}

interface DataPoint {
  month: number;
  population: number;
}

// Cálculos con método de Euler
const calculateAllee = (params: SimulationParams, months: number = 10): DataPoint[] => {
  const { r, K, A, N0 } = params;
  const dt = 0.1;
  const steps = Math.floor(months / dt);
  const data: DataPoint[] = [];
  
  let N = N0;
  
  for (let i = 0; i <= steps; i++) {
    const currentMonth = i * dt;
    
    if (currentMonth % 1 === 0 || i === 0) {
      data.push({
        month: Math.round(currentMonth),
        population: Math.max(0, N)
      });
    }
    
    const dN = r * N * (1 - N / K) * (N / A - 1);
    N = N + dN * dt;
    
    if (N < 0.01) N = 0;
  }
  
  return data;
};

// Determinar caso
const determineCase = (N0: number, A: number, K: number) => {
  if (N0 < A) {
    return {
      case: 'Caso A',
      description: '0 < N < A: La población colapsa hacia la extinción',
      color: 'red'
    };
  } else if (N0 >= A && N0 < K) {
    return {
      case: 'Caso B',
      description: 'A < N < K: La población crece hacia la capacidad de carga',
      color: 'green'
    };
  } else {
    return {
      case: 'Caso C',
      description: 'N > K: La población decrece hacia la capacidad de carga',
      color: 'yellow'
    };
  }
};

// Componente 1: Control de Parámetros
const ParameterControl = ({ params, setParams }: any) => {
  return (
    <div className="bg-gradient-to-br from-blue-400 to-cyan-400 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Modelo Logístico Extendido (Allee)</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
          <label className="text-white font-semibold block mb-2">r (Tasa de crecimiento)</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={params.r}
            onChange={(e) => setParams({ ...params, r: parseFloat(e.target.value) })}
            className="w-full"
          />
          <span className="text-white font-bold text-lg">{params.r.toFixed(2)}</span>
          <p className="text-white text-xs mt-1">Límite de crecimiento</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
          <label className="text-white font-semibold block mb-2">K (Capacidad de carga)</label>
          <input
            type="range"
            min="50"
            max="200"
            step="1"
            value={params.K}
            onChange={(e) => setParams({ ...params, K: parseFloat(e.target.value) })}
            className="w-full"
          />
          <span className="text-white font-bold text-lg">{params.K}</span>
          <p className="text-white text-xs mt-1">Umbral máximo</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
          <label className="text-white font-semibold block mb-2">A (Umbral de Allee)</label>
          <input
            type="range"
            min="5"
            max="50"
            step="1"
            value={params.A}
            onChange={(e) => setParams({ ...params, A: parseFloat(e.target.value) })}
            className="w-full"
          />
          <span className="text-white font-bold text-lg">{params.A}</span>
        </div>

        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
          <label className="text-white font-semibold block mb-2">N₀ (Población inicial)</label>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={params.N0}
            onChange={(e) => setParams({ ...params, N0: parseFloat(e.target.value) })}
            className="w-full"
          />
          <span className="text-white font-bold text-lg">{params.N0}</span>
        </div>
      </div>
    </div>
  );
};

// Componente 2: Gráfica
const GrowthChart = ({ data, params }: any) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Evolución de la Población</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            label={{ value: 'Meses', position: 'insideBottom', offset: -5 }} 
          />
          <YAxis 
            label={{ value: 'Población (N)', angle: -90, position: 'insideLeft' }} 
          />
          <Tooltip />
          <Legend />
          <ReferenceLine y={params.A} stroke="#ef4444" strokeDasharray="5 5" label="A (Umbral)" />
          <ReferenceLine y={params.K} stroke="#10b981" strokeDasharray="5 5" label="K (Capacidad)" />
          <Line type="monotone" dataKey="population" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Componente 3: Tabla de Datos
const DataTable = ({ data }: any) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Tabla de Valores</h3>
      <div className="overflow-y-auto max-h-96">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-blue-500 text-white">
            <tr>
              <th className="border p-3 text-center">Mes</th>
              <th className="border p-3 text-center">Población (N)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((point: DataPoint, idx: number) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border p-3 text-center font-semibold">{point.month}</td>
                <td className="border p-3 text-center">{point.population.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente 4: Análisis de Casos
const CasesAnalysis = ({ params }: any) => {
  const caseInfo = determineCase(params.N0, params.A, params.K);

  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Análisis de Casos Posibles</h3>
      
      <div className="space-y-4">
        <div className={`flex items-start space-x-3 p-4 rounded-lg ${params.N0 < params.A ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-100'}`}>
          <AlertCircle className={params.N0 < params.A ? 'text-red-500' : 'text-gray-400'} size={24} />
          <div>
            <p className="font-bold text-gray-800">Caso A: 0 &lt; N &lt; A</p>
            <p className="text-sm text-gray-600">Colapsa hacia la extinción</p>
          </div>
        </div>

        <div className={`flex items-start space-x-3 p-4 rounded-lg ${params.N0 >= params.A && params.N0 < params.K ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'}`}>
          <TrendingUp className={params.N0 >= params.A && params.N0 < params.K ? 'text-green-500' : 'text-gray-400'} size={24} />
          <div>
            <p className="font-bold text-gray-800">Caso B: A &lt; N &lt; K</p>
            <p className="text-sm text-gray-600">Crece hacia la capacidad de carga</p>
          </div>
        </div>

        <div className={`flex items-start space-x-3 p-4 rounded-lg ${params.N0 > params.K ? 'bg-yellow-100 border-2 border-yellow-500' : 'bg-gray-100'}`}>
          <TrendingDown className={params.N0 > params.K ? 'text-yellow-500' : 'text-gray-400'} size={24} />
          <div>
            <p className="font-bold text-gray-800">Caso C: N &gt; K</p>
            <p className="text-sm text-gray-600">Baja hacia la capacidad de carga</p>
          </div>
        </div>

        <div className={`mt-6 p-4 rounded-lg border-2 ${caseInfo.color === 'red' ? 'border-red-500' : caseInfo.color === 'green' ? 'border-green-500' : 'border-yellow-500'}`}>
          <p className="font-bold text-lg text-gray-800">Escenario Actual:</p>
          <p className={`text-lg font-bold ${caseInfo.color === 'red' ? 'text-red-600' : caseInfo.color === 'green' ? 'text-green-600' : 'text-yellow-600'}`}>{caseInfo.case}</p>
          <p className="text-gray-700 mt-1">{caseInfo.description}</p>
        </div>
      </div>
    </div>
  );
};

// Componente 5: Animación de Abejas
const BeeAnimation = ({ initialPop, finalPop }: any) => {
  const [bees, setBees] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useState(() => {
    const numBees = Math.min(Math.max(Math.floor(finalPop / 10), 1), 15);
    const newBees = Array.from({ length: numBees }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      delay: Math.random() * 2
    }));
    setBees(newBees);
  });

  const isExtinct = finalPop < 1;

  return (
    <div className="bg-gradient-to-b from-sky-200 to-green-200 p-6 rounded-lg shadow-lg relative overflow-hidden h-96">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Evolución de la Colonia</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 font-semibold">Mes 0</p>
          <p className="text-3xl font-bold text-blue-600">{initialPop}</p>
          <p className="text-xs text-gray-500">abejas</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 font-semibold">Mes 10</p>
          <p className={`text-3xl font-bold ${isExtinct ? 'text-red-600' : 'text-green-600'}`}>
            {finalPop.toFixed(0)}
          </p>
          <p className="text-xs text-gray-500">{isExtinct ? '¡EXTINCIÓN!' : 'abejas'}</p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <svg width="80" height="80" viewBox="0 0 100 100">
          <path d="M50 10 L80 30 L80 70 L50 90 L20 70 L20 30 Z" fill="#FFA500" stroke="#FF8C00" strokeWidth="3"/>
          <path d="M35 35 L50 25 L65 35 L65 50 L50 60 L35 50 Z" fill="#FFD700"/>
          <path d="M35 55 L50 45 L65 55 L65 70 L50 80 L35 70 Z" fill="#FFD700"/>
          <circle cx="50" cy="35" r="2" fill="#8B4513"/>
        </svg>
      </div>

      {!isExtinct && bees.map(bee => (
        <div
          key={bee.id}
          className="absolute animate-float"
          style={{
            left: `${bee.x}%`,
            top: `${bee.y}%`,
            animationDelay: `${bee.delay}s`
          }}
        >
          <svg width="30" height="30" viewBox="0 0 50 50">
            <ellipse cx="25" cy="25" rx="10" ry="15" fill="#FFD700" stroke="#000" strokeWidth="1"/>
            <rect x="20" y="20" width="10" height="3" fill="#000"/>
            <rect x="20" y="27" width="10" height="3" fill="#000"/>
            <ellipse cx="15" cy="20" rx="8" ry="3" fill="#87CEEB" opacity="0.6"/>
            <ellipse cx="35" cy="20" rx="8" ry="3" fill="#87CEEB" opacity="0.6"/>
          </svg>
        </div>
      ))}

      {isExtinct && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <p className="text-4xl font-bold text-red-600 bg-white/90 px-6 py-3 rounded-lg shadow-xl">
            ⚠️ EXTINCIÓN
          </p>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -15px) rotate(5deg); }
          50% { transform: translate(-5px, -10px) rotate(-5deg); }
          75% { transform: translate(15px, -5px) rotate(3deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Componente Principal
function App() {
  const [params, setParams] = useState<SimulationParams>({
    r: 0.5,
    K: 100,
    A: 20,
    N0: 30
  });

  const data = calculateAllee(params, 10);
  const finalPopulation = data[data.length - 1].population;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ParameterControl params={params} setParams={setParams} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GrowthChart data={data} params={params} />
          <DataTable data={data} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CasesAnalysis params={params} />
          <BeeAnimation initialPop={params.N0} finalPop={finalPopulation} />
        </div>
      </div>
    </div>
  );
}

export default App;