// =============================================================================
// || UTILITY HELPERS                                                         ||
// =============================================================================
// || This file contains helper functions that can be reused across the app.  ||
// =============================================================================

// For demo purposes, we use a static OTP. In a real production application,
// you would use a library like 'otp-generator' to create truly random, secure OTPs.
// Example:
// const otpGenerator = require('otp-generator');
// otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

exports.generateOTP = () => {
  return '123456';
};
