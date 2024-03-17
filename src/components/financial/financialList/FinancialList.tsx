"use client"
import { Service } from "@/controller/Api"
import { iFinancial } from "@/interfaces/financial.interface"
import moment from "moment"
import { useEffect, useState } from "react"
import { FinancialNow } from "../financialNow/FinancialNow"

export function FinancialList(){
    const [financial,setFinancial] = useState([] as iFinancial)
    const api = new Service()
    async function getFinancial(){
        const res: iFinancial = await api.getFinancial()
       
        setFinancial(res)
    }
    useEffect(()=>{
        getFinancial()
    },[])
    return <div>
        
        {financial && <FinancialNow financials={financial}/>}
    </div>
}