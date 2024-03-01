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
            return <li>
                <p className="text-gray-900">{item.product.quantity} - {item.product.name}
                <span>R$: {item.product.price}</span></p>
                </li>
        })}
    </ul>
    </>
}