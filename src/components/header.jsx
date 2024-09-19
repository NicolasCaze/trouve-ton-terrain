/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/*import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Header({ searchResults }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mt-3 py-4 mb-5" >
      <Container>
        <Navbar.Brand href="#home">Trouve ton terrain</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
}

export default Header;*/
import CarouselImages from '../components/caroussel';
import logo from "../assets/logo-bootcamp.png";
import "../index.css";
import { motion } from "framer-motion";

function Header({ searchResults }) {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <div>
      
      <a href="/">
        <img 
          src={logo}
          alt="Logo"
          className="absolute top-0 left-0 w-40 ml-2 hover:scale-105 transition-all"
        />
      </a>
    </div>
  );
}

export default Header;
