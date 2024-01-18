import { toast } from "react-toastify";
import { io } from "socket.io-client";
export const socket = io("http://localhost:3131");
socket.on("update_orders", (info) => {
  console.log(info);
  toast.info("Novo pedido acabou de chegar", { pauseOnHover: false });
});
export const create_order = (info: any) => {
  socket.emit("create_order", {
    ...info,
  });
};
export const update_orders = (info: any) => {};
