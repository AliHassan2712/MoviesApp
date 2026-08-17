# 🎬 CimaFlix — Next-Gen Movies & Series Streaming Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini_AI-2.5_Flash-orange?style=flat-square&logo=google)](https://aistudio.google.com/)

A modern, full-featured **Movies & Series Streaming Web Application** built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**. Features AI-powered conversational recommendations, smart semantic search, custom high-performance video player, real-time notification engine, watchlist synchronization, and an administrative dashboard.

---

## 🌟 Key Features

### 🤖 1. AI-Powered Assistant & Semantic Search
- **AI Chat Widget:** Floating interactive AI cinematic companion powered by Google Gemini for tailored movie suggestions, summaries, and taste-based discovery.
- **AI Smart Search:** Natural language search queries ("mind-bending sci-fi with time loops") with automated fallback to fuzzy title/actor/genre matching.

### 🎥 2. Cinematic Player Experience
- **Custom Player:** Built with custom controls, playback speed selection (0.5x - 2x), theater mode, picture-in-picture (PiP), fullscreen, and keyboard shortcuts.
- **Watch History & Resume:** Automatically remembers the user's playback position.
- **Seasons & Episodes Switcher:** Seamless transition between episodes with auto-next and quick navigation.

### 🔔 3. Real-Time Notification Center
- **Release Alerts:** Instant notifications when new movies or episodes are released.
- **Unread Badge & Sync:** Unread counter with instant mark-all-as-read synchronized with user profile in the backend.

### ❤️ 4. Watchlist & Favorites Management
- **Instant Persistence:** Add or remove content with optimistic UI updates.
- **Cross-Device Sync:** Synced to MongoDB database with guest local-storage fallback for unauthorized users.

### 🛡️ 5. Authentication & Guest Mode
- **Dual Auth Support:** Credentials login/signup + **Google OAuth** and **Facebook OAuth**.
- **Guest Access:** Browse catalog and search freely with protected video viewing prompts.
- **Route Guards:** Role-based security for user profiles and admin controls.

### 📊 6. Comprehensive Admin Dashboard
- **Content Management:** Create, update, and delete movies, series, seasons, and episodes with direct image upload.
- **Analytics Overview:** Detailed statistics on total views, user growth, top genres, and system logs.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14+ (App Router)** | Framework for Server & Client Components, SSR, and dynamic routing |
| **TypeScript** | Type-safe development across models, hooks, and components |
| **Tailwind CSS** | Responsive styling, modern dark-mode aesthetic, and fluid layouts |
| **Axios** | HTTP client configured with interceptors and cookie support |
| **FontAwesome & Lucide Icons** | Visual iconography |
| **Google Gemini SDK** | Generative AI integration for conversational recommendation engine |

---

## 📂 Project Structure

```
movies-app/
├── src/
│   ├── _pages/              # Page-level components & domain logic
│   │   ├── auth/            # Login, Signup, Forgot Password
│   │   ├── dashboard/       # Admin Dashboard & CMS
│   │   ├── movies/          # Movies catalog & filters
│   │   ├── series/          # Series catalog & season explorer
│   │   ├── search/          # AI Search & query results
│   │   ├── single-movie/    # Movie details & custom player
│   │   └── single-series/   # Series player & episode listing
│   ├── app/                 # Next.js App Router root layout & routes
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/          # Reusable design system components
│   │   ├── cards/           # MovieCard, SeriesCard, ActorCard
│   │   ├── common/          # Navbar, Footer, Modal, Skeleton
│   │   ├── player/          # Custom HTML5 Video Player
│   │   ├── ui/              # AiChatWidget, NotificationDropdown, SocialButtons
│   │   └── auth/            # ProtectedRoute, GuestRoute
│   ├── context/             # React Contexts (Auth, Watchlist, Theme)
│   ├── hooks/               # Custom hooks (useAiChat, useAiSearch, useDebounce)
│   ├── services/            # API integration modules
│   └── types/               # TypeScript interfaces and types
├── public/                  # Static assets and images
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API Base URL
NEXT_PUBLIC_API_BASE_URL=https://movies-api-w3xb.onrender.com/api/v1

# Direct Gemini Key (Frontend fallback / direct search)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/AliHassan2712/MoviesApp.git
cd MoviesApp/movies-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create `.env.local` with the values shown above.

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
npm run start
```

---

## 👥 Authors & Acknowledgments

Developed with ❤️ as part of the **CimaFlix** team project.
