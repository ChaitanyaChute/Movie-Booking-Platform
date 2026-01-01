import express from "express";
import { authM } from "../middleware/auth.js";
import { 
  createCheckoutSession, 
  handleStripeWebhook,
  getUserBookings,
  cancelBooking,
  updateBookingStatus
} from "../controllers/booking.controller.js";

const Bookingrouter = express.Router();

// Create checkout session (protected route)
Bookingrouter.post("/create-checkout-session", authM, createCheckoutSession);

// Get user bookings (protected route)
Bookingrouter.get("/my-bookings", authM, getUserBookings);

// Update booking status (for confirming payment)
Bookingrouter.patch("/update-status/:bookingId", updateBookingStatus);

// Cancel booking (protected route)
Bookingrouter.patch("/cancel/:bookingId", authM, cancelBooking);

// Stripe webhook (NOT protected - Stripe sends this)
// Note: This route needs raw body, so it should be defined before express.json() middleware
Bookingrouter.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

export default Bookingrouter;
