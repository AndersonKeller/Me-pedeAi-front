import { z } from "zod";

export const createEstablishSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
});
export const returnEstablishSchema = createEstablishSchema.extend({
  admin: z.boolean(),
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

export type CreateEstablish = z.infer<typeof createEstablishSchema>;
export type Establish = z.infer<typeof returnEstablishSchema>;
