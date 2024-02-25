import {  returnClientSchema } from './client.interface';
import {z} from "zod"
import { returnProductSchema } from "./products.interface";

//types
export enum OrderType {
    delivery ="delivery",
    take = "take"
}
export const orderSchema = z.object({
    id: z.number(),
    total: z.number(),
    order_type: z.nativeEnum(OrderType),
    orderProducts: returnProductSchema.omit({establish:true}).array(),
    client: returnClientSchema
  });

export type iOrder = z.infer<typeof orderSchema>
export type iOrderType = OrderType