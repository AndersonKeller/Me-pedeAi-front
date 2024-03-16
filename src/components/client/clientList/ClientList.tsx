"use client"
import { Service } from "@/controller/Api"
import { Client, iAddress } from "@/interfaces/client.interface"
import { useEffect, useState } from "react"

export function ClientList(){
    const api = new Service()
    const [clients,setClients]=useState([]as Client[])
  async function getClients(){
    const res = await api.getClientsEstablish()
    console.log(res)
    setClients(res)
  }
  function renderAddress(address:iAddress){
    console.log(address)
    return <div className="bg-black p-2 rounded-lg shadow-lg ml-[-4px]">
        <p>Endereço: </p>
        <p>Rua: {address.street}</p>
        <p>Número: {address.number}</p>
        <p>Complementos: {address.reference}</p>
        <p>
            {address.city} - {address.zipcode}
        </p>
    </div>
  }
  useEffect(()=>{
    getClients()
  },[])
    return  <div className="flex flex-col bg-gray-800 p-4 w-full h-[calc(100vh-80px)] overflow-auto">
        
        <p className="uppercase">Clientes: </p>
        <ul className="flex gap-3 flex-wrap">
            {clients&& clients.map((client)=>{
                return <li className="bg-gray-400 p-2 rounded-lg shadow-lg" key={client.id}>
                    <p className="text-gray-950 font-semibold">{client.name}</p>
                    <p className="text-gray-950 font-semibold">{client.phone}</p>
                    <p className="text-gray-950 font-semibold">{client.email}</p>
                   {renderAddress(client.address)}
                </li>
            })}
        </ul>
    </div> 

}