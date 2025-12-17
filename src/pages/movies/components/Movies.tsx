"use client";
import Link from "next/link";
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
    setActiveTab
  } = useMovies();

  const { favoriteList, toggleFavorite } = useFavorite();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (loading) return <Container> <h2 className="flex items-center justify-center text-2xl">Loading movies...</h2></Container>

  return (
    <>
      <div className="flex items-center justify-center px-4 text-black mb-5">
        <div className="flex flex-wrap justify-center gap-4 bg-gray-200 p-2 rounded-full w-full max-w-md sm:max-w-lg md:max-w-xl">
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveTab(genre)}
              className={`px-4 sm:px-6 py-2 rounded-full transition cursor-pointer
              ${activeTab === genre ? "bg-white shadow" : "text-gray-600"}
                        `}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <Container>
        <div className="flex gap-6 px-4 py-10 relative">

          {/*  Mobile Sidebar Button  */}
          <button
            className="md:hidden fixed bottom-5 right-6 bg-black text-white px-4 py-3 rounded-full shadow-lg z-50 btn-primary"
            onClick={() => setSidebarOpen(true)}
          >
            Genres
          </button>

          {/* Mobile Sidebar Popup */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 md:hidden">
              <div className="bg-white w-80 p-6 rounded-2xl shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-primary">Genres</h2>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
                  ><a href="/">movement</a>
                  </button>

                  <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
                  ><a href="/">adventure</a></button>

                  <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
                  ><a href="/">cartoon</a></button>

                  <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
                  ><a href="/">comedy</a></button>

                  <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
                  ><a href="/">drama</a></button>

                  <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
                  ><a href="/">horror</a></button>


                  <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
                  ><a href="/">family</a></button>

                  <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
                  ><a href="/">music</a></button>







                </div>

                <button
                  className="mt-4 w-full text-white py-2 rounded-lg btn-primary "
                  onClick={() => setSidebarOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>

          )}

          <div className="hidden md:block w-64 bg-gray-200 p-5 rounded-2xl h-fit sticky top-10">
            <h3 className="text-lg font-bold mb-4 text-primary">Genres</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
              ><a href="/">movement</a>
              </button>

              <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
              ><a href="/">adventure</a></button>

              <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
              ><a href="/">cartoon</a></button>

              <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
              ><a href="/">comedy</a></button>

              <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
              ><a href="/">drama</a></button>

              <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
              ><a href="/">horror</a></button>


              <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
              ><a href="/">family</a></button>

              <button className="bg-white text-black px-4 py-2 rounded-lg transition hover:bg-black hover:text-white  cursor-pointer"
              ><a href="/">music</a></button>







            </div>
          </div>
          {/*Main Content */}
          <div className="flex-1 px-5">


            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMovies.map((item: any) => (
                <Link href={`/movies/${item._id}`} key={item._id}>
                  <div
                    className="p-4 bg-white rounded-xl shadow-xl text-black 
             flex flex-col h-full"
                  >
                    {/* Image wrapper */}
                    <div className="relative overflow-hidden rounded-lg h-48">
                      <img
                        src={item.poster}
                        alt={item.name}
                        className="w-full h-full object-cover 
                 transition-transform duration-500 ease-in-out hover:scale-110"
                      />

                      {/* Favorite button */}
                      <button
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(item._id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={favoriteList.includes(item._id) ? faHeart : faHeartRegular}
                          className={`text-xl ${favoriteList.includes(item._id)
                            ? "text-red-500"
                            : "text-gray-500"
                            }`}
                        />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1 mt-3">
                      <p className="text-black font-bold line-clamp-2">
                        {item.name}
                      </p>

                      <p className="text-gray-700 font-semibold mt-2">
                        {item.releaseYear}
                      </p>
                    </div>
                  </div>

                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
