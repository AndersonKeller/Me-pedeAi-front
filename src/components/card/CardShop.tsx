"use client";
import { Service } from "@/controller/Api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function CardShop() {
  const [url, setUrl] = useState("");
  const api = new Service();
  const router = useRouter()
  async function getShop() {
    const res = await api.retrieveShop();
    console.log(res);
    if(res.url){

      setUrl(res.url);
    }else{
      router.push("/login")
    }
  }
  function copyUrl() {
    navigator.clipboard.writeText(url);
    toast.success("Url copiada com sucesso", { pauseOnHover: false });
  }
  useEffect(() => {
    getShop();
  }, []);
  return (
    <div className="flex flex-col p-4 gap-3">
      <p>Esse aqui é o link da sua loja para compartilhar com seus clientes</p>
      <p>{url}</p>
      <button onClick={copyUrl}>Copiar</button>
    </div>
  );
}
