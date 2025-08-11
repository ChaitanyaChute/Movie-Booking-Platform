import { Link } from "react-router"
import MovieCard from "../components/MovieCard"
import { ArrowRight } from "lucide-react"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";



const images = [
  "/carousal-1.jpg",
  "/carousal-2.jpg",
  "/carousal-3.jpg",
  "/carousal-4.jpg",
  "/carousal-5.jpg",
  
];




const HomePage = () => {


  return (<>
  <div className="w-full h-[768px] overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        className="h-full"
      >
        {images.map((src, index) => (
          <div key={index} className="h-full">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Carousel>
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