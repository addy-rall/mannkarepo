import React from "react";
import "../App.css"; // import the CSS file
import author1 from "../assets/profile1.jpg";
import author2 from "../assets/profile2.jpg";
import author3 from "../assets/profile3.webp";    

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <h2>What People Say About Us</h2>
      <div className="testimonials-container">
        <div className="testimonial-card">
          <p>
            "Great service! They really helped us attain a serene experience."
          </p>       
          <div className="testimonial-author">
            <img src={author1} alt="Author 1" />
            <span>Rohan Srivastava</span>
          </div>
          </div>
          <div className="testimonial-card">
          <p>
            "One of the best services I had experienced in my life ."
          </p>
          <div className="testimonial-author">
            <img src={author2} alt="Author 2" />
            <span>Smita Tripathi</span>
          </div>
          </div>
          <div className="testimonial-card">
          <p>
          "Loved the service! Very Helpful. Indeed a life changer "
          </p>
          <div className="testimonial-author">
            <img src={author3} alt="Author 3" />
            <span>Shruti Sharma</span>
          </div>
          </div>
          </div>
    </section>
  );
};

export default TestimonialsSection;
