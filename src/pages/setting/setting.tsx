"use client";

// React
import { useState } from "react";

//contexts
import { useTheme } from "@/contexts/ThemeContext";
import { useLang } from "@/contexts/LangContext";

// react icons
import { Globe, Moon, Bell } from "lucide-react";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();

  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen pt-11 px-6 max-w-3xl mx-auto space-y-12">

      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted mt-2">Customize your app experience</p>
      </div>

      {/* THEME */}
      <div className="bg-card border border-main rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Moon size={20} className="text-primary" /> Theme
            </h2>
            <p className="text-muted text-sm">Choose light or dark mode</p>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-main border border-main rounded-lg"
          >
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>

      {/* LANGUAGE */}
      <div className="bg-card border border-main rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Globe size={20} className="text-primary" /> Language
            </h2>
            <p className="text-muted text-sm">Select your preferred language</p>
          </div>

          <button
            onClick={toggleLang}
            className="px-4 py-2 bg-main border border-main rounded-lg"
          >
            {lang === "en" ? "English" : "العربية"}
          </button>
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-card border border-main rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Bell size={20} className="text-primary" /> Notifications
            </h2>
            <p className="text-muted text-sm">Push update preferences</p>
          </div>

          <button
            onClick={() => setNotifications(!notifications)}
            className="px-4 py-2 bg-main border border-main rounded-lg"
          >
            {notifications ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

    </div>
  );
}
