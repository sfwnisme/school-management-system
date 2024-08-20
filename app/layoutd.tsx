import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<childrenType>) {
  return (
    <html lang="en">
      <body className={inter.className + "min-h-screen mx-auto"}>
        {/* <Nav isDashboard={false} /> */}
        {children}
      </body>
    </html>
  );
}
