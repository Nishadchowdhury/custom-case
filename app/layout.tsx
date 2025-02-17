import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import "./custom.css";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Providers/Provider";
import { constructMetadata } from "../lib/utils";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Navbar />

        <main className="grainy-light flex flex-col min-h-[calc(100vh-3.5rem-1px)] " >
          <div className="flex flex-1 flex-col h-full bg-gray-900 " >

            <Provider>
              {children}
            </Provider>

          </div>
          <Footer />
        </main>

        <Toaster />

      </body>
    </html>
  );
}
