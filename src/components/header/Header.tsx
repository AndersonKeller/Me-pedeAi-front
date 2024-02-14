import Link from "next/link";
import { EstablishInfo } from "./EstablishInfo";

export function Header() {
  return (
    <header className="p-4 px-12 fixed w-full top-0 z-10 bg-gray-950 h-20">
      <Link href="/">
        {" "}
        <h1>Me pede Ai</h1>
      </Link>
      <EstablishInfo />
    </header>
  );
}
