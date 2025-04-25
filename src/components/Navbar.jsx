import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import jwtDecode from "jwt-decode";
import logo from '../assets/sofapp-logo.svg';
import { Link } from "react-router-dom";

function CustomNavbar() {
  const { token, logout } = useContext(UserContext);
  const decodedToken = token ? jwtDecode(token) : null;
  const nombreUsuario = decodedToken ? decodedToken.nombre : null;
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/home">
        <div className="d-flex align-items-center">
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top me-2"
            alt="Sofapp logo"
          />
          Sofapp
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to={'/'}>Inicio</Nav.Link>
          <Nav.Link as={Link} to={'/products'}>Productos</Nav.Link>
          <Nav.Link as={Link} to={'/policies'}>Políticas</Nav.Link>

        </Nav>
        <Nav>
          {!token ? (
            <>
              <Nav.Link as={Link} to={"/register"} className='d-flex align-items-center'>Registro</Nav.Link>
              <Button variant="warning">
                <Nav.Link as={Link} to={"/login"}>Iniciar sesión</Nav.Link>
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to={"/profile"}>Perfil</Nav.Link>
              <Nav.Link as={Link} to={"/CreatePost"}>Crear Publicación</Nav.Link>
              <Nav.Link as={Link} to={"/MyProducts"}>Mis Productos</Nav.Link>
              <div className="navbar-text me-3">
                Bienvenido, <div>{nombreUsuario}</div>
              </div>
              <Button variant="danger" onClick={logout}>
                Cerrar sesión
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default CustomNavbar;