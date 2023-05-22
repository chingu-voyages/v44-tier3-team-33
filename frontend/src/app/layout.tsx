import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Navbar from '@/components/Navbar/Navbar'

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BookMart",
  description: "Buy and sell preloved books",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="mt-[70px] md:mt-0 text-black">
            {children}  
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
