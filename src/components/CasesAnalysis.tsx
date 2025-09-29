import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import type { SimulationParams } from '../types';

const CaseCard: React.FC<{ 
  active: boolean; 
  icon: React.ReactNode; 
  title: string; 
  subtitle: string; 
  color: 'red'|'green'|'yellow'; 
}> = ({ active, icon, title, subtitle, color }) => {
  const activeStyles = active
    ? color === 'red' 
      ? 'border-2 border-red-500 bg-red-100 shadow-md transform scale-105' 
      : color === 'green' 
      ? 'border-2 border-green-500 bg-green-100 shadow-md transform scale-105'
      : 'border-2 border-yellow-500 bg-yellow-100 shadow-md transform scale-105'
    : 'bg-gray-100 border-2 border-transparent';
  
  const iconColor = active
    ? color === 'red' ? 'text-red-500' : color === 'green' ? 'text-green-500' : 'text-yellow-500'
    : 'text-gray-400';
  
  return (
    <div className={`p-3 rounded-lg transition-all duration-300 ${activeStyles}`}>
      <div className="flex items-start gap-3">
        <div className={iconColor}>{icon}</div>
        <div className="flex-1">
          <p className="font-bold text-gray-800 text-sm">{title}</p>
          <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

const CasesAnalysis: React.FC<{ params: SimulationParams }> = ({ params }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-blue-400 pb-1">
        🔍 Análisis de Casos
      </h3>
      
      {/* Casos uno sobre otro */}
      <div className="flex flex-col gap-2">
        <CaseCard
          active={params.N0 < params.A}
          icon={<AlertCircle size={20} />}
          title="Caso A: 0 < N < A"
          subtitle="Colapsa hacia la extinción"
          color="red"
        />
        <CaseCard
          active={params.N0 >= params.A && params.N0 < params.K}
          icon={<TrendingUp size={20} />}
          title="Caso B: A < N < K"
          subtitle="Crece hacia la capacidad de carga"
          color="green"
        />
        <CaseCard
          active={params.N0 > params.K}
          icon={<TrendingDown size={20} />}
          title="Caso C: N > K"
          subtitle="Baja hacia la capacidad de carga"
          color="yellow"
        />
      </div>
    </div>
  );
};

export default CasesAnalysis;
