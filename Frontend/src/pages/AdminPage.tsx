import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AdminPage = () => {
  const movienameRef = useRef<HTMLInputElement>()
  const overviewRef = useRef<HTMLInputElement>()
  const posterRef = useRef<HTMLInputElement>()
  const BackdropRef = useRef<HTMLInputElement>()
  const dateRef = useRef<HTMLInputElement>()
  const genreRef = useRef<HTMLInputElement>()

  const Navigate = useNavigate();


  async function AddMovie(){
    const MovieName = movienameRef.current.value;
    const Overview = overviewRef.current.value;
    const poster = posterRef.current.value;
    const Backdrop = BackdropRef.current.value;
    const date = dateRef.current.value;
    const genre = genreRef.current.value;

    console.log("moviename:",MovieName);
    console.log("overview:",Overview);
    console.log("Poster:",poster);
    console.log("Backdrop:",Backdrop);
    console.log("Date:",date);
    console.log("Genre:",genre);
    

    const response = await axios.post(`http://localhost:3000/movies/upload`,{
        moviename : MovieName,
        overview:Overview,
        poster_path: poster,
        backdrop_path:Backdrop,
        release_date:date,
        genres:genre
    })
     console.log("Response:", response.data);

    toast.success("MOVIE ADDED sucessfully")

    Navigate("/movies")

  }
  return (
    
<div className="admin-page flex pt-20 justify-center items-center min-h-screen bg-[#121212]">
  <form className="flex flex-col w-[350px] gap-6 bg-[#1f1f1f] p-10 rounded-xl shadow-xl border border-[#333]">
  <div className="flex flex-col gap-1">
    <label className="font-semibold text-sm text-gray-300">MovieName</label>
    <input
      ref={movienameRef}
      placeholder="Moviename"
      type="text"
      className="px-3 py-2 text-base rounded-md border border-[#444] bg-[#292929] text-gray-100 outline-none"
    />
  </div>

  <div className="flex flex-col gap-1">
    <label className="font-semibold text-sm text-gray-300">Overview</label>
    <input
      ref={overviewRef}
      placeholder="Overview"
      type="text"
      className="px-3 py-2 text-base rounded-md border border-[#444] bg-[#292929] text-gray-100 outline-none"
    />
  </div>

  <div className="flex flex-col gap-1">
    <label className="font-semibold text-sm text-gray-300">Poster</label>
    <input
      ref={posterRef}
      placeholder="Input url"
      type="text"
      className="px-3 py-2 text-base rounded-md border border-[#444] bg-[#292929] text-gray-100 outline-none"
    />
  </div>

  <div className="flex flex-col gap-1">
    <label className="font-semibold text-sm text-gray-300">Backdrop Poster</label>
    <input
      ref={BackdropRef}
      placeholder="Input url"
      type="text"
      className="px-3 py-2 text-base rounded-md border border-[#444] bg-[#292929] text-gray-100 outline-none"
    />
  </div>

  <div className="flex flex-col gap-1">
    <label className="font-semibold text-sm text-gray-300">Release Date</label>
    <input
      ref={dateRef}
      type="date"
      className="px-3 py-2 text-base rounded-md border border-[#444] bg-[#292929] text-gray-100 outline-none"
    />
  </div>

  <div className="flex flex-col gap-1">
    <label className="font-semibold text-sm text-gray-300">Genre</label>
    <input
      ref={genreRef}
      placeholder="Genre"
      type="text"
      className="px-3 py-2 text-base rounded-md border border-[#444] bg-[#292929] text-gray-100 outline-none"
    />
  </div>
</form>


  <button
    className="ml-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    onClick={AddMovie}
  >
    Add Movie
  </button>
</div>


  );
}
export default AdminPage
