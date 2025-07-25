import NavBar from '../components/NavBar'
import MovieCard from '../components/MovieCard'

const Movies = () => {
  return (<>
    <div className='mb-30'>
      <NavBar />
    </div>
    
    <div className='px-10 overflow-hidden'>
      <div className='flex flex-wrap gap-10'>
        <MovieCard />
      </div>
    </div>
    
  </>)
}

export default Movies