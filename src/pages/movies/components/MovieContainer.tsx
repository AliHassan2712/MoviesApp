
type Movie = {
  _id: string;
  name: string;
  description: string;
  poster: string;
  backdrop: string;
  duration: number;
  releaseYear: number;
  genresRefs: { _id: string; name_en: string }[];
  castRefs: { _id: string; name: string; profilePath: string | null }[];
  isDeleted: boolean;
};

type ApiResponse<T> = {
  status: string;
  data: T;
};

async function getMovieById(id: string): Promise<Movie> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`

    , {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch movie");

  const json: ApiResponse<Movie> = await res.json();

  return json.data; 
}

export default async function MovieContainer({ id }: { id: string }) {
  const movie = await getMovieById(id);

 
  if (movie.isDeleted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-xl font-bold">This movie is not available</p>
      </div>
    );
  }

  const { name, description, poster, backdrop, releaseYear, duration, genresRefs, castRefs } = movie;

  return (
    <div className="w-full">
      {/* begin-Hero Section */}
      <div
        className="w-full h-[400px] md:h-[500px] mb-7 relative"
        style={{
          backgroundImage: `url(${backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/80 flex items-end p-6 md:p-12">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">{name}</h1>
        </div>
      </div>

     {/* begin- Main Content */}
      <div className="container mx-auto px-4 md:px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster */}
        <div>
          <img
            src={poster}
            alt={name}
            className="w-full rounded-2xl shadow-lg"
          />
          <div className="mt-5 flex gap-4 ">
            <span className="btn-primary text-white px-2 py-1 rounded-xl font-bold">🎬 {releaseYear}</span>
            <span className="btn-primary text-white px-2 py-1 rounded-xl font-bold">⏱ {duration} min</span>
          </div>
          {/*begin- Genres */}
          <div className="flex flex-wrap gap-2 mt-4">
            {genresRefs.map((genre) => (
              <span
                key={genre._id}
                className="btn-primary text-white px-2 py-1 rounded-xl"
              >
                {genre.name_en}
              </span>
            ))}
          </div>
        </div>

        {/* begin-Description + Cast */}
        <div className="md:col-span-2 ">
          <h2 className="text-3xl text-white mb-2 font-bold">Overview</h2>
          <p className="text-[16px] text-muted mt-1">{description}</p>

          {/* Cast */}
          <div className="mt-10 flex flex-col gap-y-8 py-10">

          <h2 className="text-3xl text-white mb-2 font-bold">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {castRefs.map((cast) => (
              <div key={cast._id} className="text-center">
                {cast.profilePath ? (
                  <img
                  src={cast.profilePath}
                  alt={cast.name}
                  className="w-24 h-24 object-cover rounded-full text-primary mx-auto mb-2"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-300 rounded-full text-primary mx-auto mb-2 flex items-center justify-center">
                    <span className="text-xs text-gray-600">No Image</span>
                  </div>
                )}
                <p className="text-sm font-medium">{cast.name}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
