import { OrderType, iOrder } from "@/interfaces/order.interface"
import { statusFilter } from "../Card"

interface OrderFilterProps {
    orders: iOrder[],
    actionStatus: (status:statusFilter)=>void,
    actionType: (type:OrderType)=>void
}
export function OrderFilter({orders,actionStatus,actionType}:OrderFilterProps){
    const statusFilters = [
        {text: "Todos",value: statusFilter.all},
        {text: "Aguardando",value:statusFilter.pending},
        {text: "Finalizados",value:statusFilter.finish}
    ]
    const typeFilters = [
        {text:"Delivery",value: OrderType.delivery},
        {text:"Balcão",value: OrderType.take}
    ]
    return <section className="flex flex-col p-2 gap-1 items-start">
        <p>Filtrar por Status:</p>
        <div className="flex gap-3">
        {statusFilters.map((status)=>{
            return <button key={status.text} onClick={()=>actionStatus(status.value)} className="bg-red-900 focus:bg-blue-950 focus:scale-110">{status.text}</button>
        })}
        </div>
        <p>Filtrar por tipo:</p>
        <div className="flex gap-3">
        {typeFilters.map((type)=>{
            return <button key={type.text} onClick={()=>actionType(type.value)} className="bg-red-900 focus:bg-blue-950 focus:scale-110">{type.text}</button>
        })}
        </div>
    </section>
}