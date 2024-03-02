import { iOrder } from "@/interfaces/order.interface"
import { statusFilter } from "../Card"

interface OrderFilterProps {
    orders: iOrder[],
    action: (status:statusFilter)=>void
}
export function OrderFilter({orders,action}:OrderFilterProps){
    const typesFilter = [
        {text: "Todos",value: statusFilter.all},
        {text: "Aguardando",value:statusFilter.pending},
        {text: "Finalizados",value:statusFilter.finish}
]
    return <section className="flex p-2 gap-3 items-center">
        {typesFilter.map((type)=>{
            return <button key={type.text} onClick={()=>action(type.value)} className="bg-red-900 rounded-lg px-4 py-1">{type.text}</button>
        })}
    </section>
}