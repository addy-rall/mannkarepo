import React, { useState, useEffect } from "react";
import "../temple.css"; 
import ramMandirImg from "../assets/RamMandir.jpg";
import kashiVishwanathImg from "../assets/KashiVishanath.jpg";
import durgaMataImg from "../assets/Durga Mata mandir.jpg";
import kaalBhairavImg from "../assets/KaalBhairav.jpg";
import bankeBihariImg from "../assets/BankeBihari.webp";// move CSS here
import annapurnaImg from "../assets/annapurnaTemple.jpg";

const temples = [
  {
    name: "Kashi Vishwanath Temple",
    location: "Varanasi, Uttar Pradesh, India",
    image: kashiVishwanathImg,
    label: "Temple",
    description: "Where Lord Shiva resides eternally, blessing devotees with liberation.",
    tags: ["Shiva", "Jyotirlinga", "Moksha"],
    visitors: "1.5M visitors/year",
    established: "Est.1780",
  },
  {      
    name: "Annapurna Temple",
    location: "Varanasi, Uttar Pradesh, India",
    image: annapurnaImg,
    label: "Temple",
    description: "The divine mother who nourishes every soul with abundance.",
    tags: ["Grace", "Nourishment", "Prosperity"],
    visitors: "900K visitors/year",
    established: "Est.18th century",
  },
  {
    name: "Durga Mata Mandir",
    location: "Varanasi, Uttar Pradesh, India",
    image: durgaMataImg,
    label: "Temple",
    description: "A sanctuary of Maa Durgas fierce energy and motherly grace.",
    tags: ["Strength", "Power", "Protection"],
    visitors: "700K visitors/year",
    established: "Est.18th century",
  },
  {
    name: "Kaal Bhairav Temple",
    location: "Varanasi, Uttar Pradesh, India",
    image: kaalBhairavImg,
    label: "Temple",
    description: "The timeless guardian of Kashi, protecting devotees from evil",
    tags: ["Guardian", "Fearless", "Justice"],
    visitors: "2.2M visitors/year",
    established: "Est.17th century",
  },
  {
    name: "Ram Mandir",
    location: "Ayodhya, Uttar Pradesh, India",
    image: ramMandirImg,
    label: "Temple",
    description: "A holy abode of Lord Rama, inspiring truth, devotion, and righteousness",
    tags: ["Faith", "Dharma", "Devotion"],
    visitors: "100K visitors/day",
    established: "Est.January 2024",
  },
  {
    name: "Banke Bihari Temple",
    location: "Vrindavan, Uttar Pradesh, India",
    image: bankeBihariImg,
    label: "Temple",
    description: "Vrindavan's heart, where Krishna's playful spirit enchants all",
    tags: ["Love", "Joy", "Playfulness"],
    visitors: "5M visitors/year",
    established: "Est.1864",
  },
];

export default function Temples() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % temples.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + temples.length) % temples.length);
  };

  const toggleFavorite = (name) => {
    setFavorites((prev) =>
      prev.includes(name)
        ? prev.filter((fav) => fav !== name)
        : [...prev, name]
    );
  };

  const exploreTemple = (templeName) => {
    alert(`Exploring ${templeName}! This would navigate to the detailed temple page.`);
  };

  const viewAllTemples = () => {
    alert("Viewing all temples! This would show the complete temple directory.");
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") previousSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="container">
      <button className="nav-arrow left" onClick={previousSlide}>‹</button>
      <button className="nav-arrow right" onClick={nextSlide}>›</button>

      <div className="temples-grid">
        {Array.from({ length: 3 }).map((_, i) => {
          const templeIndex = (currentSlide + i) % temples.length;
          const temple = temples[templeIndex];
          const isFav = favorites.includes(temple.name);

          return (
            <div className="temple-card" key={temple.name}>
              <div style={{ position: "relative" }}>
                <img
                  src={temple.image}
                  alt={temple.name}
                  className="temple-image"
                />
                <div className="temple-label">{temple.label}</div>
                <button
                  className="favorite-btn"
                  onClick={() => toggleFavorite(temple.name)}
                  style={{ background: isFav ? "#fee2e2" : "white" }}
                >
                  {isFav ? "❤️" : "♡"}
                </button>
              </div>

              <div className="temple-content">
                <h3 className="temple-title">{temple.name}</h3>
                <div className="temple-location">
                  <span className="location-icon">📍</span>
                  {temple.location}
                </div>

                <p className="temple-description">{temple.description}</p>

                <div className="temple-tags">
                  {temple.tags.map((tag, index) => (
                    <span className="tag" key={index}>{tag}</span>
                  ))}
                </div>

                <div className="temple-stats">
                  <span>👥 {temple.visitors}</span>
                  <span style={{ marginLeft: "1rem" }}>🕐 {temple.established}</span>
                </div>

                <button
                  className="explore-btn"
                  onClick={() => exploreTemple(temple.name)}
                >
                  Explore Temple
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="view-all-section">
        <button className="view-all-btn" onClick={viewAllTemples}>
          View All Temples
        </button>
      </div>
    </div>
  );
}
