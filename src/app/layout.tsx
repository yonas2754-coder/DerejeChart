import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "../componets/providers";
import "./globals.css";

import { SessionProvider } from "@/componets/SessionProvider";

import QueryProvider from "@/componets/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FSAS&S Section",
  description: "FSAS&S Section Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            suppressHydrationWarning={true}
      >
        <div >
         <QueryProvider>  
        <SessionProvider>
        <Providers>
     
        {children}
    
         </Providers>
         </SessionProvider>
         </QueryProvider>
         </div>
      </body>
    </html>
  );
}
