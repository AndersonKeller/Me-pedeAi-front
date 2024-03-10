import { z } from "zod";
import { returnEstablishSchema } from "./establish.interface";
import { DeepPartial } from "react-hook-form";

//types
export const createTypeProductSchema = z.object({
  name: z.string().min(3,"Nome é obrigatório"),
  description: z.string(),
  establish: returnEstablishSchema.optional()
});

export const returnTypeProductSchema = createTypeProductSchema
  .extend({
    id: z.string(),
  })
  .omit({ establish: true });

export const updateTypeProductSchema = returnTypeProductSchema.omit({id:true})
export type CreateTypeProduct = z.infer<typeof createTypeProductSchema>;
export type TypeProduct = z.infer<typeof returnTypeProductSchema>;
export type UpdateTypeProduct = DeepPartial<TypeProduct>
//products
export const createProductSchema = z.object({
  name: z.string().min(1,"Nome é obrigatório"),
  description: z.string(),
  typeProduct: z.union([createTypeProductSchema.pick({ name: true }),z.string()]),
  price: z.union([z.string(),z.number()]),
  quantity: z.string(),
});
export const returnProductSchema = createProductSchema.extend({
  id: z.number(),
  type: returnTypeProductSchema,
  establish: returnEstablishSchema,
});
export const updateProductSchema = returnProductSchema.extend({
    type: returnTypeProductSchema.pick({id:true}),
   
}).omit({establish:true,type:true})
export type CreateProduct = z.infer<typeof createProductSchema>;
export type Product = z.infer<typeof returnProductSchema>;
export type UpdateProduct = DeepPartial<Product>