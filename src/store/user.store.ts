import { setCookie } from "nookies";
import { create } from "zustand";
interface UserStore {
  token: string;
  setToken: (newToken: string) => void;
}

export const userStore = create<UserStore>()((set) => ({
  token: "",
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
