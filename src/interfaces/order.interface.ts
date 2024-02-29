import {  returnClientSchema } from './client.interface';
import {z} from "zod"
import { returnProductSchema } from "./products.interface";

//types
export enum OrderType {
    delivery ="delivery",
    take = "take"
}
export enum StatusOrder {
  finish = "finish",
  pending = "pending"
}
export const orderProductSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  product:returnProductSchema.omit({establish:true,typProduct:true})
}).array()
export const orderSchema = z.object({
    id: z.number(),
    total: z.number(),
    order_type: z.nativeEnum(OrderType),
    orderProducts: orderProductSchema,
    client: returnClientSchema,
    status: z.nativeEnum(StatusOrder),
    createdAt: z.string(),
    comments: z.string().nullable(),
    deletedAt: z.string().nullable(),
    payment: z.string()
  });

export type iOrder = z.infer<typeof orderSchema>
export type iOrderType = OrderType
export type iOrderProducts = z.infer<typeof orderProductSchema>