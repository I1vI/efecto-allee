// ModalLatex.tsx
import React, { useEffect } from 'react';
import katex from 'katex';

type ModalLatexProps = {
  show: boolean;
  onClose: () => void;
  equations?: string[]; // cada elemento es una cadena en LaTeX
  title?: string;
};

const ModalLatex: React.FC<ModalLatexProps> = ({
  show,
  onClose,
  equations = [],
  title = 'Ecuaciones',
}) => {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (show) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [show, onClose]);

  if (!show) return null;

  const renderTex = (tex: string) => {
    try {
      return { __html: katex.renderToString(tex, { throwOnError: false, displayMode: true }) };
    } catch (err) {
      return { __html: `<pre>${tex}</pre>` }; // fallback si KaTeX falla
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[80vh] overflow-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-sm px-3 py-1 rounded hover:bg-gray-100"
            aria-label="Cerrar"
          >
            Cerrar ✕
          </button>
        </div>

        <div className="space-y-3">
          {/* Pequeña descripción y fórmula general */}
          <div className="p-3 bg-blue-50 rounded">
            <p className="text-sm text-gray-700 mb-2">
              Método de <strong>Euler</strong> aplicado al modelo poblacional con efecto <strong>Allee</strong>.
            </p>
            <div
              dangerouslySetInnerHTML={renderTex(
                'N_{t+1} = N_t + \\Delta t \\cdot r \\cdot N_t \\left(1 - \\frac{N_t}{K}\\right) \\left(\\frac{N_t}{A} - 1\\right)'
              )}
            />
          </div>

          {/* Ecuaciones paso a paso */}
          {equations.length === 0 && (
            <div className="text-sm text-gray-500">No hay ecuaciones.</div>
          )}
          {equations.map((eq, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded">
              <div dangerouslySetInnerHTML={renderTex(eq)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalLatex;
