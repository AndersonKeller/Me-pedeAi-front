import { StatusOrder, iOrder } from "@/interfaces/order.interface";
import { Address } from "../orderAddress/OrderAddress";
import "../index.css";
import { OrderType } from "../../oderType/orderType";
import { ResumeOrder } from "../resume/Resume";
import { Service } from "@/controller/Api";
import { toast } from "react-toastify";
import { useState } from "react";
import { Wrapper } from "@/components/wrapper/WrapperModal";

interface OrderdetailProps {
  order: iOrder;


}
export function Orderdetail({ order }: OrderdetailProps) {
  const api = new Service()
  const [charging,setCharging] = useState(false)
  async function finish(id:number){
    setCharging(true)
    const res = await api.updateStatusorder(id,StatusOrder.finish)
    
    toast.success("Pedido Finalizado com sucesso!")
    setTimeout(() => {
      close()
      setCharging(false)
    }, 1500);
  }
  return (
   
   <Wrapper>
  
     <div className="flex justify-around items-center">
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
     <button onClick={()=>finish(order.id)} disabled={order.status!=="pending" || charging} 
     className="disabled:border-none disabled:bg-gray-300 disabled:text-gray-400 bg-gray-200 
      border border-red-800 text-gray-900">Finalizar</button>
    {order.order_type === "delivery" && <div>
      <p className="text_order font-semibold">Endereço</p>
    <Address address={order.client.address} />
    </div> }
   {order.comments&& <div className="border border-gray-700 rounded-md bg-red-200 px-2 py-1">
        <p className="text-red-950 font-semibold">Observações:</p>
        <p className="text-red-950 font-semibold">{order.comments}</p>
      </div> }
      <div className="bg-white shadow-lg rounded-sm px-2 py-1">
        <p className="text_order font-semibold">Total - R$ {order.total} - <span>{order.payment}</span></p>
      </div>
   <ResumeOrder orderProducts={order.orderProducts}/>

   </Wrapper>
  );
}
