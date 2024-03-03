import { wrapperStore } from "@/store/wrapper.store"
import React from "react"

interface WrapperProps {
    children: React.ReactNode
}
export function Wrapper({children}:WrapperProps){
    const {setOpenWrapper,openWrapper} = wrapperStore()
   
    return openWrapper&&<div id="wrapper" className="bg-[rgba(0,0,0,0.5)] fixed z-10 left-0 top-0 w-full h-screen flex items-center justify-center">
        <div className="rounded-xl p-2 pt-4 bg-gray-100 min-w-[320px] flex flex-col gap-3 relative shadow-lg shadow-gray-800">
   <button className="absolute top-2 right-2 text-gray-900" onClick={()=>setOpenWrapper(false)}>X</button>
        {children}
        </div>
    </div>
}