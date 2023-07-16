import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("Authorization"); // Remove the authorization token cookie
    navigate("/login"); // Redirect to the login page
  };

  return (
    <>
      <Navbar className="d-flex p-2" fixed="top" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Recipe App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/recipes">Recipes</Nav.Link>
            <Nav.Link href="/myrecipes">My Recipes</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>

            {Cookies.get("Authorization") ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            <Nav.Link href="/calendar">Calendar</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Header;
