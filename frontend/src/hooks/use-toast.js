// import { useState, useCallback } from "react";

// export const useToast = () => {
//   const [toasts, setToasts] = useState([]);

//   const toast = useCallback(({ title, description, variant = "default", duration = 3000 }) => {
//     const id = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

//     const newToast = { id, title, description, variant };
//     setToasts((prev) => [...prev, newToast]);

//     const timeout = setTimeout(() => {
//       setToasts((prev) => prev.filter((t) => t.id !== id));
//     }, duration);

//     return () => {
//       clearTimeout(timeout);
//       setToasts((prev) => prev.filter((t) => t.id !== id));
//     };
//   }, []);

//   const removeToast = useCallback((id) => {
//     setToasts((prev) => prev.filter((t) => t.id !== id));
//   }, []);

//   return { toast, toasts, removeToast };
// };




import { toast as sonnerToast } from "sonner";

export const useToast = () => {
  return {
    toast: (options) => sonnerToast(options),
  };
};

