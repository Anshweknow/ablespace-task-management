"use client";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { cn } from "@/lib/utils";
export const Form = FormProvider;
export function FormField<T extends FieldValues, N extends FieldPath<T>>(
  props: ControllerProps<T, N>,
) {
  return <Controller {...props} />;
}
export function FormItem({
  className,
  ...p
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...p} />;
}
export function FormLabel({
  className,
  ...p
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium", className)} {...p} />;
}
export function FormControl({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export function FormMessage({ name }: { name: string }) {
  const { formState } = useFormContext();
  const error = formState.errors[name];
  return error ? (
    <p className="text-sm text-destructive">{String(error.message)}</p>
  ) : null;
}
