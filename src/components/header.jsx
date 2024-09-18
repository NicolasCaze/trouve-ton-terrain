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
function Header({ searchResults }) {
  return (
    <header
      className="flex justify-between items-center 
    text-black py-6 px-8 md:px-32 bg-white drop-shadow-md"
    >
      <a href="/">
        <img
          src={logo}
          alt=""
          className="w-52 hover:scale-105 transition-al"
        />
      </a>

      <ul className="idden xl:flex items-center gap-12 font-semibold text-base">
        <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointeur">
          <a>Accueil</a>
        </li>
        <li>
          <a>Services</a>
        </li>
        <li>
          <a>Contact</a>
        </li>
        <li>
          <a className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all">
            A propos
          </a>
        </li>
      </ul>

      <div className="relative hidden md:flex items-center justify-center gap-3"></div>
    </header>
  );
}

export default Header;
