"use client";
import {  createConnect, create_order } from "@/controller/socket.controller";
import { userStore } from "@/store/user.store";
import Link from "next/link";

export function Menu() {
  const {establish} = userStore()
  function postOrder() {
    createConnect(establish)
    create_order({ id: 345 });
  }
  return (
    <aside className="w-max">
      <nav className="flex flex-col gap-3 py-4 px-12 pt-32 shadow-lg bg-gray-900 w-max h-[calc(100vh-80px)] z-0">
        <Link href="/loja">Loja</Link>
        <Link href="/cardapio">Cardápio</Link>

        <Link href="/pedidos">Pedidos</Link>
        <button onClick={postOrder}>Pedir</button>
        <Link href="/clientes">Clientes</Link>
        <Link href="/financeiro">Financeiro</Link>
      </nav>
    </aside>
  );
}
