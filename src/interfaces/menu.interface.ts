import { z } from "zod";
import { returnProductSchema } from "./products.interface";

export const menuSchema = z.object({
  id: z.number(),
  product: returnProductSchema.array(),
});
export type iMenu = z.infer<typeof menuSchema>;
