/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

export default Header;
