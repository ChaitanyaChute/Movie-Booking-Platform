import { Link} from 'react-router-dom';


const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white flex flex-col justify-center items-center px-6 text-center font-sans pt-20">
      
      <h1 className="text-6xl font-bold mb-4 text-[#EF3A55]">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">Oops! The page you're looking for doesn't exist.</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <Link to="/" className="bg-[#EF3A55] hover:bg-[#d72d48] text-white py-2 px-6  transition-all rounded-xl">
          Go to Home
        </Link>
        <a href="/movies" className="bg-white text-[#0F0F10] py-2 px-6 rounded-xl hover:bg-gray-200 transition-all">
          Explore Movies
        </a>
      </div>

    </div>
  );
};

export default ErrorPage;
