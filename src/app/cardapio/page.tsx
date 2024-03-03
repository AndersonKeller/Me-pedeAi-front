"use client";
import { Categories } from "@/components/menu/categories/Categories";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Service } from "@/controller/Api";
import { iMenu } from "@/interfaces/menu.interface";
import { useEffect, useState } from "react";

export default function Cardapio() {
  const [menu, setMenu] = useState({} as iMenu);
  const api = new Service();
  async function getMenu() {
    const res = await api.getMenu();
    console.log(res)
    if (res) {
      setMenu(res);
    }
  }
  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <Sidebar />
      <ul className="w-full h-[calc(100vh-80px)] overflow-auto bg-gray-800 p-4">
          <Categories/>
        <div className="flex flex-wrap justify-start gap-3">
        {menu.id &&
          menu.product.map((item) => {
            return <li className="relative overflow-hidden w-[19%] min-w-[180px] p-2 rounded-lg shadow-md shadow-gray-400 cursor-pointer hover:scale-105 transition-all bg-gray-400" key={item.id}>
              <p>{item.type.name}</p>
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>R$ {item.price.toFixed(2)}</p>
              <div className="flex justify-between w-[15%] flex-col bg-gray-100 absolute right-0 top-0 h-full">
                <button className="text-gray-950">1</button>
                <button className="text-gray-950">2</button>
                <button className="text-gray-950">3</button>
                <button className="text-gray-950">4</button>
              </div>
            </li>
           
          })}
          </div>
      </ul>
    </>
  );
}
