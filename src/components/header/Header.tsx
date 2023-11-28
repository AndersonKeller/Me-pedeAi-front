import Link from "next/link";
import { EstablishInfo } from "./EstablishInfo";

export function Header() {
  return (
    <header className="p-4 px-12 relative top-0 z-10 bg-gray-950">
      <Link href="/">
        {" "}
        <h1>Me pede Ai</h1>
      </Link>
      <EstablishInfo />
    </header>
  );
}
