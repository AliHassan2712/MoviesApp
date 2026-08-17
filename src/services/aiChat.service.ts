import { Movie } from "@/types/movie";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

export type ChatResponse = {
  status: string;
  reply: string;
  movies: Movie[];
};

export async function sendChatMessage(
  message: string,
  history: ChatTurn[]
): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/movies/ai-chat`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!res.ok) throw new Error("Chat request failed");
  return res.json();
}
