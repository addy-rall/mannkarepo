// --- 1. Imports ---
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');  // <-- NEW

// --- 2. Initialization ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- 3. Database Connection ---
connectDB();

// --- 4. Middleware ---
app.use(cors());
app.use(express.json());

// --- 5. API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/bookings', bookingRoutes); // <-- NEW

// --- 6. Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running with divine grace on port ${PORT}`);
});
