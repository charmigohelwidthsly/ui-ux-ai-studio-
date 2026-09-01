import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-start space-x-3 text-xs animate-in slide-in-from-bottom-5 fade-in duration-200 ${
            toast.type === 'success'
              ? 'bg-slate-900 text-white border-emerald-500/50'
              : toast.type === 'error'
              ? 'bg-red-950 text-white border-red-500/60'
              : toast.type === 'warning'
              ? 'bg-amber-950 text-white border-amber-500/60'
              : 'bg-slate-900 text-white border-teal-500/50'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
          {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />}

          <div className="flex-1 min-w-0">
            <div className="font-bold text-xs leading-tight mb-0.5">{toast.title}</div>
            <div className="text-slate-300 text-[11px] leading-relaxed break-words">{toast.message}</div>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
