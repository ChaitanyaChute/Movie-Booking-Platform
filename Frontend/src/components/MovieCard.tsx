import { useEffect, useState } from "react"
import {useNavigate, useParams } from "react-router";

interface MovieInterface {
  moviename:string,
  overview:string,
  poster_path:string,
  backdrop_path:string,
  genres:string[],
  release_date:string,
  duration:string,
  original_language:string,
  
}

const MovieCard = () => {
  

  const[Movie,setMovie]=useState<MovieInterface[] | null>([]);

  useEffect(()=>{
    const FetchingMovie = async()=>{
      const data = await fetch("http://localhost:3000/movies/poster");
      const res:MovieInterface[] = await data.json();
      setMovie(res);
      
      
    }
    FetchingMovie();
  },[])
   
   const navigate = useNavigate();

   const openMovie = () => {
    navigate(`/movies/:id`);
  };

  return (<> 
    {Movie?.length ===0 ? <div>Movies are loading....</div>:Movie?.map((Movie)=>(
    <div className='rounded-xl h-85 w-60 backdrop-blur bg-gray-800 '>
      <div className='fixed top-4 right-2 left-2 '>
         <img
            src={Movie?.poster_path}
            style={{ width: "400px", height: "auto" }}
          />
      </div>
      <div className="fixed top-60 left-2 right-2 text-xl">
        <b>{Movie?.moviename}</b>
      </div>
      <div className="left-2 right-2 justify-center align-center">
        <button className="bg-red-800 rounded-2xl cursor-pointer" onClick={openMovie}>BUY TICKETS</button>
      </div>

    </div>
    ))}
    </>
  )
}

export default MovieCard