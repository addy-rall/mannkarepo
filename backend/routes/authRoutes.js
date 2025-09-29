// =============================================================================
// || AUTHENTICATION ROUTES                                                   ||
// =============================================================================
// || This file defines the API endpoints for all authentication-related      ||
// || actions (register, verify, login) and maps them to the corresponding    ||
// || controller functions.                                                   ||
// =============================================================================

const express = require('express');
const router = express.Router();
const {
    registerUser,
    verifyPhone,
    verifyEmail,
    loginUser
} = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Step 1 of Registration: Register user details, send phone OTP
router.post('/register', registerUser);

// @route   POST /api/auth/verify-phone
// @desc    Step 2 of Registration: Verify phone OTP and send email OTP
router.post('/verify-phone', verifyPhone);

// @route   POST /api/auth/verify-email
// @desc    Step 3 of Registration: Verify email OTP and complete registration
router.post('/verify-email', verifyEmail);

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
router.post('/login', loginUser);

module.exports = router;
