import { TypeProduct } from "@/interfaces/products.interface";
import { create } from "zustand";

interface CategoriesStore {
    categories: TypeProduct[],
    setCategories: (types:TypeProduct[])=>void
}
export const categoriesStore = create<CategoriesStore>()((set)=>({
    categories:[]as TypeProduct[],
    setCategories:(newCategories:TypeProduct[])=>set(()=>({
        categories:newCategories
    }))
}))