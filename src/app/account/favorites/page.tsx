// protected route wrapper for favorites page
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// favorites page component
import FavoritesPage from "@/pages/account/favorites/FavoritesPage";

export default function Favorites() {
  return (
     <ProtectedRoute>
       <FavoritesPage />
     </ProtectedRoute>
  );
}
