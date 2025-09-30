import React from 'react';

const Temples = () => {
  const temples = [
    { 
      id: 1,
      name: "Golden Temple", 
      location: "Amritsar, Punjab", 
      description: "The holiest Gurdwara of Sikhism, known for its stunning golden architecture and spiritual significance.",
      timings: "Open 24 hours",
      image: "🛕"
    },
    { 
      id: 2,
      name: "Vaishno Devi", 
      location: "Katra, Jammu", 
      description: "Sacred Hindu temple dedicated to Goddess Vaishno Devi, located in the Trikuta Mountains.",
      timings: "5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
      image: "⛰️"
    },
    { 
      id: 3,
      name: "Tirupati Balaji", 
      location: "Tirupati, Andhra Pradesh", 
      description: "One of the richest and most visited temples in the world, dedicated to Lord Venkateswara.",
      timings: "2:30 AM - 1:45 AM (next day)",
      image: "🕉️"
    },
    { 
      id: 4,
      name: "Meenakshi Temple", 
      location: "Madurai, Tamil Nadu", 
      description: "Historic Hindu temple with stunning Dravidian architecture and vibrant gopurams.",
      timings: "5:00 AM - 12:30 PM, 4:00 PM - 10:00 PM",
      image: "🏛️"
    },
    { 
      id: 5,
      name: "Somnath Temple", 
      location: "Prabhas Patan, Gujarat", 
      description: "First among the twelve Jyotirlinga shrines of Lord Shiva, with a rich historical legacy.",
      timings: "6:00 AM - 9:00 PM",
      image: "🔱"
    },
    { 
      id: 6,
      name: "Kedarnath Temple", 
      location: "Kedarnath, Uttarakhand", 
      description: "One of the Char Dham pilgrimage sites, located in the Himalayan ranges.",
      timings: "4:00 AM - 9:00 PM (seasonal)",
      image: "🏔️"
    }
  ];

  const handleBookDarshan = (templeName) => {
    alert(`Booking Darshan for ${templeName}\n\nYou will be redirected to the booking portal.`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-orange-600 mb-2">Sacred Temples</h1>
      <p className="text-gray-600 mb-8">Explore divine destinations and book your spiritual journey</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {temples.map((temple) => (
          <div key={temple.id} className="bg-white border border-orange-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-8 text-center">
              <span className="text-6xl">{temple.image}</span>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-orange-700 mb-2">{temple.name}</h3>
              <p className="text-gray-600 mb-3 flex items-center">
                <span className="mr-2">📍</span> {temple.location}
              </p>
              <p className="text-gray-700 mb-3 text-sm leading-relaxed">{temple.description}</p>
              <p className="text-gray-600 mb-4 flex items-center text-sm">
                <span className="mr-2">🕐</span> {temple.timings}
              </p>
              
              <button 
                onClick={() => handleBookDarshan(temple.name)}
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition duration-300 font-medium shadow-md"
              >
                Book Darshan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Temples;