import { Service } from "@/controller/Api";
import { socket } from "@/controller/socket.controller";
import {  StatusOrder, iOrder } from "@/interfaces/order.interface";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";
import { create } from "zustand";

interface OrderStore {
    orders: iOrder[],
    setOders: (orders:iOrder[])=>void
    update_orders: Socket
}

export const ordersStore = create<OrderStore>()((set)=>({
    update_orders:socket.on("update_orders",(info:iOrder[])=>{
        toast.info("Novo pedido acabou de chegar", { pauseOnHover: false }),
        (()=>set(()=>({
            orders: info
        })))()
    }),
    
    orders: []as iOrder[],
    setOders: (newOrders:iOrder[])=>set(()=>({
        orders: newOrders
    }))
}))
