"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  Toast,
  ToastDescription,
  ToastProvider as RadixToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

type ToastInput = { title: string; description?: string };
const ToastContext = createContext<
  { toast: (input: ToastInput) => void } | undefined
>(undefined);

export function AppToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<(ToastInput & { id: number })[]>([]);
  const dismiss = useCallback(
    (id: number) =>
      setItems((current) => current.filter((toast) => toast.id !== id)),
    [],
  );
  const value = useMemo(
    () => ({
      toast: (input: ToastInput) => {
        const id = Date.now();
        setItems((current) => [...current, { ...input, id }]);
        window.setTimeout(() => dismiss(id), 3500);
      },
    }),
    [dismiss],
  );

  return (
    <RadixToastProvider>
      <ToastContext.Provider value={value}>
        {children}
        {items.map((item) => (
          <Toast
            key={item.id}
            open
            onOpenChange={(open) => !open && dismiss(item.id)}
          >
            <ToastTitle>{item.title}</ToastTitle>
            {item.description && (
              <ToastDescription>{item.description}</ToastDescription>
            )}
          </Toast>
        ))}
        <ToastViewport />
      </ToastContext.Provider>
    </RadixToastProvider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within AppToastProvider");
  return ctx;
}
