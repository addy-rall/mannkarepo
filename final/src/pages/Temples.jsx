import React, { useState } from 'react';

const Temples = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    people: "",
    requirements: "",
    terms: false
  });
  const [successMessage, setSuccessMessage] = useState("");

  const temples = [
    { id: 1, name: "Golden Temple", location: "Amritsar, Punjab", timings: "Open 24 hours", image: "🛕" },
    { id: 2, name: "Vaishno Devi", location: "Katra, Jammu", timings: "5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM", image: "⛰️" },
    { id: 3, name: "Tirupati Balaji", location: "Tirupati, Andhra Pradesh", timings: "2:30 AM - 1:45 AM (next day)", image: "🕉️" },
    { id: 4, name: "Meenakshi Temple", location: "Madurai, Tamil Nadu", timings: "5:00 AM - 12:30 PM, 4:00 PM - 10:00 PM", image: "🏛️" },
    { id: 5, name: "Somnath Temple", location: "Prabhas Patan, Gujarat", timings: "6:00 AM - 9:00 PM", image: "🔱" },
    { id: 6, name: "Kedarnath Temple", location: "Kedarnath, Uttarakhand", timings: "4:00 AM - 9:00 PM (seasonal)", image: "🏔️" }
  ];

  const handleBookDarshan = (temple) => {
    setSelectedTemple(temple);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTemple(null);
    setSuccessMessage("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      temple: selectedTemple.name,
      ...formData,
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setSuccessMessage("✅ Your darshan booking has been submitted successfully!");
        setFormData({
          firstName: "", lastName: "", email: "", phone: "",
          date: "", time: "", people: "", requirements: "", terms: false
        });
      } else {
        setSuccessMessage("❌ Failed to submit booking. Please try again.");
      }
    } catch (error) {
      setSuccessMessage("⚠️ Server error. Please try later.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-orange-600 mb-2">Sacred Temples</h1>
      <p className="text-gray-600 mb-8">Explore divine destinations and book your spiritual journey</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {temples.map((temple) => (
          <div key={temple.id} className="bg-white border border-orange-200 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-8 text-center">
              <span className="text-6xl">{temple.image}</span>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-orange-700 mb-2">{temple.name}</h3>
              <p className="text-gray-600 mb-4 flex items-center text-sm">
                <span className="mr-2">🕐</span> {temple.timings}
              </p>
              <button 
                onClick={() => handleBookDarshan(temple)}
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition duration-300 font-medium shadow-md"
              >
                Book Darshan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedTemple && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-black">✖</button>
            <h2 className="text-2xl font-bold text-orange-600 mb-2">Book Darshan</h2>
            <p className="text-gray-600 mb-4">{selectedTemple.name}, {selectedTemple.location}</p>

            {successMessage ? (
              <div className="p-4 bg-green-100 text-green-700 rounded">{successMessage}</div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                  <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-1/2 border p-2 rounded" required />
                  <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-1/2 border p-2 rounded" required />
                </div>
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" required />
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" required />

                <div className="flex gap-4">
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-1/2 border p-2 rounded" required />
                  <select name="time" value={formData.time} onChange={handleChange} className="w-1/2 border p-2 rounded" required>
                    <option value="">Select Time</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>

                <select name="people" value={formData.people} onChange={handleChange} className="w-full border p-2 rounded" required>
                  <option value="">Number of People</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>

                <textarea name="requirements" placeholder="Special Requirements" value={formData.requirements} onChange={handleChange} className="w-full border p-2 rounded" rows="3"></textarea>
                
                <div className="flex items-center">
                  <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} className="mr-2" required />
                  <p className="text-sm text-gray-600">I agree to the terms and conditions.</p>
                </div>

                <div className="flex justify-end gap-4">
                  <button type="button" onClick={closeModal} className="px-4 py-2 border rounded">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">Book Darshan</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Temples;
