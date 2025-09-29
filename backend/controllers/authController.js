// =============================================================================
// || AUTHENTICATION CONTROLLER                                               ||
// =============================================================================
// || This file contains the business logic for handling all authentication   ||
// || requests. It interacts with the User model to perform database          ||
// || operations.                                                             ||
// =============================================================================

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateOTP } = require('../utils/otpHelper');

const JWT_SECRET = process.env.JWT_SECRET || 'a-very-strong-secret-key-for-jwt';

// --- Controller for Step 1: Registration Details ---
exports.registerUser = async (req, res) => {
    const { name, age, phone, email, city, state, password } = req.body;

    try {
        let user = await User.findOne({ $or: [{ email }, { phone }] });
        if (user && user.isVerified) {
            return res.status(400).json({ msg: 'User with this email or phone already exists' });
        }

        const phoneOtp = generateOTP();
        const phoneOtpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        if (user && !user.isVerified) {
            user.name = name;
            user.age = age;
            user.city = city;
            user.state = state;
            user.password = password;
            user.phoneOtp = phoneOtp;
            user.phoneOtpExpires = phoneOtpExpires;
            await user.save();
        } else {
            user = new User({
                name, age, phone, email, city, state, password, phoneOtp, phoneOtpExpires,
            });
            await user.save();
        }

        console.log(`[DEMO] Phone OTP for ${phone} is: ${phoneOtp}`);
        res.status(201).json({ msg: 'Registration details received. Please verify your phone.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// --- Controller for Step 2: Verify Phone OTP ---
exports.verifyPhone = async (req, res) => {
    const { phone, phoneOtp } = req.body;
    try {
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(400).json({ msg: 'User not found. Please register first.' });
        }

        if (user.phoneOtp !== phoneOtp || user.phoneOtpExpires < Date.now()) {
            return res.status(400).json({ msg: 'Invalid or expired OTP.' });
        }
        
        const emailOtp = generateOTP();
        user.phoneOtp = undefined;
        user.phoneOtpExpires = undefined;
        user.emailOtp = emailOtp;
        user.emailOtpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        
        await user.save();

        console.log(`[DEMO] Email OTP for ${user.email} is: ${emailOtp}`);
        res.status(200).json({ msg: 'Phone verified. Please verify your email.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// --- Controller for Step 3: Verify Email OTP ---
exports.verifyEmail = async (req, res) => {
    const { email, emailOtp } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found. Please register first.' });
        }

        if (user.emailOtp !== emailOtp || user.emailOtpExpires < Date.now()) {
            return res.status(400).json({ msg: 'Invalid or expired OTP.' });
        }

        user.isVerified = true;
        user.emailOtp = undefined;
        user.emailOtpExpires = undefined;
        await user.save();
        
        const payload = { user: { id: user.id } };
        jwt.sign(payload, JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token, msg: 'Registration successful! Welcome to Mannka.' });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// --- Controller for User Login ---
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user || !user.isVerified) {
            return res.status(400).json({ msg: 'Invalid credentials or user not verified' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(payload, JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
