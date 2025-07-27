import { CirclePlay } from 'lucide-react';
import  { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import CastComponent from '../components/castComponent';

interface MovieInterface {
  moviename:string,
  overview:string,
  poster_path:string,
  backdrop_path:string,
  genres:string[]
}

export const MovieDetails = () => {
  const {id} = useParams()

  const [movieData ,setData] = useState<MovieInterface | null>(null);

  useEffect(()=>{
    const loading_movie = async()=>{
      try {
       const data = await fetch(`http://localhost:3000/movies/${id}`);
       const res:MovieInterface = await data.json();
       setData(res);
      } catch (error) {
        console.log("error in moviedetails page",error);
      }
    }

    if(id){
  loading_movie();
    }
  },[id])

if (!movieData) return <div>Loading movie...</div>;



function formatDuration(duration:string) {
  const [hours, minutes] = duration.split(':');
  return `${hours}hr ${minutes}min`;
}

function ytEmbed() {
  return (
    toast("Feature coming soon")
  );
}


  return (
  <div className="overflow-y-auto max-h-screen py-12 bg-[#0d0c11] text-white ">
  <div className="max-w-6xl px-8 ml-23 flex flex-row gap-10">
    
    <div className="flex-shrink-0 mt-40 ml-0">
      <img
        src={movieData.backdrop_path}
        alt={movieData.moviename}
        className="rounded-xl shadow-lg"
      />
    </div>

    <div className="flex flex-col justify-start mt-43">
      
      <p className="text-sm text-red-400 font-semibold mb-2 uppercase">
        {movieData.original_language}
      </p>

      <h1 className="text-4xl font-extrabold mb-3">
        {movieData.moviename}
      </h1>

      <p className="text-gray-300 text-sm leading-relaxed max-w-2xl mb-6">
        {movieData.overview}
      </p>

      <div className="text-gray-300 font-medium text-sm mb-6">
        {formatDuration(movieData.duration)} • {movieData.genres.join(", ")} •{" "}
        {new Date(movieData.release_date).getFullYear()}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <button
          className="bg-[#1c1c2a] cursor-pointer text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 transition"
          onClick={ytEmbed}
        >
          <CirclePlay size={20} />
          Watch Trailer
        </button>
        <button className="bg-red-400 cursor-pointer  text-white font-medium py-2 px-5 rounded-md transition">
          Buy Tickets
        </button>
        
      </div>
    </div>
  </div>
  <div className='mt-20 ml-23 px-8'>
        <h2 className="text-lg font-bold mb-3 ml">Casts</h2>
        <CastComponent />
    </div>
</div>

  )
}
