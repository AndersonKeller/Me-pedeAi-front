import { create } from "zustand"

interface WrapperController{
    openWrapper: boolean,
    setOpenWrapper: (value:boolean)=>void
}
export const wrapperStore = create<WrapperController>()((set)=>({
    openWrapper: false,
    setOpenWrapper:(newValue:boolean)=>
    set(()=>(
        {openWrapper:newValue}
    ))
}))