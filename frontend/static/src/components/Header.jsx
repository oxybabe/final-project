import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { handleError } from "../utils";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };
    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Oops! Something went wrong");
    } else {
      const data = await response.json();
      Cookies.remove("Authorization", `Token${" "}${data.key}`);
      localStorage.removeItem("user");
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
          <img
            src={require("../media/meal_logo.jpeg")}
            style={{ height: "30px", marginRight: "30px" }}
          />
          <Navbar.Brand style={{ color: "#f4e9cd" }} href="/">
            Meal Master
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/recipes" style={{ color: "#f4e9cd" }}>
              Find Recipes
            </Nav.Link>
            {user && (
              <Nav.Link href="/myrecipes" style={{ color: "#f4e9cd" }}>
                My Recipes
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link href="/register" style={{ color: "#f4e9cd" }}>
                Register
              </Nav.Link>
            )}
            {user && (
              <Nav.Link href="/calendar" style={{ color: "#f4e9cd" }}>
                Meal Calendar
              </Nav.Link>
            )}
            {user ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link href="/login" style={{ color: "#f4e9cd" }}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Header;
