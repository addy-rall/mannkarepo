import React, { useState } from 'react';
import A from "../assets/annapurnaTemple.jpg";
import B from "../assets/BankeBihari.webp";
import C from "../assets/Durga Mata mandir.jpg";
import D from "../assets/KaalBhairav.jpg";
import E from "../assets/KashiVishanath.jpg";
import F from "../assets/RamMandir.jpg";
import '../temp.css';

// Temple data
const temples = [
  {
    id: 1,
    name: "Annapurna Temple",
    shortDescription: "Maa Annapurna's presence in Varanasi is a symbol of divine sustenance. It is believed that she fulfills the basic needs of her devotees by providing abundance and spiritual strength....",
    location: "Varanasi, Uttar Pradesh",
    rating: 4,
    ratingCount: 6,
    imageUrl: A,
    details: {
      timing: "5:00 AM - 12:00 PM, 4:00 PM - 11:00 PM",
      dressCode: "Traditional Indian attire is preferred.",
    },
    tags: ["Ancient Temple", "Divine Sustenance", "Varanasi Heritage"],
    bookingLink: "/book-annapurna",
    detailsUrl: "/temple/annapurna-temple", 
  },
  {
    id: 2,
    name: "Banke Bihari Temple",
    shortDescription: "Worshippers who seek the divine grace of Lord Krishna in his childhood form, known as Banke Bihari, often for inner peace, harmony, and spiritual fulfillment....",
    location: "Vrindavan, Uttar Pradesh",
    rating: 4.7,
    ratingCount: 22175,
    imageUrl: B,
    details: {
      timing: "7:45 AM - 12:00 PM, 5:30 PM - 9:30 PM (Varies seasonally)",
      dressCode: "Modest clothing is recommended.",
    },
    tags: ["Lord Krishna", "Vrindavan Pilgrimage", "Spiritual Bliss", "Bihari Ji"],
    bookingLink: "/book-bankebihari",
    detailsUrl: "/temple/banke-bihari-temple",
  },
  {
    id: 3,
    name: "Durga Mata Mandir",
    shortDescription: "The Durga Mandir is one of the oldest temples in Varanasi, mentioned in the sacred text Kashi Khand...",
    location: "Varanasi, Uttar Pradesh",
    rating: 4.6,
    ratingCount: 56,
    imageUrl: C,
    details: {
      timing: "5:00 AM - 10:00 PM",
      dressCode: "No specific restrictions, but modest wear is appreciated.",
    },
    tags: ["Goddess Durga", "Ancient Site", "Varanasi Landmark"],
    bookingLink: "/book-durga",
    detailsUrl: "/temple/durga-mata-mandir",
  },
  {
    id: 4,
    name: "Kaal Bhairav Temple",
    shortDescription: "Revered as the Kotwal (police chief) of Kashi, this temple is dedicated to the fierce manifestation of Lord Shiva. Visiting him is mandatory for a complete Kashi Yatra...",
    location: "Varanasi, Uttar Pradesh",
    rating: 4.7,
    ratingCount: 515,
    imageUrl: D,
    details: {
      timing: "5:00 AM - 1:30 PM, 4:30 PM - 9:30 PM (Varies seasonally)",
      dressCode: "Leather items are often restricted; modest dress is required.",
    },
    tags: ["Lord Shiva", "Kotwal of Kashi", "Ancient", "Tantric", "Fierce Form"],
    bookingLink: "/book-kaalbhairav",
    detailsUrl: "/temple/kaal-bhairav-temple",
  },
  {
    id: 5,
    name: "Kashi Vishwanath Temple",
    shortDescription: "The Kashi Vishwanath Temple, situated on the banks of the sacred river Ganges, is one of the twelve Jyotirlingas, making it the holiest abode of Lord Shiva...",
    location: "Varanasi, Uttar Pradesh",
    rating: 4.7,
    ratingCount: 515,
    imageUrl: E,
    details: {
      timing: "2:30 AM to 11:00 PM (subject to Aarti timings)",
      dressCode: "Strictly modest; western clothing (jeans/trousers) may be restricted inside the Garbhagriha.",
    },
    tags: ["Jyotirlinga", "Lord Shiva", "Golden Temple", "Ganga Corridor", "Moksha"],
    bookingLink: "/book-kashivishwanath",
    detailsUrl: "/temple/kashi-vishwanath-temple",
  },
  {
    id: 6,
    name: "Ram Mandir",
    shortDescription: "The magnificent temple built at the sacred Ram Janmabhoomi, the birthplace of Lord Ram. Constructed in the traditional Nagara style without using iron or steel...",
    location: "Ayodhya, Uttar Pradesh",
    rating: 4.9,
    ratingCount: 1500000,
    imageUrl: F,
    details: {
      timing: "7:00 AM - 11:30 AM, 2:00 PM - 7:00 PM (Aarti slots require passes)",
      dressCode: "Modest and respectful attire is strongly recommended.",
    },
    tags: ["Ram Janmabhoomi", "Nagara Style", "Lord Rama", "Modern Architecture", "Pilgrimage"],
    bookingLink: "/book-rammandir",
    detailsUrl: "/temple/ram-mandir",
  },
];

const TemplesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
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

  // Search filter
  const filteredTemples = temples.filter(temple =>
    temple.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modal open
  const handleBookDarshan = (temple) => {
    setSelectedTemple(temple);
    setShowModal(true);
  };

  // Modal close
  const closeModal = () => {
    setShowModal(false);
    setSelectedTemple(null);
    setSuccessMessage("");
  };

  // Form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Form submit (backend POST)
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
    <div className="temple-listing-container">
      <h1 className="main-heading">Sacred Temples of Uttar Pradesh</h1>
      <h2 className="sub">Discover the divine heritage of Uttar Pradesh through its magnificent temples. Book your darshan online and experience spiritual bliss.</h2>
      {/* Search Bar Section */}
      <div className="search-bar-section">
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21.71 20.29l-4.13-4.13A8.995 8.995 0 0018 10a9 9 0 10-9 9 8.995 8.995 0 005.16-1.57l4.13 4.13a1 1 0 001.42 0 1 1 0 000-1.42zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search for temple"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="temple-grid">
        {filteredTemples.map(temple => (
          <div key={temple.id} className="temple-card">
            <img src={temple.imageUrl} alt={temple.name} className="temple-image" />
            <div className="temple-info">
              <h3 className="temple-title">{temple.name}</h3>
              <p className="temple-location">{temple.location}</p>
              <p className="temple-short">{temple.shortDescription}</p>
              <div className="temple-tags">
                {temple.tags.map(tag => (
                  <span key={tag} className="temple-tag">{tag}</span>
                ))}
              </div>
              <div className="temple-actions">
                <button
                  className="book-btn"
                  onClick={() => handleBookDarshan(temple)}
                >
                  Book Darshan
                </button>
                {/* You can add a "Read More" button here if you want */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedTemple && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md bg-opacity-40 flex justify-center items-center z-50 width-full">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-black">✖</button>
            <h2 className="text-2xl font-bold text-orange-600 mb-2">Book Darshan</h2>
            <p className="text-gray-600 mb-4">{selectedTemple.name}, {selectedTemple.location}</p>

            {successMessage ? (
              <div className="p-4 bg-green-60 text-green-700 rounded">{successMessage}</div>
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

export default TemplesPage;
// ...You will need to add your own CSS or Tailwind classes for .temple-listing-container, .temple-grid, .temple-card, etc...