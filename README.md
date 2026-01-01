# 🎬 Movies App

A **production-ready Movies & Series web application** built with **Next.js App Router**, focused on scalability, clean architecture, and high-quality UI/UX.

This project is designed as a real-world application with reusable components, custom hooks, and optimized performance — suitable for learning, portfolio usage, or further extension.

---

## ✨ Key Highlights

- ✅ Modern **Next.js 14+ App Router** architecture
- ✅ Fully **TypeScript**-based
- ✅ Clean & reusable component system
- ✅ Custom hooks for data fetching
- ✅ Skeleton loading states
- ✅ Optimized images & performance
- ✅ Ready for deployment

---

## 🏠 Home Page Sections

- ⭐ **Top Rated** – Highest rated movies
- 🆕 **Recent** – Newly added content
- 👁️ **Most Viewed** – Popular movies based on views

Each section is built as a **reusable component**, making the page easy to scale and maintain.

---

## 🎥 Movies & Series

- Movie details page
- Series details page
- Seasons & Episodes support
- Dynamic routing with App Router
- Skeleton loaders while fetching data

---

## 👥 Actors

- Actors listing page
- Actor details page
- Optimized images & clean UI

---

## 🧠 Architecture Principles

### 🔹 Separation of Concerns
- UI components isolated from business logic
- Data fetching handled via custom hooks

### 🔹 Reusability First
- Shared cards for movies, series, and actors
- Shared section & layout components

### 🔹 Performance Optimization
- `useMemo` & `useCallback` where needed
- Skeleton loading instead of spinners
- `next/image` for image optimization

---

## 🛠️ Tech Stack

- **Next.js 14+** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **FontAwesome Icons**
- **REST API / External Movie API**

---

## 📂 Project Structure

movies-app/
├── app/
│   ├── page.tsx
│   ├── movies/
│   ├── series/
│   └── actors/
├── components/
│   ├── cards/
│   ├── sections/
│   ├── containers/
│   └── skeletons/
├── hooks/
├── types/
├── constants/
├── lib/
├── public/
└── README.md

---

## ⚙️ Installation & Running Locally

1. Clone the repository
```bash
git clone <repository-url>
```

2. Navigate to the project directory
```bash
cd movies-app
```

3. Install dependencies
```bash
npm install
```

4. Run the development server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 🌍 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=your_api_url_here
```

---

## 🔐 Test Admin Account (Development Only)

Email: admin@test.com  
Password: 12345678  

⚠️ For development and testing only. Do NOT use in production.

---

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] Reusable components verified
- [ ] No console errors
- [ ] Skeleton loaders working
- [ ] Image optimization enabled
- [ ] SEO metadata added
- [ ] Test admin disabled in production

---

## 🔮 Future Enhancements

- Authentication & user profiles
- Favorites & watchlist
- Advanced search & filters
- Infinite scroll / pagination
- Dark / Light mode

---

## 👨‍💻 Author

Built with ❤️ as part of a **Movies App Project Team**.
