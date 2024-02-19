import { iOrder } from "@/interfaces/order.interface";
interface OrderdetailProps{
    order: iOrder
}
export function Orderdetail({order}:OrderdetailProps){
    return <div className="bg-[rgba(0,0,0,0.5)] fixed z-10 left-0 top-0 w-full h-screen flex items-center justify-center">
            <div className="rounded-xl p-2 bg-gray-200">

                {order.id}
                {order.client.address.street}
            </div>
        </div>

}