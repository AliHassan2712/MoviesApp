// protected route wrapper for watchlist page
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// watchlist page component
import WatchlistPage from "@/pages/account/watchlist/WatchlistPage";

export default function Watchlist() {
  return (
     <ProtectedRoute>
      <WatchlistPage />
     </ProtectedRoute>
  );
}
