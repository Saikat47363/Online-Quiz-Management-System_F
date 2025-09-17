/*
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Online QUIZ",
  description: "Next.js App with login, register, and dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}*/

import './globals.css';
import { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
 
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
<html lang="en">
<body className="bg-gray-100 text-gray-900">
<Header />
<main className="container mx-auto p-4">{children}</main>
<Footer />
</body>
</html>
  );
}

