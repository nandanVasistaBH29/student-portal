// react and next
import Link from "next/link";
import React from "react";
//bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Student-Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href={"/login"}>
              <Nav.Link href="/login">Login</Nav.Link>
            </Link>
            <Link href={"/register"}>
              <Nav.Link href="/register">Register</Nav.Link>
            </Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <Link href={"/admin"}>
                <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
              </Link>
              <Link href={"/currentuser"}>
                <NavDropdown.Item href="/currentuser">Me</NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <Link href={"/logout"}>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
