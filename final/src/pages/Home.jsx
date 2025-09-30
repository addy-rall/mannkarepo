import React from 'react'
import "../temple.css";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import Herobuttons from "../components/Herobuttons";
import Features from "../components/Featuressection";
import Temple from "../components/templecard";
import Testimonial from "../components/testimonial";
const Home = () => {
  return (
   <div className="main-layout">
      {/* <Header /> */}
      <section className="hero-section">
        <h1>
          <span className="yellow-text">Discover Sacred</span> <span className="highlight">Temples</span>
        </h1>
        <p>
          Explore ancient wisdom and spiritual beauty across the world's most magnificent temples
        </p>
        <Searchbar />
        <Herobuttons />
      </section>
     <Temple/>
     <Features/>
     <Testimonial/> 
     {/* <Footer/> */}
    </div>
  )
}

export default Home