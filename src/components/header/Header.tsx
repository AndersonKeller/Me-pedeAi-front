import Link from "next/link";
import { EstablishInfo } from "./EstablishInfo";

export function Header() {
  return (
    <header className="p-4">
      <Link href="/">
        {" "}
        <h1>Me pede Ai</h1>
      </Link>
      <EstablishInfo />
    </header>
  );
}
