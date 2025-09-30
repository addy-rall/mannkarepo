import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-orange-600 mb-4">About Us</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg mb-4">
          We are dedicated to preserving and sharing the rich heritage of temples across India. Our mission is to connect devotees with sacred places and provide comprehensive information about their history, significance, and cultural importance.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          With years of research and collaboration with temple authorities, we bring you accurate and detailed information about each sacred destination.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-gray-700 font-medium">🙏 Respect for all faiths and traditions</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-gray-700 font-medium">📚 Authentic and accurate information</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-gray-700 font-medium">🌟 Promoting spiritual tourism</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-gray-700 font-medium">❤️ Preserving cultural heritage</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">What We Offer</h2>
        <p className="text-gray-700 mb-3">
          Our platform provides comprehensive temple information including darshan timings, booking facilities, travel guides, and historical context to enhance your spiritual journey.
        </p>
        <p className="text-gray-700">
          We continuously update our database to ensure you have access to the latest information and the most convenient booking options for your temple visits.
        </p>
      </div>
    </div>
  );
};

export default About;