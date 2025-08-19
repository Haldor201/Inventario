import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Nav_P() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand><Link className='navbar-brand' to="/">Quantic Technology</Link></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><Link className='nav-link' to="/Transceivers">SFP+</Link></Nav.Link>
            <Nav.Link><Link className='nav-link' to="/Devices">Equipos</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}