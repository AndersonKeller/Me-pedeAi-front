import {  iOrder } from "@/interfaces/order.interface";
import { create } from "zustand";

interface OrderStore {
    orders: iOrder[],
    setOders: (orders:iOrder[])=>void
}

export const ordersStore = create<OrderStore>()((set)=>({
    orders: []as iOrder[],
    setOders: (newOrders:iOrder[])=>set(()=>({
        orders: newOrders
    }))
}))