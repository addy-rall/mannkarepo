// =============================================================================
// || MANNKA - AUTHENTICATION BACKEND (Main Entry Point)                      ||
// =============================================================================
// || This file initializes the server, connects to the database, sets up     ||
// || middleware, and links the API routes.                                   ||
// =============================================================================

// --- 1. Imports ---
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');  // <-- Add this

const authRoutes = require('./routes/authRoutes');

// --- 2. Initialization ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- 3. Database Connection ---
connectDB();

// --- 4. Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies from requests

// --- 5. API Routes ---
// All routes related to authentication will be prefixed with /api/auth
app.use('/api/auth', authRoutes);
// Use the contact routes for API endpoints
app.use('/api/contact', contactRoutes);


// --- 6. Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running with divine grace on port ${PORT}`);
});

