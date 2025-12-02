
import { Header } from "@/components/header/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Movies App",
  description: "Browse movies, series, actors and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>

        {/* WRAP WHOLE APP WITH AUTH CONTEXT */}
        <AuthProvider>
          <Header />
          {children}

          {/* TOAST CONTAINER */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1f1f1f",
                color: "#fff",
                border: "1px solid #333",
              },
            }}
          />
        </AuthProvider>

      </body>
    </html>
  );
}
