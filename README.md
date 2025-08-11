# CineLuxe - Movie Booking Platform

**Live Demo:** [https://movie-booking-platform-1.onrender.com/](https://movie-booking-platform-1.onrender.com/)

## Overview

A modern movie booking platform enabling users to browse movies, select theaters, choose seats, and book tickets with an intuitive interface.

## Features

- **Movie Browsing** - Current & upcoming movies with details, trailers, ratings
- **Theater & Showtime Selection** - Multiple theaters with flexible scheduling
- **Interactive Seat Selection** - Visual seat map with real-time availability
- **Secure Booking** - JWT authentication & secure payment processing
- **User Dashboard** - Booking history and profile management
- **Admin Panel** - Movie, theater, and booking management
- **Responsive Design** - Optimized for all devices

## Tech Stack

- **Frontend:** [Your Framework - React]
- **Backend:** [Your Backend - Node.js]
- **Database:** [Your DB - MongoDB]
- **Deployment:** Render
- **Authentication:** JWT
- **Payments:** [Razorpay]

## Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/yourusername/cineluxe-movie-booking.git
   cd cineluxe-movie-booking
   npm install
   ```

2. **Environment Setup**
   ```env
   PORT=5000
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   PAYMENT_API_KEY=your_payment_key
   ```

3. **Run Application**
   ```bash
   npm run dev  # Development
   npm start    # Production
   ```

## Project Structure

```
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── public/
└── package.json
```

## Deployment

**Render Deployment:**
1. Fork repository
2. Connect to Render
3. Set environment variables
4. Deploy


