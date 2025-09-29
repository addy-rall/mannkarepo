import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages/components
import Home from "./pages/Home";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />

        
        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;