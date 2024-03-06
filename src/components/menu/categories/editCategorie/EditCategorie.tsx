import { Input } from "@/components/Input";
import { Wrapper } from "@/components/wrapper/WrapperModal";
import { Service } from "@/controller/Api";
import { UpdateTypeProduct, updateTypeProductSchema } from "@/interfaces/products.interface";
import { wrapperStore } from "@/store/wrapper.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface EditCategorieProps{
    categorie: UpdateTypeProduct
}
export function Editcategorie({categorie}:EditCategorieProps){
    const api = new Service()
    const {setOpenWrapper} = wrapperStore()
    const {
        register,
        handleSubmit,
        formState: { errors},
      } = useForm<UpdateTypeProduct>({
        resolver: zodResolver(updateTypeProductSchema),
        mode: "onChange",
       defaultValues:{
        description:categorie.description,
        name: categorie.name
       }
      });
    //   console.log(categorie)
   async function updateTypeProductHandle(data:UpdateTypeProduct){
        data.id = categorie.id
        console.log(data)
        
        const res = await api.updateTypeProducts(data.id!,data)
        console.log(res)
        toast.success("Categoria Atualizada com sucesso!")
        setTimeout(() => {
          setOpenWrapper(false)
          
        }, 1500);
    }
    
    return <Wrapper>
        <form autoComplete="off" noValidate onSubmit={handleSubmit(updateTypeProductHandle)} className="w-full flex flex-col items-center justify-center">
            <Input label="nome" placeholder="nome da categoria..." register={register("name")} errorMsg={errors.name && errors.name.message}/>
            <Input label="descrição" placeholder="descrição da categoria..." register={register("description")} errorMsg={errors.description && errors.description.message}/>
          
            <button type="submit">Salvar</button>
        </form>
    </Wrapper>
}