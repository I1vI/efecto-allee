import { useEffect, useState } from 'react';
import type { SimulationParams } from '../types';
import { determineCase } from '../utils/determineCase';

type Bee = { id: number; x: number; y: number; delay: number; };

const BeeAnimation: React.FC<{ 
  initialPop: number; 
  finalPop: number; 
  params: SimulationParams; 
}> = ({ initialPop, finalPop, params }) => {
  const [bees, setBees] = useState<Bee[]>([]);
  
  useEffect(() => {
    const n = Math.min(Math.max(Math.floor(finalPop / 8), 1), 18);
    setBees(Array.from({ length: n }, (_, i) => ({
      id: i, 
      x: Math.random() * 75 + 12, 
      y: Math.random() * 50 + 10, 
      delay: Math.random() * 2.5
    })));
  }, [finalPop]);

  const isExtinct = finalPop < 1;
  const info = determineCase(params.N0, params.A, params.K);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col">
      <h3 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-blue-400 pb-1">
        🐝 Evolución de la Colonia
      </h3>

      {/* Comparación Mes 0 vs Mes 10 */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 px-3 py-2 border border-blue-200">
          <p className="text-[10px] uppercase tracking-wide text-blue-600 font-semibold mb-1">Mes 0 (Inicio)</p>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-blue-700">{initialPop}</span>
            <span className="text-xs text-gray-600 mb-0.5">abejas</span>
          </div>
        </div>
        
        <div className={`rounded-lg px-3 py-2 border ${
          isExtinct 
            ? 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200' 
            : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
        }`}>
          <p className={`text-[10px] uppercase tracking-wide font-semibold mb-1 ${
            isExtinct ? 'text-red-600' : 'text-green-600'
          }`}>
            Mes 10 (Final)
          </p>
          <div className="flex items-end justify-between">
            <span className={`text-2xl font-bold ${
              isExtinct ? 'text-red-700' : 'text-green-700'
            }`}>
              {isExtinct ? '0' : finalPop.toFixed(0)}
            </span>
            <span className="text-xs text-gray-600 mb-0.5">
              {isExtinct ? '💀 extinción' : 'abejas'}
            </span>
          </div>
        </div>
      </div>

      {/* Zona de animación */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-sky-200 via-sky-100 to-green-200 flex-1 min-h-[200px] border-2 border-blue-300 shadow-inner">
        
        {/* Badge de escenario actual */}
        <div className="absolute top-3 left-3 z-10">
          <div className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${
            info.color === 'red'
              ? 'bg-red-500 text-white'
              : info.color === 'green'
              ? 'bg-green-500 text-white'
              : 'bg-yellow-500 text-white'
          }`}>
            {info.case}
          </div>
        </div>

        {/* Nubes decorativas */}
        <div className="absolute top-2 right-4 w-16 h-8 bg-white/40 rounded-full blur-sm"></div>
        <div className="absolute top-8 right-12 w-12 h-6 bg-white/30 rounded-full blur-sm"></div>

        {/* Panal mejorado */}
        <div className="absolute left-1/2 bottom-6 -translate-x-1/2 drop-shadow-xl">
          <svg width="70" height="70" viewBox="0 0 100 100">
            {/* Sombra del panal */}
            <ellipse cx="50" cy="92" rx="25" ry="4" fill="rgba(0,0,0,0.2)" />
            
            {/* Panal principal */}
            <path 
              d="M50 10 L80 30 L80 70 L50 90 L20 70 L20 30 Z" 
              fill="#FFA500" 
              stroke="#FF8C00" 
              strokeWidth="3"
            />
            
            {/* Celdas hexagonales superiores */}
            <path 
              d="M35 35 L50 25 L65 35 L65 50 L50 60 L35 50 Z" 
              fill="#FFD700"
              stroke="#FFC107"
              strokeWidth="1.5"
            />
            
            {/* Celdas hexagonales inferiores */}
            <path 
              d="M35 55 L50 45 L65 55 L65 70 L50 80 L35 70 Z" 
              fill="#FFD700"
              stroke="#FFC107"
              strokeWidth="1.5"
            />
            
            {/* Entrada del panal */}
            <circle cx="50" cy="40" r="3" fill="#8B4513"/>
            
            {/* Detalles de brillo */}
            <circle cx="42" cy="30" r="2" fill="rgba(255,255,255,0.4)"/>
            <circle cx="58" cy="52" r="1.5" fill="rgba(255,255,255,0.3)"/>
          </svg>
        </div>

        {/* Abejas animadas mejoradas */}
        {!isExtinct && bees.map(b => (
          <div
            key={b.id}
            className="absolute animate-float"
            style={{ 
              left: `${b.x}%`, 
              top: `${b.y}%`, 
              animationDelay: `${b.delay}s`,
              zIndex: 5
            }}
          >
            <svg width="28" height="28" viewBox="0 0 50 50">
              {/* Sombra de la abeja */}
              <ellipse cx="26" cy="28" rx="8" ry="3" fill="rgba(0,0,0,0.15)" />
              
              {/* Cuerpo */}
              <ellipse cx="25" cy="25" rx="10" ry="15" fill="#FFD700" stroke="#000" strokeWidth="1.5"/>
              
              {/* Rayas negras */}
              <rect x="20" y="18" width="10" height="3" fill="#000" rx="1"/>
              <rect x="20" y="25" width="10" height="3" fill="#000" rx="1"/>
              <rect x="20" y="32" width="10" height="3" fill="#000" rx="1"/>
              
              {/* Alas con brillo */}
              <ellipse cx="15" cy="18" rx="9" ry="4" fill="#87CEEB" opacity="0.7"/>
              <ellipse cx="35" cy="18" rx="9" ry="4" fill="#87CEEB" opacity="0.7"/>
              <ellipse cx="16" cy="17" rx="4" ry="2" fill="#FFFFFF" opacity="0.5"/>
              <ellipse cx="34" cy="17" rx="4" ry="2" fill="#FFFFFF" opacity="0.5"/>
              
              {/* Antenas */}
              <line x1="22" y1="12" x2="19" y2="6" stroke="#000" strokeWidth="1.5"/>
              <line x1="28" y1="12" x2="31" y2="6" stroke="#000" strokeWidth="1.5"/>
              <circle cx="19" cy="6" r="1.5" fill="#000"/>
              <circle cx="31" cy="6" r="1.5" fill="#000"/>
              
              {/* Ojos */}
              <circle cx="22" cy="20" r="1.5" fill="#000"/>
              <circle cx="28" cy="20" r="1.5" fill="#000"/>
            </svg>
          </div>
        ))}

        {/* Mensaje de extinción */}
        {isExtinct && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-20">
            <div className="text-center bg-white/95 px-6 py-4 rounded-xl shadow-2xl border-4 border-red-500">
              <p className="text-3xl font-bold text-red-600 mb-1">⚠️ EXTINCIÓN</p>
              <p className="text-sm text-gray-600">La población no sobrevivió</p>
            </div>
          </div>
        )}

        {/* Pasto decorativo */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-400/50 to-transparent"></div>
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg); 
          }
          25% { 
            transform: translate(12px, -18px) rotate(8deg); 
          }
          50% { 
            transform: translate(-8px, -12px) rotate(-8deg); 
          }
          75% { 
            transform: translate(18px, -8px) rotate(5deg); 
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BeeAnimation;