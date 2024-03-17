import { iFinancial } from "@/interfaces/financial.interface";
import moment from "moment";

interface FinancialNowProps {
  financials: iFinancial;
}
export function FinancialNow({ financials }: FinancialNowProps) {
  const now = moment().format("DD/MM/YYYY");
  const filterByDay = financials.filter((fin) => fin.createdAt === now);
  const total = filterByDay.reduce((prev,next)=>{
    return prev + next.total
  },0)
  return (
    <div>
      <p>Pedidos de hoje: {now}</p>
        <p>Total: R$ {total}</p>
    </div>
  );
}
