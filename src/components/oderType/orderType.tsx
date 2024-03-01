import { iOrderType } from "@/interfaces/order.interface";
interface OrdeTypeProps{
    order_type: iOrderType
}
export function OrderType({order_type}:OrdeTypeProps){
    return <p className={`${order_type==='delivery'?'bg-green-800':'bg-gray-700'} text-sm rounded-lg p-1`}>{order_type === "take"?"retirada":order_type}</p>
}