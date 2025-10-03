const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com", // Gmail SMTP
  port: process.env.EMAIL_PORT || 465,              // 465 for SSL, 587 for TLS
  secure: process.env.EMAIL_SECURE === "true" || true, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,  // your email
    pass: process.env.EMAIL_PASS   // your app password
  },
  tls: {
    rejectUnauthorized: false // allow self-signed certs if needed
  }
});

// verify connection configuration once at startup
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Nodemailer verify failed:", err);
  } else {
    console.log("✅ Nodemailer is ready to send messages");
  }
});

module.exports = transporter;
