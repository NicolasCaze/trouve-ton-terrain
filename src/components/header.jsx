/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate(); 
  const handleClick = () => {
    navigate('/'); 
  };
  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary mt-3 py-4" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Container>
        <Navbar.Brand href="#home">Trouve ton terrain</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
}

export default Header;
