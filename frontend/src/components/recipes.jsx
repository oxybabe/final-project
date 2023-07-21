import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCirclePlus,
  faClock,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const fetchRecipeData = () => {
    setIsLoading(true);
    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5eee6e55&app_key=${
        import.meta.env.VITE_RECIPE_PUBLIC_KEY
      }&q=${search}&mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&random=true`
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRecipes(data.hits);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const viewRecipe = (recipe) => {
    window.location.href = recipe.shareAs;
  };

  const addRecipeToCollection = async (recipe) => {
    if (Cookies.get("Authorization")) {
      const selectedRecipe = {
        author_id: user?.id, // Use the username from local storage
        title: recipe.label,
        description: recipe.cuisineType[0],
        image: null,
        imageURL: recipe.image,
        dish_type: recipe.dish_type,
        cooking_time: recipe.totalTime,
        directions: recipe.shareAs,
        servings: recipe.yield,
        ingredients: recipe.ingredientLines.join(", "),
      };
      console.log({ selectedRecipe });
      fetch(`http://localhost:8000/recipe/recipes/${user?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          Authorization: Cookies.get("Authorization").trim(),
        },
        body: JSON.stringify(selectedRecipe),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log({ response });
            throw new Error("error");
          }
        })
        .then((data) => {
          console.log(data);
          handleShowToast();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  };

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchRecipeData();
  };

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <h1 style={{ color: "#123c69", textAlign: "center", marginTop: "4rem" }}>
        Recipes and Cooking Ideas
      </h1>
      <p>Discover superstar recipes, to take the pain out of meal planning.</p>
      <form
        onSubmit={handleSearchSubmit}
        style={{ marginBottom: "2rem", textAlign: "center" }}
      >
        <input
          className="search-bar"
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={handleSearchInput}
          style={{
            backgroundColor: "#f4e9cd",
            color: "#123c69",
            maxWidth: "600px",
            width: "500px",
            margin: "0 auto",
          }}
        />
        <button
          className="search-button"
          type="submit"
          style={{ backgroundColor: "#20695e", marginLeft: "1rem" }}
        >
          Search
        </button>
      </form>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row xs={1} md={4} className="g-4">
          {" "}
          {recipes?.length > 0 &&
            recipes.map((recipe) => (
              <Col className="col" key={recipe.recipe.label}>
                <Card
                  className="recipe-card"
                  style={{
                    backgroundColor: "#f4e9cd",
                  }}
                >
                  <div className="image-container">
                    <Card.Img variant="top" src={recipe.recipe.image} />
                  </div>
                  <Card.Body>
                    <Card.Title style={{ color: "#123c69" }}>
                      {recipe.recipe.label}
                    </Card.Title>
                    <Card.Text className="card-text">
                      {recipe.dish_type}
                      <FontAwesomeIcon icon={faUtensils} />
                      Serves {recipe.servings}{" "}
                      <FontAwesomeIcon icon={faClock} /> {recipe.cooking_time}
                      min
                    </Card.Text>
                    <div
                      className="button-container"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="icon">
                        <a onClick={() => addRecipeToCollection(recipe.recipe)}>
                          <FontAwesomeIcon
                            icon={faHeartCirclePlus}
                            style={{ color: "#ac3b61" }}
                          />
                        </a>
                      </div>
                      <Toast
                        show={showToast}
                        onClose={() => setShowToast(false)}
                        delay={2000}
                        variant="success"
                        style={{
                          position: "fixed",
                          bottom: 20,
                          right: 20,
                          backgroundColor: "#123c69",
                          color: "#f4e9cd",
                        }}
                      >
                        <Toast.Header>
                          Recipe added to your collection!
                        </Toast.Header>
                      </Toast>
                      <br />
                      <Button
                        className="btn btn-primary btn-block"
                        style={{
                          backgroundColor: "#20695e",
                          border: "#123c69",
                          marginRight: "10px",
                        }}
                        onClick={() => viewRecipe(recipe.recipe)}
                      >
                        View Recipe
                      </Button>
                      <br />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      )}
    </>
  );
};

export default Recipes;
