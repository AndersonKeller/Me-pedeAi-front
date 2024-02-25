import { iAddress } from "@/interfaces/client.interface";
import "./index.css"
interface AddressProps {
    address: iAddress
}

export function Address ({address}:AddressProps){
    return <div className="bg-gray-300 rounded-md px-3 py-2 shadow-md">

        <p className="text_order">Cidade - {address.city}, {address.state}</p>
        <p className="text_order">{address.zipcode}</p>
        <p className="text_order">Rua - {address.street}, {address.number}</p>
        <p className="text-gray-800 font-semibold">Referência: </p>
        <p className="text_order">{address.reference}</p>
        </div>
}