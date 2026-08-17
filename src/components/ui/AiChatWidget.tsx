"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  Bot,
  Star,
} from "lucide-react";
import useAiChat from "@/hooks/useAiChat";
import { PATHS } from "@/constant/PATHS";

/* ─── Typing Dots ─── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1 px-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
        />
      ))}
    </div>
  );
}

/* ─── Mini Movie Card inside chat ─── */
function ChatMovieCard({ movie }: { movie: any }) {
  return (
    <Link
      href={PATHS.MOVIE_DETAILS(movie._id)}
      className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2 transition-colors duration-200 group"
    >
      <div className="relative w-10 h-14 shrink-0 rounded overflow-hidden">
        <Image
          src={movie.poster || "/assets/images/img_hero.jpg"}
          alt={movie.name}
          fill
          className="object-cover"
          sizes="40px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-semibold line-clamp-1 group-hover:text-primary transition-colors">
          {movie.name}
        </p>
        {movie.releaseYear && (
          <p className="text-white/40 text-[10px] mt-0.5">{movie.releaseYear}</p>
        )}
        {movie.rating != null && (
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={9} className="text-amber-400" fill="currentColor" />
            <span className="text-white/50 text-[10px]">
              {Number(movie.rating).toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

/* ─── Main Widget ─── */
export default function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, sendMessage, isLoading, clearChat } = useAiChat();

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI Chat"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300
          bg-primary hover:bg-[#b20710] active:scale-95
          ${open ? "scale-90 opacity-0 pointer-events-none" : "scale-100 opacity-100"}
        `}
        style={{ boxShadow: "0 0 24px rgba(229,9,20,0.5)" }}
      >
        <Sparkles size={22} className="text-white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30" />
      </button>

      {/* ── Chat Panel ── */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex flex-col w-[360px] max-w-[calc(100vw-24px)]
          rounded-2xl overflow-hidden border border-white/10
          bg-[#111111] shadow-2xl
          transition-all duration-300 origin-bottom-right
          ${open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
          }`}
        style={{
          height: "520px",
          boxShadow: "0 8px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/8 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Bot size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-none">CineVerse AI</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-[10px]">Online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Clear chat */}
            <button
              onClick={clearChat}
              title="Clear chat"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
            >
              <RotateCcw size={14} />
            </button>
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-none">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={13} className="text-primary" />
                </div>
              )}

              <div className={`flex flex-col gap-2 max-w-[82%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                {/* Bubble */}
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
                    ${msg.role === "user"
                      ? "bg-primary text-white rounded-tr-sm"
                      : "bg-white/8 text-white/90 rounded-tl-sm border border-white/8"
                    }
                    ${msg.loading ? "min-w-[60px]" : ""}
                  `}
                >
                  {msg.loading ? (
                    <TypingDots />
                  ) : (
                    <p className="whitespace-pre-wrap ">{msg.content}</p>
                  )}
                </div>

                {/* Movie cards */}
                {!msg.loading && msg.movies && msg.movies.length > 0 && (
                  <div className="w-full space-y-1.5 mt-1">
                    <p className="text-white/30 text-[10px] font-medium uppercase tracking-wider">
                      {msg.movies.length} Suggestion{msg.movies.length > 1 ? "s" : ""}
                    </p>
                    {msg.movies.slice(0, 4).map((movie) => (
                      <ChatMovieCard key={movie._id} movie={movie} />
                    ))}
                    {msg.movies.length > 4 && (
                      <p className="text-white/30 text-[10px] text-center">
                        +{msg.movies.length - 4} more
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions (shown when only welcome message) */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
            {[
              " فيلم أكشن 🔥",
              "Suggest a thriller",
              "أفضل أفلام 2023",
              "Something romantic 💕",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setInput(suggestion);
                  inputRef.current?.focus();
                }}
                className="text-[11px] bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-white/60 hover:text-white/90 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="px-4 py-3 border-t border-white/8 bg-[#161616] shrink-0">
          <div className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/8 px-3 py-2 focus-within:border-primary/40 transition-colors">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me about any movie..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm text-white/90 placeholder:text-white/25 outline-none min-w-0 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200
                ${input.trim() && !isLoading
                  ? "bg-primary hover:bg-[#b20710] text-white active:scale-95"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
            >
              <Send size={14} />
            </button>
          </div>
          <p className="text-white/20 text-[10px] text-center mt-2">
            Powered by Gemini AI · CineVerse
          </p>
        </div>
      </div>
    </>
  );
}
