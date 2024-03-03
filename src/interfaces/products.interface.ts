import { z } from "zod";
import { returnEstablishSchema } from "./establish.interface";
import { DeepPartial } from "react-hook-form";

//types
export const createTypeProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  establish: returnEstablishSchema,
});
export const returnTypeProductSchema = createTypeProductSchema
  .extend({
    id: z.number(),
  })
  .omit({ establish: true });
export type CreateTypeProduct = z.infer<typeof createTypeProductSchema>;
export type TypeProduct = z.infer<typeof returnTypeProductSchema>;
export type UpdateTypeProduct = DeepPartial<TypeProduct>
//products
export const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  typProduct: createTypeProductSchema.pick({ name: true }),
  price: z.number(),
  quantity: z.number(),
});
export const returnProductSchema = createProductSchema.extend({
  id: z.number(),
  type: returnTypeProductSchema,
  establish: returnEstablishSchema,
});
export type CreateProduct = z.infer<typeof createProductSchema>;
export type Product = z.infer<typeof returnProductSchema>;
