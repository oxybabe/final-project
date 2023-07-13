import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <>
      <Navbar class="d-flex p-2" fixed="top" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Recipe App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/">Recipes</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/calendar">Calendar</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Header;
