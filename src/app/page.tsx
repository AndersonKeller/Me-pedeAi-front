"use client";
import { Menu } from "@/components/menu/Menu";
import { Service } from "@/controller/Api";
import { Establish } from "@/interfaces/establish.interface";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect } from "react";
export default function Home() {
  const cookies = parseCookies();
  const router = useRouter();
  const api = new Service();
  async function retriveEstablish() {
    const res: Establish | undefined = await api.establishRetrieve(
      cookies["@mepedeAi-token"]
    );
    if (!res) {
      router.push("/login");
    }
  }
  useEffect(() => {
    if (!cookies["@mepedeAi-token"]) {
      router.push("/login");
    } else {
      retriveEstablish();
    }
  });
  return (
    <>
      <Menu />
    </>
  );
}
