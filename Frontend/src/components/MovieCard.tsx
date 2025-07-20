import { useEffect, useState } from "react"

interface MovieInterface {
  moviename:string,
  overview:string,
  poster_path:string,
  backdrop_path:string,
  genres:string[]
}

const MovieCard = () => {

  const[Movie,setMovie]=useState<MovieInterface[] | null>([]);

  useEffect(()=>{
    const FetchingMovie = async()=>{
      const data = await fetch("http://localhost:3000/movies/detail");
      const res:MovieInterface[] = await data.json();
      setMovie(res);
      
    }
    FetchingMovie();

  },[])



  return (<> 
    {Movie?.length ===0 ? <div>Movies are loading....</div>:Movie?.map((Movie)=>(
    <div className='rounded-xl h-85 w-60 backdrop-blur bg-gray-800 '>
      <div className='fixed top-4 right-2 left-2 '>
         <img
            src={Movie?.backdrop_path}
            alt={Movie?.moviename}
            style={{ width: "400px", height: "auto" }}
          />
      </div>
      <div className="fixed top-40 left-2 right-2">
        <b>{Movie?.moviename}</b>
      </div>
      <div>
        <p></p>
      </div>

    </div>
    ))}
    </>
  )
}

export default MovieCard