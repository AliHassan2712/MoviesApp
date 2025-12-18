"use client";

import { useState } from "react";

import { useTheme } from "@/contexts/ThemeContext";
import { useLang } from "@/contexts/LangContext";

import { Globe, Moon, Bell } from "lucide-react";
import SettingItem from "./components/SettingItem";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();

  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen pt-11 px-6 max-w-3xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted mt-2">
          Customize your app experience
        </p>
      </div>

      <SettingItem
        icon={<Moon size={20} className="text-primary" />}
        title="Theme"
        description="Choose light or dark mode"
        action={
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-main border border-main rounded-lg"
          >
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </button>
        }
      />

      <SettingItem
        icon={<Globe size={20} className="text-primary" />}
        title="Language"
        description="Select your preferred language"
        action={
          <button
            onClick={toggleLang}
            className="px-4 py-2 bg-main border border-main rounded-lg"
          >
            {lang === "en" ? "English" : "العربية"}
          </button>
        }
      />

      <SettingItem
        icon={<Bell size={20} className="text-primary" />}
        title="Notifications"
        description="Push update preferences"
        action={
          <button
            onClick={() => setNotifications(!notifications)}
            className="px-4 py-2 bg-main border border-main rounded-lg"
          >
            {notifications ? "Enabled" : "Disabled"}
          </button>
        }
      />
    </div>
  );
}
