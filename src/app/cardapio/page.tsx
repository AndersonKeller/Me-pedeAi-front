import { Categories } from "@/components/menu/categories/Categories";
import { ProductList } from "@/components/product/productList/ProductList";
import { Sidebar } from "@/components/sidebar/Sidebar";

export default function Cardapio() {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col bg-gray-800 p-4 w-full h-[calc(100vh-80px)] overflow-auto">
        <Categories />
        <ProductList />
      </div>
    </>
  );
}
{
  /* <div className="flex justify-between w-[15%] flex-col bg-gray-100 h-full">
                <button className="text-gray-950">1</button>
                <button className="text-gray-950">2</button>
                <button className="text-gray-950">3</button>
                <button className="text-gray-950">4</button>
              </div> */
}
