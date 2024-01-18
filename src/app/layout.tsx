import { Header } from "@/components/header/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Me pedeAi",
  description: "Seu pedido está aqui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          pauseOnHover={false}
          // transition={}
          theme="dark"
        />{" "}
        <Header />
        <main className="w-full my-0 mx-auto flex">{children}</main>
      </body>
    </html>
  );
}
