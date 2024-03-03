import { Wrapper } from "@/components/wrapper/WrapperModal";
import { UpdateTypeProduct } from "@/interfaces/products.interface";

interface EditCategorieProps{
    categorie: UpdateTypeProduct
}
export function Editcategorie({categorie}:EditCategorieProps){
    return <Wrapper><div>{categorie.name}</div></Wrapper>
}