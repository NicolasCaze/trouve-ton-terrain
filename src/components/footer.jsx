import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '../assets/logo-bootcamp.png'; 
import '../index.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo */}
        <div className="footer-logo">
          <img src={logo} alt="Logo" className="footer-logo-img" />
        </div>

        {/* Liens réseaux sociaux */}
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="footer-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="footer-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="footer-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
