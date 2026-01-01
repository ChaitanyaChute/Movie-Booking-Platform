import { useEffect, useState } from "react";
import axios from "axios";
import { Film, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Movie {
  _id: string;
  moviename: string;
  poster_path: string;
  genres: string;
  release_date: string;
  duration: string;
  original_language: string;
}

const ListShows = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/movies/poster`);
      setMovies(response.data as Movie[]);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch movies");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this movie?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/movies/${id}`,
        {
          headers: { token }
        }
      );
      toast.success("Movie deleted successfully");
      fetchMovies();
    } catch (error) {
      toast.error("Failed to delete movie");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Active Shows</h2>
        <p className="text-gray-400">Manage your movie listings</p>
      </div>

      {movies.length === 0 ? (
        <div className="bg-[#1A1A1C] rounded-xl p-12 border border-[#2a2a2b] text-center">
          <Film className="mx-auto text-gray-600 mb-4" size={48} />
          <p className="text-gray-400 text-lg">No movies added yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-[#1A1A1C] rounded-xl border border-[#2a2a2b] overflow-hidden hover:border-[#EF3A55] transition-all"
            >
              <div className="relative h-64">
                <img
                  src={movie.poster_path}
                  alt={movie.moviename}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-2">{movie.moviename}</h3>
                <div className="space-y-1 text-sm text-gray-400 mb-4">
                  <p>Genre: {movie.genres}</p>
                  <p>Release: {new Date(movie.release_date).toLocaleDateString()}</p>
                  <p>Duration: {movie.duration}</p>
                  <p>Language: {movie.original_language}</p>
                </div>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListShows;
