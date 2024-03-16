
import { ClientList } from "@/components/client/clientList/ClientList";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Service } from "@/controller/Api";
import { useEffect } from "react";

export default function CLients() {
  
  return (
    <>
      <Sidebar />
      <ClientList/>
    </>
  );
}
