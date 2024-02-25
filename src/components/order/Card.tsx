"use client"
import { Service } from "@/controller/Api"
import { StatusOrder, iOrder } from "@/interfaces/order.interface"
import { ordersStore } from "@/store/orders.store"
import { useEffect, useState } from "react"
import { Orderdetail } from "./OrderDetail"

import { OrderType } from "../oderType/orderType"

export function CardOrder(){
    const {orders,setOders, update_orders} = ordersStore()
    const [detailOrder,setDetailOrder] = useState({}as iOrder)
    const [openDetail,setOpenDetail] = useState(false)
    const api = new Service()
    async function getOrders(){
       const res: iOrder[] =  await api.getOrders()
       const finishedOrders = res.filter((order)=>order.status === StatusOrder.finish)
       const pendingOrders = res.filter((order)=>order.status === StatusOrder.pending)
       const orderedOrders = [...pendingOrders,...finishedOrders]
       setOders(orderedOrders)
    }
    function openOrder(order:iOrder){
      setDetailOrder(order)
      setOpenDetail(true)
    }
    function close(){
      setOpenDetail(false)
    }
    async function finish(id:number){
      const res = await api.updateStatusorder(id,StatusOrder.finish)
      console.log(res)
      await getOrders()
    }
    useEffect(()=>{
      getOrders()
      update_orders
    },[])
    useEffect(()=>{
      console.log("att",orders)
    },[orders])
    return <ul className="w-full h-[calc(100vh-80px)] overflow-auto bg-gray-800 p-4">
      <div className="flex flex-wrap justify-start gap-3">
      {orders&&orders.map((item)=>{
        
        return <li className={`${item.status === StatusOrder.finish ? 'bg-gray-400':'bg-gray-300'} w-[16%] min-w-[180px] rounded-lg  p-2 shadow-md shadow-gray-400 cursor-pointer hover:scale-105 transition-all`} key={item.id}>
          <p>{item.status}</p>
          <p className="text-sm text-gray-900">{item.id} - {item.client.name}</p>
          <p className="text-sm text-gray-900 text-right font-bold">{item.client.phone}</p>
          <OrderType order_type={item.order_type}/>
          <p className="text-sm text-blue-900 font-bold text-right">R$ {item.total.toFixed(2)}</p>
         <div className="flex justify-between">
         <button onClick={()=>openOrder(item)} className="bg-gray-200 px-2 py-1 rounded-lg text-sm border border-red-800 text-gray-900 hover:scale-105 transition-all uppercase font-semibold" >Ver</button>
          <button onClick={()=>finish(item.id)} className="bg-gray-200 px-2 py-1 rounded-lg text-sm border border-red-800 text-gray-900 hover:scale-105 transition-all uppercase font-semibold" >Finalizar</button>
         </div>
          </li>
         
        })}
    {openDetail&&<Orderdetail close={close} order={detailOrder}/>}
    </div>
    </ul>
}