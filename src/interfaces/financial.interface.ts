import {z} from "zod"
import { Payment } from "./order.interface"

const financialSchema = z.object({
    createdAt: z.string().datetime(),
    orders: z.string(),
    payment: z.nativeEnum(Payment),
    total: z.number()
}).array()

export type iFinancial = z.infer<typeof financialSchema>