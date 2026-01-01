import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
      required: true,
    },

    showDate: String,
    showTime: String,

    seats: [String],
    totalSeats: Number,

    amount: Number,

    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// auto-generate unique booking id per user+movie
bookingSchema.pre("validate", function (next) {
  if (!this.bookingId) {
    this.bookingId = `${this.movieId}_${this.userId}_${Date.now()}`;
  }
  next();
});

export default mongoose.model("Booking", bookingSchema);
