import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Film, Image, Calendar, Clock, Globe, Tag } from "lucide-react";

const AddShow = () => {
  const movienameRef = useRef<HTMLInputElement>(null);
  const overviewRef = useRef<HTMLTextAreaElement>(null);
  const posterRef = useRef<HTMLInputElement>(null);
  const BackdropRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const genreRef = useRef<HTMLInputElement>(null);
  const languageRef = useRef<HTMLInputElement>(null);
  const durationRef = useRef<HTMLInputElement>(null);

  const Navigate = useNavigate();

  async function AddMovie(e: React.FormEvent) {
    e.preventDefault();
    const MovieName = movienameRef.current!.value;
    const Overview = overviewRef.current!.value;
    const poster = posterRef.current!.value;
    const Backdrop = BackdropRef.current!.value;
    const date = dateRef.current!.value;
    const genre = genreRef.current!.value;
    const duration = durationRef.current!.value;
    const language = languageRef.current!.value;

    if (!MovieName || !Overview || !poster || !Backdrop || !date || !genre || !duration || !language) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/movies/upload`,
        {
          moviename: MovieName,
          overview: Overview,
          poster_path: poster,
          backdrop_path: Backdrop,
          release_date: date,
          genres: genre,
          original_language: language,
          duration: duration,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log("Response:", response.data);

      toast.success("Movie added successfully!");
      Navigate("/admin/shows");
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error("Access denied. Admin privileges required.");
        Navigate("/admin/login");
      } else {
        toast.error("Failed to add movie");
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Add New Movie</h2>
        <p className="text-gray-400">Add a new movie to your platform</p>
      </div>

      <form onSubmit={AddMovie} className="bg-[#1A1A1C] rounded-2xl shadow-2xl border border-[#2a2a2b] overflow-hidden">
        <div className="bg-gradient-to-r from-[#EF3A55] to-[#d72d48] p-6">
          <h2 className="text-2xl font-semibold text-white">Movie Information</h2>
        </div>

        <div className="p-8 space-y-6">
          {/* Movie Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Film size={18} className="text-[#EF3A55]" />
              Movie Name
            </label>
            <input
              ref={movienameRef}
              placeholder="Enter movie name"
              type="text"
              required
              className="w-full px-4 py-3 bg-[#0F0F10] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF3A55] focus:border-transparent transition"
            />
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Tag size={18} className="text-[#EF3A55]" />
              Overview
            </label>
            <textarea
              ref={overviewRef}
              placeholder="Enter movie overview/description"
              rows={4}
              required
              className="w-full px-4 py-3 bg-[#0F0F10] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF3A55] focus:border-transparent transition resize-none"
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Poster URL */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Image size={18} className="text-[#EF3A55]" />
                Poster URL
              </label>
              <input
                ref={posterRef}
                placeholder="https://..."
                type="url"
                required
                className="w-full px-4 py-3 bg-[#0F0F10] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF3A55] focus:border-transparent transition"
              />
            </div>

            {/* Backdrop URL */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Image size={18} className="text-[#EF3A55]" />
                Backdrop URL
              </label>
              <input
                ref={BackdropRef}
                placeholder="https://..."
                type="url"
                required
                className="w-full px-4 py-3 bg-[#0F0F10] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF3A55] focus:border-transparent transition"
              />
            </div>

            {/* Release Date */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Calendar size={18} className="text-[#EF3A55]" />
                Release Date
              </label>
              <input
                ref={dateRef}
                type="date"
                required
                className="w-full px-4 py-3 bg-[#0F0F10] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF3A55] focus:border-transparent transition"
              />
            </div>

            {/* Genre */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Tag size={18} className="text-[#EF3A55]" />
                Genre
              </label>
              <input
                ref={genreRef}
                placeholder="Action, Drama, Thriller"
                type="text"
                required
                className="w-full px-4 py-3 bg-[#0F0F10] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF3A55] focus:border-transparent transition"
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Clock size={18} className="text-[#EF3A55]" />
                Duration
              </label>
              <input
                ref={durationRef}
                type="time"
                required
                className="w-full px-4 py-3 bg-[#0F0F10] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF3A55] focus:border-transparent transition"
              />
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Globe size={18} className="text-[#EF3A55]" />
                Language
              </label>
              <input
                ref={languageRef}
                placeholder="English, Hindi, etc."
                type="text"
                required
                className="w-full px-4 py-3 bg-[#0F0F10] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF3A55] focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#EF3A55] to-[#d72d48] text-white px-6 py-4 rounded-lg hover:from-[#d72d48] hover:to-[#c02440] transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg"
            >
              Add Movie
            </button>
            <button
              type="button"
              onClick={() => Navigate("/admin")}
              className="px-6 py-4 bg-[#0F0F10] text-gray-300 rounded-lg hover:bg-[#2a2a2b] transition-all duration-200 border border-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddShow;
