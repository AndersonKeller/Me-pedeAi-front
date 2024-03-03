import { Service } from "@/controller/Api"
import { useEffect, useState } from "react"
import { parseCookies } from "nookies";
import { TypeProduct } from "@/interfaces/products.interface";
import { Editcategorie } from "./editCategorie/EditCategorie";
import { wrapperStore } from "@/store/wrapper.store";
export function Categories(){
    const cookies = parseCookies();
    const api = new Service()
    const [categories,setCategories] =useState([]as TypeProduct[])
    const {openWrapper,setOpenWrapper} = wrapperStore()
    async function getCategories(){
        const res = await api.getTypeProducts(cookies["@mepedeAi-token"])
        console.log(res)
        setCategories(res)
    }
    useEffect(()=>{
        getCategories()
    },[])
    return <div className="pb-2">
        <p>Categorias:</p>
        <div className="flex gap-2 pb-2">
            {categories&&categories.map((categorie)=>{
            return <div className="items-center px-2 py-1 rounded-md flex flex-col gap-2 shadow-lg bg-gray-200" key={categorie.id}>
                <p className="text-cyan-900">{categorie.name}</p>
                <button onClick={()=>setOpenWrapper(true)} className="text-sm text-gray-200 bg-cyan-700">Editar</button>
                   {openWrapper&& <Editcategorie categorie={categorie}/>}
                </div>
            })}
            </div>
            <button className="text-sm text-gray-200 bg-green-700">Criar</button>
        </div>
}