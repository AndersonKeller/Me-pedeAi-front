"use client";
import { userStore } from "@/store/user.store";

export function EstablishInfo() {
  const { establish } = userStore();
  return <div>{establish && <p>{establish.name}</p>}</div>;
}
