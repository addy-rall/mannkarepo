import React from 'react';
import "../App.css";
import logo from "../assets/logo (1).svg";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section company-info">
            <img src={logo} alt="Logo" className="footer-logo-img" />
          <span className="footer-logo"> Mannka</span>
         
          <p>Connecting souls with sacred spaces worldwide. Discover the beauty, history, and spirituality of temples across cultures and traditions.</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>  
        <div className="footer-section footer-links">
          <h4>Explore</h4>
          <ul>     
            <li><a href="#">All Temples</a></li>
            <li><a href="#">Hindu Temples</a></li>
            <li><a href="#">Buddhist Temples</a></li>
            <li><a href="#">Sikh Gurdwaras</a></li>
            <li><a href="#">Top Destinations</a></li>
          </ul>
        </div>
        <div className="footer-section footer-links">
          <h4>Services</h4>
          <ul>
            <li><a href="#">Guided Tours</a></li>
            <li><a href="#">Meditation Retreats</a></li>
            <li><a href="#">Spiritual Workshops</a></li>
            <li><a href="#">Cultural Experiences</a></li>
            <li><a href="#">Book Your Visit</a></li>
          </ul>
        </div>
        <div className="footer-section footer-links">
          <h4>Support</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Travel Tips</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-cta">
          <button className="cta-button">Spiritual Journey Awaits</button>
          <span className="support-text">24/7 Support Available</span>
        </div>
        <div className="footer-legal">
          <p>&copy; 2025 Mannka. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
