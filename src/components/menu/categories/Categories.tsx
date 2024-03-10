"use client"
import { Service } from "@/controller/Api"
import { useEffect, useState } from "react"
import { parseCookies } from "nookies";
import { TypeProduct } from "@/interfaces/products.interface";
import { Editcategorie } from "./editCategorie/EditCategorie";
import { wrapperStore } from "@/store/wrapper.store";
import { CreateCategory } from "./createCategorie/CreateCategory"
import { PencilLine } from "lucide-react";
import { categoriesStore } from "@/store/categories";

export function Categories(){
    const cookies = parseCookies();
    const api = new Service()
    
    const {categories,setCategories} = categoriesStore()
    const [toCreate,setToCreate] = useState(false)
    const {openWrapper,setOpenWrapper} = wrapperStore()
    const [selectcategorie,setselectedCategorie] = useState({}as TypeProduct| null)
    async function getCategories(){
        const res = await api.getTypeProducts(cookies["@mepedeAi-token"])
        // console.log(res)
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
        <button onClick={()=>openCreate()} className="text-sm text-gray-200 bg-green-700 my-2">Criar</button>
        <div className="flex gap-2 pb-2">
            {categories&&categories.map((categorie)=>{
            return <div className="items-center px-2 py-1 w-[200px] rounded-md flex flex-col gap-2 shadow-lg bg-gray-200" key={categorie.id}>
                <p className="text-cyan-900 font-semibold underline">{categorie.name}</p>
                <p className="text-xs text-gray-900 overflow-clip">
                    {categorie.description}
                </p>
                <button onClick={()=>openEdit(categorie)} className="text-xs text-gray-200 bg-cyan-700 flex items-center gap-2">
                    <PencilLine size={20}/> Editar
                </button>
                   {openWrapper && selectcategorie?.id && <Editcategorie  categorie={selectcategorie}/>}
                </div>
            })}
            </div>
            
            {openWrapper && toCreate&&<CreateCategory/>}
        </div>
}