import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MovieInterface {
  _id: string;
  moviename: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: string[];
  release_date: string;
  duration: string;
  original_language: string;
  rating?: number;
}

const MovieCard = () => {
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("${process.env.REACT_APP_BACKEND_URL}/movies/poster");
      const data: MovieInterface[] = await response.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  const openMovie = (id: string) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {movies.length === 0 ? (
        <div className="text-white">Movies are loading...</div>
      ) : (
        movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-[#1A1A1C] rounded-xl h-85 w-60 backdrop-blur text-white hover:scale-105 transition-transform duration-300"
          >
            <img
              src={movie.poster_path}
              alt={movie.moviename}
              className="fixed top-4 right-2 left-5"
            />

            <div className="fixed top-55 ml-3">
              <h3 className="text-md font-bold ml-2">{movie.moviename}</h3>
              <p className="text-sm text-gray-400 ml-2">
                {movie.release_date.slice(0, 4)} &bull;{" "}
                {movie.genres.join(" | ")} &bull; {movie.duration}
              </p>
            </div>
            <div className="pt-2 fixed top-70 pl-12 justify-center">
                <button
                  onClick={() => openMovie(movie._id)}
                  className="bg-[#EF3A55] text-white text-sm px-6 py-2 rounded-full hover:bg-[#d72d48] transition pb-2" 
                >
                  Buy Tickets
                </button>
              </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieCard;
