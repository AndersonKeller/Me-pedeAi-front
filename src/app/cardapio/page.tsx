"use client";
import { Menu } from "@/components/menu/Menu";
import { Service } from "@/controller/Api";
import { iMenu } from "@/interfaces/menu.interface";
import { useEffect, useState } from "react";

export default function Cardapio() {
  const [menu, setMenu] = useState({} as iMenu);
  const api = new Service();
  async function getMenu() {
    const res = await api.getMenu();
    if (res) {
      setMenu(res);
    }
  }
  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <Menu />
      <ul className="w-full bg-gray-800 p-4 flex flex-wrap gap-4">
        {menu.id &&
          menu.product.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
      </ul>
    </>
  );
}
