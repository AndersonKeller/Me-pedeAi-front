"use client";
import { Header } from "@/components/header/Header";
import { Menu } from "@/components/menu/Menu";
import { Service } from "@/controller/Api";

export default function Cardapio() {
  const api = new Service();
  async function getMenu() {
    const res = await api.getMenu();

    console.log(res);
  }
  getMenu();
  return (
    <>
      <Header />
      <Menu />
    </>
  );
}
