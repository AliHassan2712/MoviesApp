import { Header } from "@/components/header/Header";
import "./globals.css";
import type { Metadata } from "next";
import { FavoriteProvider } from "../contexts/FavoriteContext";

export const metadata: Metadata = {
  title: "Movies App",
  description: "Browse movies, series, actors and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <FavoriteProvider>
          <Header />

          {children}
        </FavoriteProvider>
      </body>
    </html>
  );
}
