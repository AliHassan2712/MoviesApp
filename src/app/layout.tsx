
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LangProvider } from "@/contexts/LangContext";
import { FavoriteProvider } from "@/contexts/FavoriteContext";


export const metadata: Metadata = {
  title: "Movies App",
  description: "Browse movies, series, actors and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-main text-main" suppressHydrationWarning>
        <FavoriteProvider>
          <AuthProvider>
            <ThemeProvider>
              <LangProvider>
                {children}
              </LangProvider>
            </ThemeProvider>
          </AuthProvider>
        </FavoriteProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111",
              color: "#fff",
              border: "1px solid #333",
            },
          }}
        />
    
      </body>
    </html>
  );
}
