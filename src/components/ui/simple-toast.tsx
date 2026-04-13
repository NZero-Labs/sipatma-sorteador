import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";

interface Toast {
  id: string;
  message: string;
  type: "error" | "success" | "info";
  duration: number;
}

interface ToastContextType {
  showToast: (message: string, type?: Toast["type"], duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: Toast["type"] = "error", duration = 8000) => {
      const id = `toast-${Date.now()}`;
      // #region agent log
      console.log("[DEBUG TOAST] showToast called", { id, message, type, duration, timestamp: Date.now() });
      // #endregion
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    // #region agent log
    console.log("[DEBUG TOAST] removeToast called", { id, timestamp: Date.now() });
    // #endregion
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  useEffect(() => {
    // #region agent log
    console.log("[DEBUG TOAST] ToastItem mounted, setting timer", { id: toast.id, duration: toast.duration, timestamp: Date.now() });
    // #endregion
    const timer = setTimeout(() => {
      // #region agent log
      console.log("[DEBUG TOAST] Timer expired, removing toast", { id: toast.id, timestamp: Date.now() });
      // #endregion
      onRemove(toast.id);
    }, toast.duration);

    return () => {
      // #region agent log
      console.log("[DEBUG TOAST] ToastItem cleanup", { id: toast.id, timestamp: Date.now() });
      // #endregion
      clearTimeout(timer);
    };
  }, [toast.id, toast.duration, onRemove]);

  const bgColor =
    toast.type === "error"
      ? "bg-red-500"
      : toast.type === "success"
        ? "bg-green-500"
        : "bg-blue-500";

  return (
    <div
      className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-[400px] animate-in slide-in-from-right-full`}
      style={{ fontFamily: "Lato" }}
    >
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="p-1 hover:bg-white/20 rounded transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}
