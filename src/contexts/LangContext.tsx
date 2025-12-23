"use client";

//react
import { createContext, useContext, useEffect, useState } from "react";


//types
type Lang = "en" | "ar";

type LangContextType = {
  lang: Lang;
  toggleLang: () => void;
};

//context
const LangContext = createContext<LangContextType>({
  lang: "en",
  toggleLang: () => {},
});

//provider
export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved) setLang(saved);
  }, []);

  // Toggle language between English and Arabic
  const toggleLang = () => {
    setLang((prev) => {
      const newLang = prev === "en" ? "ar" : "en";
      localStorage.setItem("lang", newLang);
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
      return newLang;
    });
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
};

// Custom hook to use LangContext
export const useLang = () => useContext(LangContext);
