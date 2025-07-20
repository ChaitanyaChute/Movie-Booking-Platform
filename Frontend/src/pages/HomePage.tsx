import { Link } from "react-router"
import MovieCard from "../components/MovieCard"
import { ArrowRight } from "lucide-react"

 


const HomePage = () => {


  return (<>
    <div>
      <img src='./src/assets/backgroundImage.png' />
    </div>
    <div className="justify-between flex mt-20 mb-20 ml-20 mr-30">
      <p className="text-2xl font-bold ">Now Showing</p>
      <div className="flex space-x-2">
        <Link to={"/movies"}>View All</Link>
        <ArrowRight className="text-xs" />
      </div>
    </div>
    <div>
      <MovieCard />
      </div>
    

    
  </>)
}

export default HomePage;