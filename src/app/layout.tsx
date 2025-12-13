import { Header } from "@/components/header/Header";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies App",
  description: "Browse movies, series, actors and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Header />
        {children}
      </body>
    </html>
  );
}
