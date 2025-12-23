import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LangProvider } from "@/contexts/LangContext";
import { FavoriteProvider } from "@/contexts/FavoriteContext";

export const metadata: Metadata = {
  title: "Movies App",
  description: "Movies and Series App",

  manifest: "/manifest.json",

  themeColor: "#000000",

  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* iOS PWA support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Movies App" />

        {/* iOS icon */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* Fallback manifest (good practice) */}
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body className="bg-main text-main" suppressHydrationWarning>
        <FavoriteProvider>
          <AuthProvider>
            <ThemeProvider>
              <LangProvider>{children}</LangProvider>
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
