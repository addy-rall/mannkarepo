import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(data.msg || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-orange-600 mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">We'd love to hear from you. Send us a message!</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-orange-700 mb-6">Get In Touch</h2>
          
          {submitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              ✅ Thank you for your message! We will get back to you soon.
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              ❌ {error}
            </div>
          )}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message *</label>
              <textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                rows="5"
                placeholder="Tell us how we can help you..."
                required
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition duration-300 font-medium shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact info sidebar stays the same */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-semibold text-orange-700 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-4">📧</span>
                <div>
                  <p className="font-medium text-gray-700">Email</p>
                  <p className="text-gray-600">info@templedirectory.com</p>
                  <p className="text-gray-600">support@templedirectory.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">📞</span>
                <div>
                  <p className="font-medium text-gray-700">Phone</p>
                  <p className="text-gray-600">+91 123-456-7890</p>
                  <p className="text-gray-600">+91 987-654-3210</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">📍</span>
                <div>
                  <p className="font-medium text-gray-700">Address</p>
                  <p className="text-gray-600">Temple Directory Headquarters</p>
                  <p className="text-gray-600">New Delhi, India - 110001</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">🕐</span>
                <div>
                  <p className="font-medium text-gray-700">Business Hours</p>
                  <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-orange-700 mb-3">Quick Support</h2>
            <p className="text-gray-700 mb-4">
              For immediate assistance with temple bookings or urgent queries, please call our 24/7 helpline.
            </p>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition duration-300 font-medium">
              Call Helpline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
