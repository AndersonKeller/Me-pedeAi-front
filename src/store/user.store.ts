import { Establish } from "@/interfaces/establish.interface";
import { setCookie } from "nookies";
import { create } from "zustand";
interface UserStore {
  token: string;
  setToken: (newToken: string) => void;
  establish?: Establish;
  setEstablish: (newEstablish: Establish) => void;
}

export const userStore = create<UserStore>()((set) => ({
  token: "",
  establish: {} as Establish,
  setEstablish: (newEstablish: Establish) =>
    set(
      () => (
        setCookie(null, "@mepedeAi-establish", JSON.stringify(newEstablish), {
          maxAge: 24 * 60 * 60,
          path: "/",
        }),
        { establish: newEstablish }
      )
    ),
  setToken: (newToken: string) =>
    set(
      () => (
        setCookie(null, "@mepedeAi-token", newToken, {
          maxAge: 24 * 60 * 60,
          path: "/",
        }),
        { token: newToken }
      )
    ),
}));
