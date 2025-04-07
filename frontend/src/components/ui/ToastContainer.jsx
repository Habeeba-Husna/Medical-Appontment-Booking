// src/components/ui/ToastContainer.jsx
import React from "react";
import { useToast } from "../../hooks/use-toast";
import { cn } from "../../lib/utils";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "max-w-sm w-full rounded-lg shadow-md px-4 py-3 border text-sm transition-all",
            toast.variant === "destructive"
              ? "bg-red-100 text-red-800 border-red-300"
              : "bg-green-100 text-green-800 border-green-300"
          )}
        >
          <div className="font-semibold">{toast.title}</div>
          <div>{toast.description}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="absolute top-1 right-2 text-xs text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;

