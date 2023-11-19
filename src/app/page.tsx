"use client";

import { Service } from "@/controller/Api";
import {
  CreateEstablish,
  Establish,
  createEstablishSchema,
} from "@/interfaces/establish.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Home() {
  const api = new Service();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEstablish>({
    resolver: zodResolver(createEstablishSchema),

    mode: "onChange",
  });
  async function handleLogin(data: CreateEstablish) {
    const res: Establish = await api.establishRetrieve(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInR5cGUiOiJlc3RhYmxpc2giLCJpYXQiOjE3MDA0MzY3OTQsImV4cCI6MTcwMDUyMzE5NCwic3ViIjoiNGM4Njg5MDItNDM1Yi00NzAxLTg1YzQtNmU1MDM4MzhiZGNiIn0.UKlxdnFo_sTwnpWuCupdWoUjVDAkVuNHWdsPgZpCEYk"
    );
    console.log(res);
  }
  return (
    <main>
      <form
        noValidate
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-2 items-center"
      >
        <input type="text" {...register("email")} className="text-blue-800" />
        <input
          type="password"
          {...register("password")}
          className="text-blue-800"
        />
        <input type="text" {...register("name")} className="text-blue-800" />
        <input type="text" {...register("phone")} className="text-blue-800" />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
