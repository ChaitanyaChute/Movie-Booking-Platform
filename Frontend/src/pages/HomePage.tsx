import { Link } from "react-router"
import MovieCard from "../components/MovieCard"
import { ArrowRight } from "lucide-react"



const HomePage = () => {


  return (<>
    
    <div>
      <img src='./src/assets/backgroundImage.png' />
    </div>
    <div className="justify-between flex mt-10 mb-5 ml-20 mr-30">
      <p className="text-2xl font-bold ">Now Showing</p>
      <div className="flex ">
        <Link to={"/movies"} className="gap-1 flex">View All <ArrowRight className="text-xs " /></Link>
      </div>
    </div>
    <div className="overflow-hidden h-97 mb-20 ">
  <MovieCard />
</div>

    

    
  </>)
}

export default HomePage;