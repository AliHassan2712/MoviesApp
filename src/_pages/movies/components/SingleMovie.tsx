
interface SingleMoviePageProps {
  movie: {
    id: string;
    name: string;
 
  };
}

const SingleMovie: React.FC<SingleMoviePageProps> = ({ movie }) => {
  if (!movie) {
    return <p className="text-white text-center">No movie data</p>;
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
     
      <p className="text-gray-700">{movie.name}</p>
    </div>
  );
};

export default SingleMovie;
