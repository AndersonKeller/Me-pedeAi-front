"use client"
import { Service } from "@/controller/Api";
import { iMenu } from "@/interfaces/menu.interface";
import { useState, useEffect } from "react";
import { ProductDetail } from "../productDetail/ProductDetail";
import { Product } from "@/interfaces/products.interface";
import { wrapperStore } from "@/store/wrapper.store";
import { CreateProduct } from "../createProduct/CreateProduct";
interface ProductListByType {
    id:string,
    name:string,
    products: Product[]
  }
export function ProductList(){
    const [menu, setMenu] = useState({} as iMenu);
    const [toCreate,setToCreate]=useState(false)
    const [ordersByType,setOrdersByType] = useState([]as ProductListByType[])
    const api = new Service();
    const {openWrapper,setOpenWrapper} = wrapperStore()
    const [detailproduct,setDetailProduct] = useState({}as Product | null)
    
    function openProductWrapper(prod:Product){
      console.log(prod)
      setDetailProduct(prod)
      setOpenWrapper(true)
    }
    async function getMenu() {
        const res:iMenu = await api.getMenu();
        let result:ProductListByType[] = []
        if (res) {
        res.product.forEach((item)=>{
          console.log(item)
          const findType = result.find((res)=>String(item.type.name) === String(res.name))
          if(!findType){
            result.push({id:String(item.id),name:item.type.name,products:[item]})
          }else{
            const findIndex = result.findIndex((res)=>res===findType)
            findIndex>=0&& result[findIndex].products.push(item)
          }
        })
        console.log(result)
          setOrdersByType(result)
          setMenu(res);
        }
      }
      function openCreate(){
        setToCreate(!toCreate)
        setDetailProduct(null)
        setOpenWrapper(true)
      }
      useEffect(() => {
        getMenu();
      }, []);
      useEffect(()=>{
        if(!openWrapper){
            setDetailProduct(null)
            setToCreate(false)
        }
        getMenu()
      },[openWrapper])
    return <ul>
        <p className="w-full">Produtos:</p>
          <button onClick={()=>openCreate()} className="text-sm text-gray-200 bg-green-700 my-2">Criar</button>
        <div className="flex flex-wrap justify-start gap-3 w-full">
        {menu.id &&
          ordersByType.map((item,index) => {
              return  <li className="h-full flex flex-col justify-between w-[30%] min-w-[180px] " key={index}>
                <p>{item.name}</p>
              <div className="w-full bg-gray-400 shadow-gray-400 shadow-md overflow-hidden rounded-lg">{item.products.map((prod)=>{
                return <div className="group justify-between p-2 px-4 flex items-center hover:scale-105 transition-all hover:bg-[rgba(0,0,0,0.2)]" key={prod.id}>
                    <p>{prod.name}</p>
                    <button onClick={()=>openProductWrapper(prod)} className="group-hover:bg-red-300 cursor-pointer">Detalhes</button>
                  </div>
              })}</div>  
            </li>
            })
          }
          </div>
          {openWrapper && detailproduct?.id &&<ProductDetail product={detailproduct}/>}
          {openWrapper && toCreate && !detailproduct && <CreateProduct/>}
      </ul>
}