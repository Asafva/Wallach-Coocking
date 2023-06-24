import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css'
import './Header.css'

function Header() {
  return (
    <div className='Header'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"> Wallach-Coocking 🔪</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <NavDropdown.Item href="meat">Meat 🥩</NavDropdown.Item>
              <NavDropdown.Item href="search">
              Search 🔍
              </NavDropdown.Item>
            </NavDropdown> */}
              <Nav.Link href="about">About</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="add">
                ➕
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}



export default Header