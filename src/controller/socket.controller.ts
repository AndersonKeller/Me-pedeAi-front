import { ordersStore } from "@/store/orders.store";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Service } from "./Api";

export const socket = io("http://localhost:3131");

// socket.on("update_orders", async (info) => {
//   toast.info("Novo pedido acabou de chegar", { pauseOnHover: false });
 
// });
export const create_order = (info: any) => {
  socket.emit("create_order", {
    ...info,
  });
};

