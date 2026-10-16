import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ToastMessage } from '../types';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import styles from './Toast.module.css';

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastMessage, 'id'>) => {
      const id = crypto.randomUUID();
      const duration = toast.duration ?? (toast.undoAction ? 7000 : 4000);
      const newToast: ToastMessage = { ...toast, id, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast]
  );

  const contextValue = useMemo(
    () => ({
      toasts,
      showToast,
      dismissToast,
    }),
    [toasts, showToast, dismissToast]
  );

  const getIcon = (type: ToastMessage['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} className={styles.iconSuccess} />;
      case 'warning':
        return <AlertTriangle size={18} className={styles.iconWarning} />;
      case 'error':
        return <AlertCircle size={18} className={styles.iconError} />;
      default:
        return <Info size={18} className={styles.iconInfo} />;
    }
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div
        className={styles.toastContainer}
        role="status"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
            <div className={styles.iconWrapper}>{getIcon(toast.type)}</div>
            <div className={styles.messageContent}>{toast.message}</div>
            {toast.undoAction && (
              <button
                type="button"
                className={styles.undoBtn}
                onClick={() => {
                  toast.undoAction?.();
                  dismissToast(toast.id);
                }}
              >
                {toast.undoLabel || 'Undo'}
              </button>
            )}
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => dismissToast(toast.id)}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
