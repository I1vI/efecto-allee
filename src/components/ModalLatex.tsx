// ModalLatex.tsx
import React, { useEffect, useRef } from 'react';
import katex from 'katex';

type ModalLatexProps = {
  show: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;   // si hay children, se usa SOLO esto
  equations?: string[];         // solo se usa si NO hay children
};

const ModalLatex: React.FC<ModalLatexProps> = ({
  show,
  onClose,
  title = 'Ecuaciones',
  children,
  equations = [],
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [show, onClose]);

  if (!show) return null;

  const renderTex = (tex: string) => {
    try {
      return { __html: katex.renderToString(tex, { throwOnError: false, displayMode: true }) };
    } catch {
      return { __html: `<pre>${tex}</pre>` };
    }
  };

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6"
      onMouseDown={handleBackdrop}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="
          w-full max-w-4xl bg-white rounded-2xl shadow-xl outline-none
          h-[85vh] overflow-hidden flex flex-col min-h-0
        "
      >
        {/* Header fijo */}
        <div className="shrink-0 sticky top-0 z-10 bg-white/95 backdrop-blur border-b px-5 py-3 flex items-center gap-3">
          <div className="text-xl font-semibold text-gray-800 flex-1">{title}</div>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
            aria-label="Cerrar"
          >
            Cerrar ✖
          </button>
        </div>

        {/* Contenido que scrollea (sin scroll por fórmula) */}
        <div
          className="
            flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-4 min-h-0
            [&_.katex]:break-words
            [&_span.katex-display]:block
            [&_span.katex-display]:overflow-visible
            [&_span.katex-display]:mx-0
            [&_span.katex-display]:px-0
            [&_span.katex-display_.katex]:whitespace-normal
          "
          style={{ scrollBehavior: 'smooth' }}
        >
          {children ? (
            // SOLO children si existen
            children
          ) : (
            // Si no hay children, render equations (sin intro adicional)
            <div className="space-y-3">
              {equations.length === 0 ? (
                <div className="text-sm text-gray-500">No hay ecuaciones.</div>
              ) : (
                equations.map((eq, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded">
                    <div dangerouslySetInnerHTML={renderTex(eq)} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalLatex;
