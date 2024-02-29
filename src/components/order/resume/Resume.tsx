import {  iOrderProducts } from "@/interfaces/order.interface"

interface ResumeOrderProps {
    orderProducts: iOrderProducts
}
export function ResumeOrder({orderProducts}:ResumeOrderProps){
    console.log(orderProducts)
    return <ul>
        <p>Resumo</p>
        {orderProducts.map((item)=>{
            return <li>
                {item.product.quantity} - {item.product.name}
                <span>R$: {item.product.price}</span>
                </li>
        })}
    </ul>
}