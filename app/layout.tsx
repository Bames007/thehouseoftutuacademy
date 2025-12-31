// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { italiana, gothamOffice } from "./utils/constants";
import Header from "./home/Header";
import Footer from "./home/Footer";

export const metadata: Metadata = {
  title: "The House of Tutu Perfumery Academy | Luxury Fragrance Education",
  description:
    "Nigeria's premier fragrance business school. Master commercial perfumery with industry-level knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${gothamOffice.className} ${italiana.className}   scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-black text-white antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
