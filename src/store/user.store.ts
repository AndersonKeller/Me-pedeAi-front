import { Establish } from "@/interfaces/establish.interface";
import { parseCookies, setCookie } from "nookies";
import { create } from "zustand";
interface UserStore {
  token: string;
  setToken: (newToken: string) => void;
  establish?: Establish;
  setEstablish: (newEstablish: Establish) => void;
}
const cookies = parseCookies();
export const userStore = create<UserStore>()((set) => ({
  token: cookies["@mepedeAi-token"] ?? "",
  establish: cookies["@mepedeAi-establish"]
    ? JSON.parse(cookies["@mepedeAi-establish"])
    : ({} as Establish),
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
