"use client";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LangProvider } from "@/contexts/LangContext";
import { FavoriteProvider } from "@/contexts/FavoriteContext";
import { WatchlistProvider } from "@/contexts/WatchlistContext";
import ReactQueryProvider from "./ReactQueryProvider";
import AiChatWidget from "@/components/ui/AiChatWidget";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <FavoriteProvider>
          <ThemeProvider>
            <LangProvider>
              <ReactQueryProvider>
                {children}
              </ReactQueryProvider>
            </LangProvider>
          </ThemeProvider>
        </FavoriteProvider>
      </WatchlistProvider>
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
      {/* 🤖 AI Chat Widget — visible on every page */}
      <AiChatWidget />
    </AuthProvider>
  );
}

