import "../App.css";
import logo from "../assets/logo (1).svg";

function Header() {
  return (
    <header className="header">
      <div className="logo-container"> 
        <img src={logo} alt="Temple Explorer Logo" />
        <div className="logo-text">
          <h1>Mannka</h1>
          <p>Mann se mandir</p>
        </div>
      </div>
      <nav>
        <a href="#">Home</a>
        <a href="#">Temples</a>
        <a href="#">About Us</a>
        <a href="#">Contact</a>
      </nav>
      <button className="book-btn">Book Visit</button>
    </header>
  );
}

export default Header;