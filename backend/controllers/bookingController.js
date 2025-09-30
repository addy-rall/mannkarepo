const Booking = require("../models/Booking");

// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "✅ Booking created successfully", booking });
  } catch (error) {
    console.error("Booking Error:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch Error:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
