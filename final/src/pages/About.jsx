import React from 'react';
import aboutImg from '../assets/founder.jpg';
import harshikaImg from '../assets/harshika.jpg';
import jayImg from '../assets/jay.png';
import janhviImg from '../assets/jhanvi.jpg';
import addyaImg from '../assets/addya.jpg';
import parikramaImg from '../assets/parikrama.jpg';
import { Instagram, Linkedin } from 'lucide-react';
import './About.css';

export default function About() {
  const coreValues = [
    { icon: '🕉️', title: 'Authenticity', description: 'We honor genuine spiritual practice...' },
    { icon: '💝', title: 'Compassion', description: 'Love and kindness form the foundation...' },
    { icon: '🌟', title: 'Unity', description: 'We believe in the interconnectedness...' },
    { icon: '🧘', title: 'Transformation', description: 'We are dedicated to facilitating...' }
  ];

  const teamMembers = [
    { name: 'Harshika Singh', designation: 'Co-Founder & CTO', description: 'Combines her technical expertise with expceptional communication skills, ensuring that Mannka platform is not only top-notch but also user-friendly.', image: harshikaImg, instagram: 'https://www.instagram.com/harshika4662/', linkedin: 'https://www.linkedin.com/in/harshika9415' },
    { name: 'Addya Mishra', designation: 'Frontend Developer', description: 'She creates beautiful online experience,making our website looks great and work seamlessly.', image:addyaImg, instagram: '#', linkedin: 'https://www.linkedin.com/in/addyam777' },
    { name: 'Janhvi Singh', designation: 'Creative Design Head', description: 'She paints our Mannka Story with Creativity & Crafting designs.', image:janhviImg , instagram: '#', linkedin: '#' },
    { name: 'Jay Kishan Dhurwe', designation: 'Backend Developer', description: 'He is our tech wizard , quietly working behind the scenes to ensure everything runs perfectly.', image: jayImg, instagram: '#', linkedin: '#' },
    { name: 'Parikrama Borah', designation: 'Content Writer', description: 'Se is the storyteller that help people feel connected every spiritual journey that we offer.',image: parikramaImg, instagram: 'https://www.instagram.com/pari_krama_', linkedin: 'https://www.linkedin.com/in/parikrama-borah-068166357' }
  ];

  const stats = [
    { number: '200+', label: 'Visitors Connected' },
    { number: '50+', label: 'Local Guides' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="aboutus font-serif">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Our Sacred Journey</h1>
          <p>Walking the path of enlightenment together</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story">
        <div className="story-container">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              Aditya Chaturvedi, the visionary Founder and CEO of Mannka Darshan, hails from Varanasi, a city known for its rich cultural and spiritual heritage. 
              His entrepreneurial journey began during his internship in Delhi, where he worked closely with D2C brands in the puja accessories market. It was during this time that he identified a significant gap in the way devotees experienced temple visits... long queues, overcrowding, and exploitation.
              The idea for Mannka Darshan was solidified after a personal experience at the Baidyanath Temple, where Aditya faced firsthand the frustrations that many devotees endure. 
              This moment sparked his passion to create a solution, and thus, Mannka was born.
              Aditya’s mission is to revolutionize temple pilgrimages by offering organized, scam-free, and enriching spiritual journeys. His vision extends beyond major cities, aiming to bring Mannka’s services to villages and remote areas, ensuring every devotee enjoys a peaceful and meaningful experience.
            </p>
            <div className="stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat">
                  <div className="number">{stat.number}</div>
                  <div className="label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="story-image">
            <img src={aboutImg} alt="Mr. Aditya Chaturvedi" />
            <div className="founder-info">
              <div className="name">Mr. Aditya Chaturvedi</div>
              <div className="role">Founder & CEO</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-mission">
        <div className="vision">
          <h3>Our Vision</h3>
          <p>In a world filled with chaos and exploitation, where visits to temples are often marred by overcrowding, scams, and confusion, we envision a different reality.
             A reality where every spiritual journey is filled with peace, authenticity, and a deep connection to faith.
             At Mannka, we aim to create a future where every devotee, whether from bustling cities or rural corners, can experience a seamless, meaningful pilgrimage. 
             We are committed to offering organized, scam-free spiritual journeys that connect individuals to the true essence of their faith.
             From the busiest cities to the most serene villages, we strive to make every prominent temple of India accessible, allowing each soul’s journey to be as transformative as it is sacred.</p>
        </div>
        <div className="mission">
          <h3>Our Mission</h3>
          <p>At Mannka, our mission is simple but powerful. To revolutionize the way we experience temple pilgrimages. 
            We’re here to eliminate the stress of long queues, exploitation, and chaotic rituals. With well-managed, authentic experiences led by real pandits, we create journeys that are not only spiritual but also enriching. 
            Whether it's sharing the stories of temples or ensuring a peaceful darshan, Mannka is dedicated to helping every devotee connect to the divine in the most serene and meaningful way possible.</p>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          {coreValues.map((value, index) => (
            <div key={index} className="value-card">
              <div className="icon">{value.icon}</div>
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="team">
        <h2>Meet Our Team</h2>
        <p>At Mannka , we are a group of passionate individuals working together to bring you Meaningful and peaceful spiritual journeys.
            Here's a little about the people who make it all happen.</p>
        
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.image} alt={member.name} />
              <h4>{member.name}</h4>
              <p className="designation">{member.designation}</p>
              <p className="description">{member.description}</p>
              <div className="socials">
                <a href={member.instagram}><Instagram size={18} /></a>
                <a href={member.linkedin}><Linkedin size={18} /></a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
