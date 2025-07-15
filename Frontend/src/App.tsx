import React from 'react'
import { Routes  , BrowserRouter, Route } from 'react-router'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import Movies from './pages/Movies'
import { MovieDetails } from './pages/MovieDetails'
import Footer from './components/Footer'
import ErrorPage from './pages/ErrorPage'
import SeatLayout from './pages/SeatLayout'
import Bookings from './pages/Bookings'
import Favorite from './pages/Favorite'
import  {  Toaster } from 'react-hot-toast'
import AuthPage from './pages/AuthPage'


const App = () => {
 
  return (
    <>
    <Toaster />
    
     
    <BrowserRouter>
        <NavBar />
      <Routes>
        <Route path='/' element = {<HomePage />} />
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>
        <Route path='/movies/:id/:date' element={<SeatLayout/>}/>
        <Route path='/bookings' element={<Bookings/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
        <Route path="/auth" element={<AuthPage/>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      
    </BrowserRouter>

    <Footer/>
    

   </> 
  )
}

export default App