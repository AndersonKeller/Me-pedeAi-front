import {z} from "zod"

const addressSchema = z.object({
    city: z.string(),
    id: z.string(),
    number: z.string(),
    reference: z.string(),
    state: z.string(),
    street: z.string(),
    zipcode: z.string()
})

export const returnClientSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    phone: z.string(),
    address: addressSchema
})

export type Client = z.infer<typeof returnClientSchema>
export type iAddress = z.infer<typeof addressSchema>