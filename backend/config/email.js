// config/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // app password (16 chars)
  }
});

// verify connection configuration once at startup
transporter.verify((err, success) => {
  if (err) {
    console.error('❌ Nodemailer verify failed:', err);
  } else {
    console.log('✅ Nodemailer is ready to send messages');
  }
});

module.exports = transporter;
