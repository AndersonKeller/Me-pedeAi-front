"use client";
import { userStore } from "@/store/user.store";
import { useEffect, useState } from "react";

export function EstablishInfo() {
  const [name, setName] = useState("");
  const { establish } = userStore();
  useEffect(() => {
    establish?.name && setName(establish?.name);
  }, [establish]);
  return <div>{name && <p>{name}</p>}</div>;
}
