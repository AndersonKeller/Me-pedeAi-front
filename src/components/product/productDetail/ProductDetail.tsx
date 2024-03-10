import { Product, UpdateProduct, updateProductSchema } from "@/interfaces/products.interface"
import { Wrapper } from "../../wrapper/WrapperModal"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../Input";
import { useState } from "react";
import { categoriesStore } from "@/store/categories";
import { Service } from "@/controller/Api";
import { toast } from "react-toastify";

interface ProductDetailProps{
    product:Product
}
export function ProductDetail({product}:ProductDetailProps){
    const api = new Service()
    const [toEdit, setToEdit] = useState(false)
    const {categories} = categoriesStore()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors},
      } = useForm<UpdateProduct>({
        resolver: zodResolver(updateProductSchema),
        mode: "onChange",
       defaultValues:{
        id: product.id,
        description:product.description,
        name: product.name,
        price:String(product.price),
        typeProduct:product.typeProduct||product.type.name,
        quantity:String(product.quantity)
       }
      });
      async function updateProductHandle(data:UpdateProduct){
        data.price = +data.price!
        const id: number = +data.id!  
        const res= await api.updateProduct(id,data)
        if(res){
          toast.success("Produto Atualizado com sucesso!")
          setToEdit(false)
        }
      }
      function toggleEdit(){
        setToEdit(!toEdit)
        reset()
      }
    const inputClass = `${!toEdit?'border-2 border-accent':''} h-7`
    return <Wrapper>
        <button type="button" className={`${!toEdit?"bg-green-800":"bg-green-900"} mt-4`} onClick={()=>toggleEdit()}>{!toEdit?"Editar":"Cancelar"}</button>
       <form noValidate onSubmit={handleSubmit(updateProductHandle)} >
        <Input className={inputClass} readOnly={!toEdit} label="nome" placeholder="nome do produto..." register={register("name")} errorMsg={errors.name && errors.name.message}/>
        <Input className={inputClass} readOnly={!toEdit} label="Descrição" placeholder="" register={register("description")} errorMsg={errors.description && errors.description.message}/>
        <label htmlFor="" className="text-gray-900 capitalize text-sm">Categoria:</label>
        <select disabled={!toEdit} {...register("typeProduct")} className={`w-full text-gray-900 focus-within:bg-gray-200 outline-none ${inputClass}`}>
            <option value="" disabled>Selecione uma categoria</option>
            {categories.map((cat)=>{
              // console.log(errors)
                return <option key={cat.id} value={cat.name} className="text-gray-800">{cat.name}</option>
            })}
        </select>
        {errors.type&&<span className="text-red-500 lowercase">{errors.type.message}</span>}
        <Input className={inputClass} type="number" label="Preço" placeholder="Preço..." register={register("price")} errorMsg={errors.price && errors.price.message}/>
        <Input className={inputClass} label="Quantidade/Tamanho/Unidade" placeholder="Descreva" register={register("quantity")} errorMsg={errors.quantity && errors.quantity.message}/>
        <button className="disabled:text-gray-400 disabled:bg-red-100 text-gray-800 bg-red-400" disabled={!toEdit} type="submit">Salvar</button>
       </form>
    </Wrapper>
}