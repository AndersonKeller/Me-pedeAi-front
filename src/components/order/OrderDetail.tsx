import { iOrder } from "@/interfaces/order.interface";
import { Address } from "./OrderAddress";
import "./index.css";
import { OrderType } from "../oderType/orderType";
import { ResumeOrder } from "./resume/Resume";

interface OrderdetailProps {
  order: iOrder;
  close: ()=>void
}
export function Orderdetail({ order,close }: OrderdetailProps) {
  return (
   <div className="bg-[rgba(0,0,0,0.5)] fixed z-10 left-0 top-0 w-full h-screen flex items-center justify-center">
   
   <div className="rounded-xl p-2 pt-4 bg-gray-400 flex flex-col gap-3 relative shadow-lg shadow-gray-800">
   <button className="absolute top-2 right-2" onClick={close}>X</button>
     <div className="flex justify-between items-center">
       <div>
         <OrderType order_type={order.order_type}/>
       </div>
       <div>
       <p className="text_order font-light">
           {order.createdAt}
         </p>
         <p className="text_order font-semibold">
           {order.id} - {order.client.name}
         </p>
         <p className="text_order font-semibold">
           Telefone: {order.client.phone}
         </p>
       </div>
     </div>
    {order.order_type === "delivery" && <Address address={order.client.address} />}
   <ResumeOrder orderProducts={order.orderProducts}/>
   </div>
 </div>
  );
}
