import { useContext } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { ToastContext, ToastType } from '../../contexts/ToastContext';

const toastStyles: Record<ToastType, string> = {
  success: 'bg-green-500/90 text-white',
  error: 'bg-red-500/90 text-white',
  info: 'bg-blue-500/90 text-white',
  warning: 'bg-yellow-500/90 text-white',
};

const toastIcons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={20} />,
  error: <AlertCircle size={20} />,
  info: <Info size={20} />,
  warning: <AlertTriangle size={20} />,
};

export function ToastContainer() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('ToastContainer must be used within ToastProvider');
  }

  const { toasts, removeToast } = context;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm animate-slide-in ${toastStyles[toast.type]}`}
        >
          <div className="flex-shrink-0">
            {toastIcons[toast.type]}
          </div>
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
