"use client";
import { Menu } from "@/components/menu/Menu";
import { Service } from "@/controller/Api";
import { useEffect } from "react";

export default function Cardapio() {
  const api = new Service();
  async function getMenu() {
    const res = await api.getMenu();

    console.log(res);
  }
  useEffect(() => {
    getMenu();
  }, []);
  return (
    <>
      <Menu />
    </>
  );
}
