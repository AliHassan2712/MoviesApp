"use client";
import { Container } from "@/components/containers/Container";
import { useFavorites } from "../hooks/useFavorites";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
export default function Favorites() {
  const { favoritemovies, toggleFavorite, loading } = useFavorites();

  if (loading) return <p className="text-center mt-10">Loading favorites...</p>;


  return (
    <Container>
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-5 ">My Favorites</h2>

        {favoritemovies.length === 0 ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold">You have no favorite movies yet.</h1>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {favoritemovies.map((item) => (
              <div key={item._id} className="p-4 bg-white rounded-xl shadow cursor-pointer">
                <div className="relative">
                  <img src={item.poster} alt={item.name} className="w-full h-60 object-cover" />

                </div>
                <div className="flex justify-between mb-3">
                  <h3 className="mt-2 font-bold text-black py-auto my-auto">{item.name}</h3>
                  <FontAwesomeIcon icon={faHeart} className="text-primary py-auto my-auto" />
                </div>

                <button
                  onClick={() => toggleFavorite(item._id)}
                  className="btn mt-2 w-full py-2 btn-primary text-white rounded transition cursor-pointer"
                >
                  Remove from Favorites

                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
