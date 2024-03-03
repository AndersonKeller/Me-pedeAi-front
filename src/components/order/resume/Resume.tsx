import {  iOrderProducts } from "@/interfaces/order.interface"

interface ResumeOrderProps {
    orderProducts: iOrderProducts
}
export function ResumeOrder({orderProducts}:ResumeOrderProps){
    console.log(orderProducts)
    return <>
        <p className="text-gray-900 font-semibold">Resumo:</p>
        <ul className="bg-yellow-50 rounded-md p-2">
        {orderProducts.map((item)=>{
            return <li key={item.id}>
                <p className="text-gray-900">{item.product.quantity} -
                 {item.product.name}
                - <span className="text-slate-800 font-semibold"> R$: {item.product.price}</span></p>
                </li>
        })}
    </ul>
    </>
}