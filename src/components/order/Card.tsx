"use client"
import { Service } from "@/controller/Api"
import { iOrder } from "@/interfaces/order.interface"
import { ordersStore } from "@/store/orders.store"
import { useEffect, useState } from "react"
import { Orderdetail } from "./OrderDetail"
import { socket } from "@/controller/socket.controller"
import { toast } from "react-toastify"

export function CardOrder(){
    const {orders,setOders, update_orders} = ordersStore()
    const [detailOrder,setDetailOrder] = useState({}as iOrder)
    const [openDetail,setOpenDetail] = useState(false)
    const api = new Service()
    async function getOrders(){
       const res: iOrder[] =  await api.getOrders() 
       setOders(res)
    }
    function openOrder(order:iOrder){
      setDetailOrder(order)
      setOpenDetail(true)
    }
    useEffect(()=>{
      getOrders()
      update_orders
    },[])
    useEffect(()=>{
      console.log("att")
    },[orders])
    return <ul className="flex flex-wrap gap-2 items-center justify-start px-2">{orders.map((item)=>{
        return <li className="rounded-lg bg-gray-300 p-2" key={item.id}>
          <p className="text-sm text-gray-900">{item.id} - {item.client.name}</p>
          <p className="text-sm text-gray-900 text-right font-bold">{item.client.phone}</p>
          <p className={`${item.order_type==='delivery'?'bg-green-800':'bg-gray-700'} text-sm rounded-lg p-1`}>{item.order_type}</p>
          <p className="text-sm text-blue-900 font-bold text-right">R$ {item.total.toFixed(2)}</p>
          <button onClick={()=>openOrder(item)} className="bg-gray-200 px-2 py-1 rounded-lg w-full text-sm border border-red-800 text-gray-900 uppercase font-semibold" >Ver</button>
          </li>
          
        })}
    {openDetail&&<Orderdetail  order={detailOrder}/>}
    </ul>
}