import MovieCard from '../components/MovieCard'

const Movies = () => {
  return (
    <>

      <div className='pt-40 px-10 overflow-hidden  pb-40'>
        <div className='flex flex-wrap gap-10'>
          <MovieCard />
        </div>
      </div>
    </>
  )
}

export default Movies
