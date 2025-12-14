"use client";

import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { useFavorite } from "../../../contexts/FavoriteContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { Container } from "@/components/containers/Container";

export default function Movies() {
  const {
    filteredMovies,
    allGenres,
    activeTab,
    loading,
    setActiveTab,
  } = useMovies();

  const { favoriteList, toggleFavorite } = useFavorite();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading)
    return (
      <Container>
        <h2 className="flex items-center justify-center text-2xl text-main">
          Loading movies...
        </h2>
      </Container>
    );

  return (
    <>
      {/* Genres Tabs */}
      <div className="flex items-center justify-center px-4 mb-5">
        <div className="flex flex-wrap justify-center gap-4 bg-soft p-2 rounded-full w-full max-w-md sm:max-w-lg md:max-w-xl">
          {allGenres.slice(0,4).map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveTab(genre)}
              className={`px-4 sm:px-6 py-2 rounded-full transition cursor-pointer
                ${activeTab === genre
                  ? "bg-card shadow text-main"
                  : "text-muted hover:bg-card"
                }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <Container>
        <div className="flex gap-6 px-4 py-10 relative">

          {/* Mobile Sidebar Button */}
          <button
            className="md:hidden fixed bottom-5 right-6 btn-primary px-4 py-3 rounded-full shadow-lg z-50"
            onClick={() => setSidebarOpen(true)}
          >
            Genres
          </button>

          {/* Mobile Sidebar Popup */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50 md:hidden">
              <div className="bg-card w-80 p-6 rounded-2xl shadow-xl text-main">
                <h2 className="text-xl font-bold mb-4 text-primary">
                  Genres
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  {allGenres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => {
                        setActiveTab(genre);
                        setSidebarOpen(false);
                      }}
                      className="bg-soft text-main px-4 py-2 rounded-lg transition hover:bg-card cursor-pointer"
                    >
                      {genre}
                    </button>
                  ))}
                </div>

                <button
                  className="mt-4 w-full btn-primary py-2 rounded-lg"
                  onClick={() => setSidebarOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 bg-soft p-5 rounded-2xl h-fit sticky top-10">
            <h3 className="text-lg font-bold mb-4 text-primary">
              Genres
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {allGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveTab(genre)}
                  className="bg-card text-main px-4 py-2 rounded-lg transition hover:bg-soft cursor-pointer"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMovies.map((item: any) => (
                <div
                  key={item._id}
                  className="p-4 bg-card rounded-xl shadow transition hover:shadow-lg text-main"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-50 object-cover transition-transform duration-500 hover:scale-110 mb-3"
                    />

                    <button
                      className="absolute top-3 right-3 bg-soft p-2 rounded-full shadow"
                      onClick={() => toggleFavorite(item._id)}
                    >
                      <FontAwesomeIcon
                        icon={
                          favoriteList.includes(item._id)
                            ? faHeart
                            : faHeartRegular
                        }
                        className={`text-xl ${favoriteList.includes(item._id)
                          ? "text-red-500"
                          : "text-muted"
                          }`}
                      />
                    </button>

                    <p className="font-bold mb-1">{item.name}</p>
                    <p className="text-sm text-muted">
                      {item.releaseYear}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </>
  );
}
