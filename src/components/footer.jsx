import logo from '../assets/logo-bootcamp.png'; 
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../index.css'; 
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-teal-200 text-white py-4">
      {/* Conteneur principal pour les 3 sections */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Liens réseaux sociaux */}
        <div className="flex flex-col items-start">
          <h4 className="mb-2 font-semibold " style={{color:"black"}}>Suivez-nous</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="footer-icon text-black hover:text-blue-500 transition-all" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="footer-icon text-black hover:text-pink-500 transition-all" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaSquareXTwitter className="footer-icon text-black hover:text-blue-400 transition-all" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="footer-icon text-black hover:text-blue-400 transition-all" />
            </a>
          </div>
        </div>

        {/* Documentation et ressources */}
        <div className="flex flex-col items-center">
          <h4 className="mb-2 font-semibold" style={{color:"black"}}>Documentation</h4>
          <ul className="space-y-2">
            <li><a href="#docs" className="hover:underline" style={{color:"black"}}>La doc utilisée (ReactJs, Tailwind, react-bootstrap)</a></li>
            <li><a href="#api" className="hover:underline" style={{color:"black"}}>API</a></li>
          </ul>
        </div>

        {/* Logo */}
        <div className="flex justify-end">
          <img src={logo} alt="Logo" className="w-40 hover:scale-105 transition-transform" />
        </div>
      </div>

      {/* Trait horizontal */}
      <hr className="border-gray-600 my-4" />

      {/* Copyright centré */}
      <div className="text-center text-stone-950">
        &copy; 2024 @Les sans nom. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;
