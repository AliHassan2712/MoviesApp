"use client";

// React
import { useState, useRef } from "react";

// react icons
import { Bell, Play, Star, AlertCircle, UserCheck } from "lucide-react";


type NotificationsMenuProps ={
  isLoggedIn: boolean;
  desktopOnly?: boolean;
  isMobile?: boolean;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export default function NotificationsMenu({
  isLoggedIn,
  desktopOnly = false,
  isMobile = false,
  isOpen,
  setIsOpen,
}: NotificationsMenuProps) {

  const [closing, setClosing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  if (!isLoggedIn) return null;

  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setIsOpen(false);
    }, 160);
  };

  // Dummy notifications data
  const notifications = [
    { id: 1, text: "New episode for Breaking Bad", icon: <Play size={18} className="text-primary" /> },
    { id: 2, text: "Recommended: The Witcher", icon: <Star size={18} className="text-yellow-400" /> },
    { id: 3, text: "System maintenance tonight", icon: <AlertCircle size={18} className="text-red-500" /> },
    { id: 4, text: "Your password was updated", icon: <UserCheck size={18} className="text-green-400" /> },
  ];

  const panelAnimation = closing ? "animate-dropdown-close" : "animate-dropdown-open";

  return (
    <div
      ref={ref}
      className={`
        dropdown relative 
        ${desktopOnly ? "hidden md:block" : ""}
        ${isMobile ? "block md:hidden" : ""}
      `}
    >
      {/* Icon */}
      <button
        onClick={() => {
          if (isOpen) closeMenu();
          else setIsOpen(true);
        }}
        className="relative text-main hover:text-primary transition"
      >
        <Bell size={22} />

        <span className="absolute -top-1 -right-1 bg-red-600  text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {notifications.length}
        </span>
      </button>

      {/* DROPDOWN (BOTH TARGETS USE SAME LOGIC) */}
      {isOpen && (
        <div
          className={`dropdown absolute right-0 mt-2 ${
            isMobile ? "w-64" : "w-72 mt-3"
          } bg-card border border-main rounded-xl shadow-xl p-3 z-50 ${panelAnimation}`}
        >
          <p className="text-main font-semibold pb-2 border-b border-main">Notifications</p>

          <div className="max-h-72 overflow-y-auto mt-2">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={closeMenu}
                className="flex items-center gap-3 py-2 hover:bg-soft rounded-lg transition cursor-pointer"
              >
                {n.icon}
                <span className="text-main text-sm">{n.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
