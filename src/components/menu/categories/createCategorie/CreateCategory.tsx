import { Input } from "@/components/Input";
import { Wrapper } from "@/components/wrapper/WrapperModal";
import { Service } from "@/controller/Api";
import { CreateTypeProduct, TypeProduct, createTypeProductSchema } from "@/interfaces/products.interface";
import { wrapperStore } from "@/store/wrapper.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function CreateCategory(){
    const api = new Service()
    const {setOpenWrapper} = wrapperStore()
    const {
        register,
        handleSubmit,
        formState: { errors},
      } = useForm<CreateTypeProduct>({
        resolver: zodResolver(createTypeProductSchema),
        mode: "onChange",
      });
      async function createTypeProductHandle(data:CreateTypeProduct){
        console.log(data)
        const res = await api.createTypeProduct(data)
        console.log(res)
        toast.success("Categoria criada com sucesso!")
        setTimeout(() => {
          setOpenWrapper(false)
          
        }, 1500);
      }
      
    return <Wrapper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit(createTypeProductHandle)} className="w-full flex flex-col items-center justify-center">
            <Input label="nome" placeholder="nome da categoria..." register={register("name")} errorMsg={errors.name && errors.name.message}/>
            <Input label="descrição" placeholder="descrição da categoria..." register={register("description")} errorMsg={errors.description && errors.description.message}/>
            
            <button type="submit">Salvar</button>
        </form>
        </Wrapper>
}