import { Routes, HashRouter, Route, useLocation } from "react-router";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Movies from "./pages/Movies";
import { MovieDetails } from "./pages/MovieDetails";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import SeatLayout from "./pages/SeatLayout";
import Bookings from "./pages/Bookings";
import Favorite from "./pages/Favorite";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import Signuppage from "./pages/SignupPage";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddShow from "./pages/AddShow";
import ListShows from "./pages/ListShows";
import ListBookings from "./pages/ListBookings";

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <NavBar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/favorite" element={<Favorite />} />

        <Route path="/auth" element={<LoginPage />} />
        <Route path="/auth/s" element={<Signuppage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add" element={<AddShow />} />
          <Route path="shows" element={<ListShows />} />
          <Route path="bookings" element={<ListBookings />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {!hideNavbar && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <>
      <Toaster />

      <HashRouter>
        <AppContent />
      </HashRouter>
    </>
  );
};

export default App;
