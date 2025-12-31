"use client";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LangProvider } from "@/contexts/LangContext";
import { FavoriteProvider } from "@/contexts/FavoriteContext";
import ReactQueryProvider from "./ReactQueryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FavoriteProvider>
      <AuthProvider>
        <ThemeProvider>
          <LangProvider>
            <ReactQueryProvider>

            {children}
            </ReactQueryProvider>
            
            </LangProvider>
        </ThemeProvider>

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
      </AuthProvider>
    </FavoriteProvider>
  );
}
