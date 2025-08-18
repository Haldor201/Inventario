import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Nav_P() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Quantic Technology</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">SFP+</Nav.Link>
            <Nav.Link href="#features">Equipos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}