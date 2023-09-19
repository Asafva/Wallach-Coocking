import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import './Header.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Header() {
  const [currentUser, setCurrentUser] = useState([])
  const token = localStorage.getItem("user").replace(/['"]+/g, '')
  // const token = localStorage.getItem("user")
  const navigate = useNavigate();


  // const showCurrentUser = () => {
  //   axios.get('http://localhost:5001/users/current', {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then((result) => {
  //       // console.log(result.data);
  //       setCurrentUser(result.data)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }

  const logOut = () => {
    localStorage.setItem("user", '');
    navigate("/login");
    window.location.reload();
  }

  const adminPage = () => {
    navigate("/admin");
    window.location.reload();
  }

  useEffect(() => {
    axios.get('http://localhost:5001/users/current', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((result) => {
        // console.log(result.data);
        setCurrentUser(result.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])


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
              {currentUser.isAdmin === true &&
                <Nav.Link href="add" >
                  ➕
                </Nav.Link>

              }

              <NavDropdown title={"👤 " + currentUser.username}>

                <div><u>Email:</u> {currentUser.email}</div>
                <br />
                <button onClick={logOut} >Logout</button>
                <hr />
                <button onClick={adminPage}>
                  Admin
                </button>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div >
  );
}



export default Header