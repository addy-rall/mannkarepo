import React from "react";
import "../App.css"; // import the CSS file

import mandirHistory from "../assets/Mandir history.jpg";
import guideIcon from "../assets/new_icon_pandit.jpg";
import pujaIcon from "../assets/PUJA RITUALS_1.jpg";
import supportIcon from "../assets/icon digital.jpg";
import peaceIcon from "../assets/new_icon_peace2.jpg";

const FeaturesSection = () => {
  return (
    <>
      <header className="header-section">
        <div className="container-1">
          <h1 className="main-title">Why Choose Mannka?</h1>
          <p className="subtitle">
            We're dedicated to connecting you with the world's most sacred
            spaces through authentic, respectful, and transformative experiences.
          </p>
        </div>
      </header>   

      <section className="features-section">
        <div className="container-1">
          <div className="features-grid">

            <div className="feature-card">
              <div className="feature-icon">
                <img src={mandirHistory} alt="Mandir History" />
              </div>
              <h3 className="feature-title">Rich History</h3>
              <p className="feature-description">
                Detailed historical insights, architectural significance, and
                cultural context for every temple.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img src={guideIcon} alt="Guide" />
              </div>
              <h3 className="feature-title">Expert Guides</h3>
              <p className="feature-description">
                Connect with knowledgeable local guides who share deep
                understanding of spiritual traditions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img src={pujaIcon} alt="Puja Rituals" />
              </div>
              <h3 className="feature-title">Verified Reviews</h3>
              <p className="feature-description">
                Authentic visitor experiences and testimonials to help you plan
                your spiritual journey.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img src={supportIcon} alt="24/7 Support" />
              </div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-description">
                Round-the-clock assistance for bookings, travel tips, and
                spiritual guidance.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img src={peaceIcon} alt="Peaceful Experience" />
              </div>
              <h3 className="feature-title">Peaceful Experience</h3>
              <p className="feature-description">
                Carefully planned visits that respect temple traditions and
                enhance your spiritual connection.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
