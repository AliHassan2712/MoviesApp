"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, Play, Film } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type NotificationItem = {
  id: string;
  text: string;
  type: "movies" | "series";
  createdAt: string;
};

type NotificationsMenuProps = {
  isLoggedIn: boolean;
  desktopOnly?: boolean;
  isMobile?: boolean;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function NotificationsMenu({
  isLoggedIn,
  desktopOnly = false,
  isMobile = false,
  isOpen,
  setIsOpen,
}: NotificationsMenuProps) {
  const { user, setUser } = useAuth();
  const [closing, setClosing] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setIsOpen(false);
    }, 160);
  };

  // Fetch notifications from the backend database notifications route
  useEffect(() => {
    if (!isLoggedIn) return;

    async function fetchNotificationsList() {
      try {
        const res = await fetch(`${API_URL}/notifications?limit=6`, {
          credentials: "include", // vital for auth session cookie
        });
        const json = await res.json();

        if (json?.data) {
          const list = json.data.map((n: any) => ({
            id: n.refId,
            text: n.message,
            type: n.type === "movie" ? ("movies" as const) : ("series" as const),
            createdAt: n.createdAt,
          }));

          setNotifications(list);

          // Calculate unread count using the backend user.lastReadNotifications timestamp
          const lastReadTime = user?.lastReadNotifications
            ? new Date(user.lastReadNotifications).getTime()
            : 0;

          const unread = list.filter(
            (n: any) => new Date(n.createdAt).getTime() > lastReadTime
          ).length;

          setUnreadCount(unread);
        }
      } catch (e) {
        console.error("Failed to load notifications:", e);
      }
    }

    fetchNotificationsList();
    const interval = setInterval(fetchNotificationsList, 120000);
    return () => clearInterval(interval);
  }, [isLoggedIn, user?.lastReadNotifications]);

  // Sync opening the menu: Mark notifications as read on the backend API database
  useEffect(() => {
    if (isOpen && isLoggedIn && user) {
      const nowStr = new Date().toISOString();
      
      // Update UI count immediately
      setUnreadCount(0);

      // Save to database
      fetch(`${API_URL}/users/update-me`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lastReadNotifications: nowStr }),
      })
        .then((res) => res.json())
        .then((json) => {
          const updatedUser = json.data?.user ?? json.user ?? json.data;
          if (updatedUser) {
            setUser((curr) => (curr ? { ...curr, ...updatedUser } : null));
          } else {
            setUser((curr) => (curr ? { ...curr, lastReadNotifications: nowStr } : null));
          }
        })
        .catch((e) => {
          console.error("Failed to save read notifications status to server:", e);
        });
    }
  }, [isOpen, isLoggedIn, setUser]);

  if (!isLoggedIn) return null;

  const panelAnimation = closing ? "animate-dropdown-close" : "animate-dropdown-open";

  return (
    <div
      ref={ref}
      className={`
        dropdown relative
        ${desktopOnly ? "hidden md:inline-block" : ""}
        ${isMobile ? "inline-block md:hidden" : ""}
      `}
    >
      {/* Bell Icon */}
      <button
        onClick={() => {
          if (isOpen) closeMenu();
          else setIsOpen(true);
        }}
        className="relative text-main hover:text-primary transition flex items-center justify-center"
      >
        <Bell size={22} />

        {/* Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-xs text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          className={`
            dropdown absolute right-0 mt-2
            ${isMobile ? "w-64" : "w-72 mt-3"}
            bg-card border border-main rounded-xl shadow-xl p-3 z-50
            ${panelAnimation}
          `}
        >
          <p className="text-main font-semibold pb-2 border-b border-main">
            Latest Releases
          </p>

          <div className="max-h-72 overflow-y-auto mt-2 space-y-1">
            {notifications.length === 0 ? (
              <p className="text-muted text-xs text-center py-4">No new releases yet</p>
            ) : (
              notifications.map((n) => (
                <Link
                  key={`${n.type}-${n.id}`}
                  href={`/${n.type}/${n.id}`}
                  onClick={closeMenu}
                  className="flex items-center gap-3 p-2 hover:bg-soft rounded-lg transition cursor-pointer text-left w-full"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {n.type === "movies" ? <Film size={16} /> : <Play size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-main text-sm truncate font-medium">{n.text}</p>
                    <p className="text-muted text-xs mt-0.5">
                      {new Date(n.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
