import NavBar from '../components/NavBar'
import MovieCard from '../components/MovieCard'

const Movies = () => {
  return (<>
    <NavBar />
    <div>Movies</div>
    
    <div className='flex gap-20'><MovieCard /></div>
  </>)
}

export default Movies