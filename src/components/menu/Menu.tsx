import Link from "next/link";

export function Menu() {
  return (
    <aside>
      <nav className="flex flex-col gap-3 py-4 px-12 pt-32 shadow-lg bg-gray-900 w-max h-screen fixed top-0 z-0">
        <Link href="/loja">Loja</Link>
        <Link href="/cardapio">Cardápio</Link>

        <Link href="/pedidos">Pedidos</Link>
        <Link href="/clientes">Clientes</Link>
        <Link href="/financeiro">Financeiro</Link>
      </nav>
    </aside>
  );
}
