// =============================================================================
// || USER MODEL                                                              ||
// =============================================================================
// || This file defines the Mongoose schema for the User document. It includes  ||
// || all user fields and a pre-save hook to automatically hash passwords.    ||
// =============================================================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  phoneOtp: String,
  phoneOtpExpires: Date,
  emailOtp: String,
  emailOtpExpires: Date,
}, { timestamps: true });

// Middleware to hash the password before saving the user document
UserSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);
