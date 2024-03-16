import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest,res:NextResponse) {

  const token = req.cookies.get("@mepedeAi-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

}
export const config = {
  middleware: "blocking",
  matcher: ["/","/pedidos","/cardapio", "/clientes","/financeiro","/loja"],
};
