import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages/components
import Home from "./pages/Home";

import NotFound from "./pages/NotFound";
import Temples from "./pages/Temples";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/temples" element={<Temples />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;