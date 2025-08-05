import { CirclePlay } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import CastComponent from '../components/CastComponent';



interface MovieInterface {
  moviename: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: string[];
  original_language: string;
  duration: string;
  release_date: string;
}

export const MovieDetails = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [movieData, setData] = useState<MovieInterface | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const loading_movie = async () => {
      try {
        const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}`);
        const res: MovieInterface = await data.json();
        setData(res);
      } catch (error) {
        console.log('Error in moviedetails page', error);
      }
    };

    if (id) {
      loading_movie();
    }
  }, [id]);

  if (!movieData) return <div>Loading movie...</div>;

  function formatDuration(duration: string) {
    const [hours, minutes] = duration.split(':');
    return `${hours}hr ${minutes}min`;
  }

  function ytEmbed() {
    toast('Feature coming soon');
  }

  const today = new Date();
  const dates = [];

  for (let i = 0; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dateStr = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
    });

    const [day, month] = dateStr.split(' ');
    dates.push({ day, month, key: `${day} ${month}` });
  }

  const handleDateClick = (key: string) => {
    setSelectedDate(key);
  };

  const bookingFunction = async () => {
  if (!selectedDate) {
    toast.error("Please select a date first");
    return;
  }

  const formattedDate = selectedDate.replace(' ', '-');

  navigate(`/movies/${id}/${formattedDate}`);
};

  return (
    <div className="min-h-screen py-12 bg-[#0d0c11] text-white">
      <div className="max-w-6xl px-8 ml-23 flex flex-row gap-10">
        <div className="flex-shrink-0 mt-40 ml-0">
          <img
            src={movieData.backdrop_path}
            alt={movieData.moviename}
            className="rounded-xl shadow-lg"
          />
        </div>

        <div className="flex flex-col justify-start mt-43">
          <p className="text-sm text-[#EF3A55] font-semibold mb-2 uppercase">
            {movieData.original_language}
          </p>

          <h1 className="text-4xl font-extrabold mb-3">{movieData.moviename}</h1>

          <p className="text-gray-300 text-sm leading-relaxed max-w-2xl mb-6">
            {movieData.overview}
          </p>

          <div className="text-gray-300 font-medium text-sm mb-6">
            {formatDuration(movieData.duration)} • {movieData.genres.join(', ')} •{' '}
            {new Date(movieData.release_date).getFullYear()}
          </div>

          <div className="flex items-center gap-4 mb-8 flex-wrap">

            <button
              className="bg-[#1c1c2a] cursor-pointer text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 transition"
              onClick={ytEmbed}
            >
              <CirclePlay size={20} />
              Watch Trailer
            </button>
            <a href="#date-selection">
            <button className="bg-[#EF3A55] cursor-pointer text-white font-medium py-2 px-5 rounded-md transition" onClick={()=>toast("Please choose Date")}>
              Buy Tickets
            </button>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-20 ml-23 px-8">
        <h2 className="text-lg font-bold mb-3">Casts</h2>
        <CastComponent />
      </div>

      
      <div className="ml-28 mt-10 h-40 mr-100 rounded-xl">
        <div className="relative w-full max-w-4xl mx-auto h-full rounded-2xl overflow-hidden shadow-[0_0_30px_#ff4d6d33] bg-[#2a0c12]/50 backdrop-blur-md">
          <div className="flex items-center h-full px-8">
            <div className="font-semibold text-white text-lg mr-4">Choose Date</div>

            {dates.map((currentDate) => {
              const isSelected = selectedDate === currentDate.key;

              return (
                <div
                  id="date-selection"
                  key={currentDate.key}
                  className={`h-16 w-16 rounded-xl border-2 ml-5 text-center cursor-pointer flex flex-col items-center justify-center transition 
                    ${isSelected ? 'bg-[#EF3A55] text-white border-[#EF3A55]' : 'hover:bg-[#EF3A55] text-white border-[#EF3A55]'}`}
                  onClick={() => handleDateClick(currentDate.key)}
                >
                  <div className="text-lg font-semibold">{currentDate.day}</div>
                  <div className="text-sm">{currentDate.month}</div>

                  
                </div>
              );
            })}
            <button className='ml-20 p-2 bg-[#EF3A55] rounded-xl px-10 items-center text-md font-light' onClick={bookingFunction}>Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};
