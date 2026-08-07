"use client";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";
export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = ({
  className,
  ...p
}: React.ComponentProps<typeof ToastPrimitive.Viewport>) => (
  <ToastPrimitive.Viewport
    className={cn(
      "fixed bottom-0 right-0 z-50 m-4 flex w-96 max-w-[calc(100vw-2rem)] flex-col gap-2",
      className,
    )}
    {...p}
  />
);
export const Toast = ({
  className,
  ...p
}: React.ComponentProps<typeof ToastPrimitive.Root>) => (
  <ToastPrimitive.Root
    className={cn("rounded-lg border bg-background p-4 shadow-lg", className)}
    {...p}
  />
);
export const ToastTitle = ToastPrimitive.Title;
export const ToastDescription = ToastPrimitive.Description;
export const ToastClose = ToastPrimitive.Close;
