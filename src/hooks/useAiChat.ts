"use client";

import { useState, useCallback } from "react";
import { sendChatMessage, ChatTurn } from "@/services/aiChat.service";
import { Movie } from "@/types/movie";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  movies?: Movie[];
  loading?: boolean;
};

export default function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "مرحباً! 👋 أنا CineVerse AI. أخبرني عن مزاجك أو نوع الفيلم اللي تبيه، وراح أرشح لك أفضل ما عندنا!\n\nHello! I'm CineVerse AI. Tell me what kind of movie you're in the mood for, and I'll find the perfect match! 🎬",
      movies: [],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
      };

      const thinkingMsg: ChatMessage = {
        id: `thinking-${Date.now()}`,
        role: "assistant",
        content: "",
        loading: true,
      };

      setMessages((prev) => [...prev, userMsg, thinkingMsg]);
      setIsLoading(true);

      // Build history (exclude welcome + thinking)
      const history: ChatTurn[] = messages
        .filter((m) => !m.loading && m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      try {
        const data = await sendChatMessage(text, history);

        const assistantMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: data.reply,
          movies: data.movies ?? [],
        };

        setMessages((prev) =>
          prev.filter((m) => !m.loading).concat(assistantMsg)
        );
      } catch {
        const errorMsg: ChatMessage = {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "Something went wrong. Please try again! 🙏",
          movies: [],
        };
        setMessages((prev) =>
          prev.filter((m) => !m.loading).concat(errorMsg)
        );
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "مرحباً من جديد! 👋 أخبرني عن الفيلم اللي تبحث عنه.\n\nHello again! Tell me what movie you're looking for. 🎬",
        movies: [],
      },
    ]);
  }, []);

  return { messages, sendMessage, isLoading, clearChat };
}
