"use client";
import { Service } from "@/controller/Api";
import { LoginData, loginSchema } from "@/interfaces/login.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "./Input";
export function LoginForm() {
  const api = new Service();
  const router = useRouter();
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

    if (res) {
      toast("Login efetuado com sucesso!", { type: "success" });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      toast("Algo deu errado, verifique email e senha", { type: "error" });
    }
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
