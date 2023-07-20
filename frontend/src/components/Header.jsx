import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const navigate = useNavigate();
  const handleError = (err) => {
    console.log(err);
  };
  const handleLogout = async () => {
    const user = {
      username: "test",
      password: "welcomepass",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(
      "http://localhost:8000/dj-rest-auth/logout/",
      options
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Oops! Something went wrong");
    } else {
      const data = await response.json();
      Cookies.remove("Authorization", `Token${" "}${data.key}`);
    }
    navigate("/login");
  };

  return (
    <>
      <Navbar
        className="d-flex p-2"
        fixed="top"
    
        style={{ backgroundColor: "#20695e", color: "#f4e9cd" }}
      >
        <Container>
        <img src="./media/Blue Restaurant Dinner Set Logo.jpeg"  style={{ height: "30px", marginRight: "30px" }} />
          <Navbar.Brand style={{ color: "#f4e9cd" }} href="#home">
            Meal Master
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home" style={{ color: "#f4e9cd" }}>
              Home
            </Nav.Link>
            <Nav.Link href="/recipes" style={{ color: "#f4e9cd" }}>
              Find Recipes
            </Nav.Link>
            <Nav.Link href="/myrecipes" style={{ color: "#f4e9cd" }}>
              My Recipes
            </Nav.Link>
            <Nav.Link href="/register" style={{ color: "#f4e9cd" }}>
              Register
            </Nav.Link>

            {Cookies.get("Authorization") ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link href="/login" style={{ color: "#f4e9cd" }}>
                Login
              </Nav.Link>
            )}
            <Nav.Link href="/calendar" style={{ color: "#f4e9cd" }}>
              Meal Calendar
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Header;
