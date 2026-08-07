import { z } from "zod";
export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(160),
  description: z.string().max(2000).optional(),
  status: z.enum(["PENDING", "COMPLETED"]).default("PENDING"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
  dueDate: z.string().optional(),
  category: z.string().max(80).optional(),
});
export type TaskFormInput = z.infer<typeof taskSchema>;
