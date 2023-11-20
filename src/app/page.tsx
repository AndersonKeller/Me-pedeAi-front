"use client";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect } from "react";
export default function Home() {
  const cookies = parseCookies();
  const router = useRouter();
  useEffect(() => {
    if (!cookies["@mepedeAi-token"]) {
      router.push("/login");
    }
  });
  return (
    <main>
      <h1>Me pede ai</h1>
    </main>
  );
}
