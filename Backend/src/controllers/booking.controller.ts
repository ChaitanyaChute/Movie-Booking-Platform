import Booking from "../models/bookingmodel.js";
import stripe from "../libs/stripe.js";
import { Request, Response } from "express";

// Create Stripe Checkout Session
export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { movieId, movieTitle, date, time, seats, totalSeats, amount } = req.body;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized" 
      });
    }

    if (!movieId || !date || !time || !seats || !amount) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required booking details" 
      });
    }

    // Create a pending booking in the database
    const booking = await Booking.create({
      userId,
      movieId,
      showDate: date,
      showTime: time,
      seats,
      totalSeats,
      amount,
      status: "pending",
    });

    // Determine frontend base URL (prefer production if available)
    const FRONTEND_BASE_URL = process.env.FRONTEND_PROD_URL || process.env.FRONTEND_URL;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${movieTitle || "Movie"} - Booking`,
              description: `Show: ${date} at ${time} | Seats: ${seats.join(", ")}`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${FRONTEND_BASE_URL}/bookings?success=true&bookingId=${booking._id}`,
      cancel_url: `${FRONTEND_BASE_URL}/bookings?canceled=true`,
      metadata: {
        bookingId: booking._id.toString(),
        userId: userId.toString(),
        movieId: movieId.toString(),
      },
    });

    res.status(200).json({ 
      success: true, 
      sessionId: session.id,
      url: session.url,
      bookingId: booking._id
    });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    res.status(500).json({ 
      success: false, 
      message: err instanceof Error ? err.message : "An error occurred" 
    });
  }
};

// Update booking status after successful payment
export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!bookingId) {
      return res.status(400).json({ 
        success: false, 
        message: "Booking ID is required" 
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: status || "paid" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: "Booking not found" 
      });
    }

    console.log(`Booking ${bookingId} status updated to: ${status || 'paid'}`);
    res.status(200).json({ success: true, booking });
  } catch (err) {
    console.error("Error updating booking status:", err);
    res.status(500).json({ 
      success: false, 
      message: err instanceof Error ? err.message : "An error occurred" 
    });
  }
};

// Webhook to handle payment confirmation
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (!sig || !endpointSecret) {
      return res.status(400).send("Missing signature or webhook secret");
    }
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", errorMessage);
    return res.status(400).send(`Webhook Error: ${errorMessage}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    
    try {
      // Update booking status to paid
      const bookingId = session.metadata?.bookingId;
      await Booking.findByIdAndUpdate(bookingId, {
        status: "paid",
      });
      
      console.log(`Payment successful for booking: ${bookingId}`);
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  }

  res.json({ received: true });
};

// Get user bookings
export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    
    console.log('getUserBookings called, userId:', userId);
    
    if (!userId) {
      console.log('No userId found in request');
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized - No user ID" 
      });
    }
    
    const bookings = await Booking.find({ userId })
      .populate("movieId")
      .sort({ createdAt: -1 });

    console.log('Found bookings:', bookings.length);
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    console.error('Error in getUserBookings:', err);
    res.status(500).json({ success: false, message: err instanceof Error ? err.message : "An error occurred" });
  }
};

// Cancel booking
export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized" 
      });
    }

    const booking = await Booking.findOne({ _id: bookingId, userId });

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: "Booking not found" 
      });
    }

    if (booking.status === "paid") {
      return res.status(400).json({ 
        success: false, 
        message: "Cannot cancel paid booking. Please contact support for refunds." 
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ success: true, message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ success: false, message: err instanceof Error ? err.message : "An error occurred" });
  }
};

// Admin: Get booking statistics
export const getBookingStats = async (req: Request, res: Response) => {
  try {
    // Total bookings (all statuses)
    const totalBookings = await Booking.countDocuments();
    
    // Total paid bookings
    const paidBookings = await Booking.countDocuments({ status: "paid" });
    
    // Total revenue (only from paid bookings)
    const revenueData = await Booking.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;
    
    // Total tickets sold (sum of totalSeats from paid bookings)
    const ticketsData = await Booking.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$totalSeats" } } }
    ]);
    const totalTickets = ticketsData.length > 0 ? ticketsData[0].total : 0;
    
    // Active shows (count unique movies with bookings)
    const activeShows = await Booking.distinct("movieId");
    
    res.status(200).json({ 
      success: true, 
      stats: {
        totalBookings,
        paidBookings,
        totalRevenue,
        totalTickets,
        activeShows: activeShows.length
      }
    });
  } catch (err) {
    console.error("Error fetching booking stats:", err);
    res.status(500).json({ 
      success: false, 
      message: err instanceof Error ? err.message : "An error occurred" 
    });
  }
};

// Admin: Get all bookings
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate("movieId")
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    console.log('Found all bookings:', bookings.length);
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    console.error('Error in getAllBookings:', err);
    res.status(500).json({ 
      success: false, 
      message: err instanceof Error ? err.message : "An error occurred" 
    });
  }
};
