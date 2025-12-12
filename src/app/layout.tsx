"use client";
// import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import Script from "next/script";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LangProvider } from "@/contexts/LangContext";

// export const metadata: Metadata = {
//   title: "Movies App",
//   description: "Browse movies, series, actors and more.",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-main text-main" suppressHydrationWarning>

        {/* تحميل SDKs الخاصة بـ Google & Facebook */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <Script
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (window.FB) {
              window.FB.init({
                appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
                cookie: true,
                xfbml: false,
                version: "v19.0",
              });
            }
          }}
        />

        <AuthProvider>
          <ThemeProvider>
            <LangProvider>
            {children}
            </LangProvider>
          </ThemeProvider>
        </AuthProvider>

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
