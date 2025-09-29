import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from 'recharts';
import type { SimulationParams, DataPoint } from '../types';

const GrowthChart: React.FC<{ 
  data: DataPoint[]; 
  params: SimulationParams 
}> = ({ data, params }) => (
  <div className="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col">
    <h3 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-blue-400 pb-1 text-center">
      📈 Evolución de la Población
    </h3>
    
    <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        {/* aumentamos más el margen izquierdo */}
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 25, left: 90 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          
          {/* Eje X */}
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} 
            label={{ 
              value: 'Meses', 
              position: 'insideBottom', 
              offset: -15, 
              fill: '#1e3a8a', 
              fontSize: 14, 
              fontWeight: 700 
            }}
          />
          
          {/* Eje Y */}
          <YAxis 
            tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} 
            label={{ 
              value: 'Población (N)', 
              angle: -90, 
              position: 'insideLeft', 
              fill: '#1e3a8a', 
              fontSize: 14, 
              fontWeight: 700 
            }}
          />
          
          {/* Tooltip */}
          <Tooltip 
            contentStyle={{ 
              background: 'white', 
              border: '2px solid #3b82f6', 
              borderRadius: 8,
              padding: '8px 12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
          />
          
          {/* Línea Umbral A */}
          <ReferenceLine 
            y={params.A} 
            stroke="#ef4444" 
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{ 
              value: `A = ${params.A}`, 
              fill: '#dc2626', 
              fontSize: 14, 
              fontWeight: 800,
              position: 'left',  
              dx: -40              // empujamos más hacia afuera
            }} 
          />
          
          {/* Línea Capacidad K */}
          <ReferenceLine 
            y={params.K} 
            stroke="#10b981" 
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{ 
              value: `K = ${params.K}`, 
              fill: '#059669', 
              fontSize: 14, 
              fontWeight: 800,
              position: 'left',
              dx: -40
            }} 
          />
          
          {/* Línea de datos */}
          <Line 
            type="monotone" 
            dataKey="population" 
            stroke="#0ea5e9" 
            strokeWidth={3} 
            dot={{ r: 3, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }} 
            activeDot={{ r: 5, fill: '#0284c7' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default GrowthChart;
