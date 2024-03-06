import { Service } from "@/controller/Api"
import { useEffect, useState } from "react"
import { parseCookies } from "nookies";
import { TypeProduct } from "@/interfaces/products.interface";
import { Editcategorie } from "./editCategorie/EditCategorie";
import { wrapperStore } from "@/store/wrapper.store";
import { CreateCategory } from "./createCategorie/CreateCategory"

export function Categories(){
    const cookies = parseCookies();
    const api = new Service()
    const [categories,setCategories] =useState([]as TypeProduct[])
    const [toCreate,setToCreate] = useState(false)
    const {openWrapper,setOpenWrapper} = wrapperStore()
    const [selectcategorie,setselectedCategorie] = useState({}as TypeProduct| null)
    async function getCategories(){
        const res = await api.getTypeProducts(cookies["@mepedeAi-token"])
        console.log(res)
        setCategories(res)
    }
    function openEdit(categorie:TypeProduct){
        setselectedCategorie(categorie)
        setOpenWrapper(true)
    }
    function openCreate(){
        setToCreate(true)
        setOpenWrapper(true)
    }
    useEffect(()=>{
        getCategories()
    },[])
    useEffect(()=>{
        if(!openWrapper){
            setToCreate(false)
            setselectedCategorie(null)
            getCategories()
        }
    },[selectcategorie,openWrapper])
    return <div className="pb-2">
        <p>Categorias:</p>
        <div className="flex gap-2 pb-2">
            {categories&&categories.map((categorie)=>{
            return <div className="items-center px-2 py-1 w-[200px] rounded-md flex flex-col gap-2 shadow-lg bg-gray-200" key={categorie.id}>
                <p className="text-cyan-900 font-semibold underline">{categorie.name}</p>
                <p className="text-xs text-gray-900 overflow-clip">
                    {categorie.description}
                </p>
                <button onClick={()=>openEdit(categorie)} className="text-sm text-gray-200 bg-cyan-700">Editar</button>
                   {openWrapper && selectcategorie && <Editcategorie categorie={selectcategorie}/>}
                </div>
            })}
            </div>
            <button onClick={openCreate} className="text-sm text-gray-200 bg-green-700">Criar</button>
            {openWrapper && toCreate&&<CreateCategory/>}
        </div>
}