import Navbar from "@/components/Navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import "@uploadthing/react/styles.css";
import { Inter } from "next/font/google";

import Modal from "../components/Modal";
import "./globals.css";
import Providers from "../components/utils/query/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book Mart",
  description: "Book Mart app",
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
          <Providers>
            <Navbar />
            <main className="mt-[70px] flex min-h-screen flex-col items-center justify-start  gap-5 px-2 py-3 text-black md:mt-0">
              {children}
            </main>
            <Modal />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
