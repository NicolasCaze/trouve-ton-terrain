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
    <div className="flex justify-between items-center text-black py-4 bg-teal-100 drop-shadow-xl rounded-2xl shadow-lg">
      <a href="/">
        <img
          src={logo}
          alt="Logo"
          className="w-24 ml-8 hover:scale-105 transition-al"
        />
      </a>

      <div className="relative hidden md:flex items-center justify-center gap-3"></div>

      <div className="flex justify-center items-center bg-teal-200 drop-shadow-md rounded-lg shadow-lg p-4 mr-7">
        <h1 className="text-center mr-10 ">
          <motion.span
            className="inline-block"
            variants={sentence}
            initial="hidden"
            animate="visible"
          >
            {"Découvrez votre prochain complexe sportif en un clin d'œil avec YSportMap, votre guide interactif des terrains de sport. Pour des activités près de chez vous !"
              .split("")
              .map((char, index) => (
                <motion.span key={index} variants={letter}>
                  {char}
                </motion.span>
              ))}
          </motion.span>
        </h1>
      </div>
    </div>
  );
}

export default Header;
