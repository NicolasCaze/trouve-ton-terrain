import logo from '../assets/logo-bootcamp.png'; 
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import '../index.css'; 

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      {/* Conteneur principal pour les 3 sections */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Liens réseaux sociaux */}
        <div className="flex flex-col items-start">
          <h4 className="mb-2 font-semibold">Suivez-nous</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="footer-icon text-white hover:text-blue-500 transition-all" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="footer-icon text-white hover:text-pink-500 transition-all" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="footer-icon text-white hover:text-blue-400 transition-all" />
            </a>
          </div>
        </div>

        {/* Documentation et ressources */}
        <div className="flex flex-col items-center">
          <h4 className="mb-2 font-semibold">Documentation</h4>
          <ul className="space-y-2">
            <li><a href="#docs" className="hover:underline">Guide de démarrage</a></li>
            <li><a href="#api" className="hover:underline">API</a></li>
            <li><a href="#support" className="hover:underline">Support technique</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="w-40 hover:scale-105 transition-transform" />
        </div>
      </div>

      {/* Trait horizontal */}
      <hr className="border-gray-600 my-4" />

      {/* Copyright centré */}
      <div className="text-center text-gray-400">
        &copy; 2024 Votre Entreprise. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;
