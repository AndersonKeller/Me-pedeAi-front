"use client";
import { create_order } from "@/controller/socket.controller";
import Link from "next/link";

export function Menu() {
  function postOrder() {
    create_order({ id: 345 });
  }
  return (
    <aside className="w-max">
      <nav className="flex flex-col gap-3 py-4 px-12 pt-32 shadow-lg bg-gray-900 w-max h-screen z-0">
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
