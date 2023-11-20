"use client";
import { Service } from "@/controller/Api";
import { LoginData, loginSchema } from "@/interfaces/login.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./Input";

export function LoginForm() {
  const api = new Service();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  async function loginHandle(data: LoginData) {
    const res = await api.establishLogin(data);
    console.log(res);
  }
  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(loginHandle)}>
      <Input
        register={register("email")}
        label="email"
        placeholder="digite seu email aqui..."
        errorMsg={errors.email && errors.email.message}
      />
      <Input
        register={register("password")}
        label="senha"
        placeholder="digite sua senha..."
        errorMsg={errors.password && errors.password.message}
      />
      <button type="submit">Login</button>
    </form>
  );
}
