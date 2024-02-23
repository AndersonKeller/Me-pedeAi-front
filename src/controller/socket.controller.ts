
import { io } from "socket.io-client";


export const socket = io("http://localhost:3131");

export const createConnect=(info:any)=>{
  socket.on("connect",()=>{
    console.log(socket.id)
    socket.emit("my_id_info",info)
    socket.on("disconnect",()=>{
      console.log("sefoi")
    })
  })
}


export const create_order = (info: any) => {
  
  socket.emit("create_order", {
    ...info,
  });
};

