import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; 
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { SfpContext } from '../context/GeneralContext.jsx'

export default function Nav_P() {
  const { fetchLogout } = useContext(SfpContext);


  const handleLogout = async () => {
    try {
      await fetchLogout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un problema al cerrar la sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand><Link className='navbar-brand' to="/">Quantic Technology</Link></Navbar.Brand>
          <Nav className="me-auto">
            <Link className='nav-link' to="/Transceivers">SFP+</Link>
            <Link className='nav-link' to="/Devices">Equipos</Link>
            <Link className='nav-link' to="/Account">Cuenta</Link>
          </Nav>
          <Nav>
            {/* Botón de Cerrar Sesión */}
            <Button 
                onClick={handleLogout} 
                variant="outline-light" 
                className="ms-3"
            >
                Cerrar Sesión
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}