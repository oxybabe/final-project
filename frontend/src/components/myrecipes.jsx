import React, { useEffect, useState } from "react";
import AddRecipe from "./AddRecipes";
import Cookies from "js-cookie";
import UpdateForm from "./UpdateForm";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { handleError } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUtensils,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const MyRecipes = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [recipeModalData, setRecipeModalData] = useState(null);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const openEditor = (id) => {
    setActiveId(id);
    setIsEditing(true);
  };

  useEffect(() => {
    const fetchRecipeData = async () => {
      const response = await fetch(
        `http://localhost:8000/recipe/recipes/${user.id}`
      ).catch(handleError);
      if (!response.ok) {
        throw new Error("Network error");
      }
      const data = await response.json();
      setUserRecipes(data);
    };

    fetchRecipeData();
  }, []);

  const viewRecipe = (recipe) => {
    setRecipeModalData(recipe);
    setShow(true);
  };

  const handleClose = () => {
    setRecipeModalData(null);
    setShow(false);
  };

  const deleteRecipe = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/recipe/recipe/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
            Authorization: Cookies.get("Authorization").trim(),
          },
          body: JSON.stringify({ id }),
        }
      );
      if (response.ok) {
        console.log("Recipe deleted");
        const index = userRecipes.findIndex((recipe) => recipe.id === id);
        const newRecipe = [...userRecipes];
        newRecipe.splice(index, 1);
        setUserRecipes(newRecipe);
      } else {
        console.log("failed to delete recipe");
      }
    } catch (error) {
      console.log("An error occurred while delete the recipe", error);
    }
  };

  const handleUpdateRecipe = async (id, recipeData) => {
    const {
      title,
      description,
      dish_type,
      cooking_time,
      servings,
      ingredients,
      directions,
    } = recipeData;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dish_type", dish_type);
    formData.append("cooking_time", cooking_time);
    formData.append("servings", servings);
    formData.append("ingredients", ingredients);
    formData.append("directions", directions);
    try {
      const response = await fetch(
        `http://localhost:8000/recipe/recipe/${id}/`,
        {
          method: "PATCH",
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
            Authorization: Cookies.get("Authorization").trim(),
          },
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        const index = userRecipes.findIndex((recipe) => recipe.id === data.id);
        const newRecipe = [...userRecipes];
        newRecipe.splice(index, 1, data);
        setUserRecipes(newRecipe);
        setIsEditing(false);
      } else {
        console.log("failed to update recipe");
      }
    } catch (error) {
      console.log("An error occurred while updated book", error);
    }
  };

  const addToCalendar = async (e, recipe) => {
    e.preventDefault();
    const body = {
      recipe: recipe,
      allDay: "true",
      start: date,
      author_id: user.id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        Authorization: Cookies.get("Authorization").trim(),
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(
      `http://127.0.0.1:8000/recipe/calendarevents/${user.id}`,
      options
    ).catch(handleError);
    if (!response.ok) {
      console.log("login not successful");
    }
    handleClose();
  };

  return (
    <>
      <h1 style={{ color: "#123c69", marginTop: "4rem" }}>My Recipe Library</h1>
      <p style={{ color: "#123c69" }}>
        Your Personal Culinary Collection: A Treasured Assortment for Your
        Enjoyment!
      </p>
      <br />
      <AddRecipe setUserRecipes={setUserRecipes} userRecipes={userRecipes} />
      <Row xs={1} md={4} className="g-4">
        {userRecipes &&
          userRecipes.map((recipe) => (
            <Col key={recipe.id}>
              <Card
                className="recipe-card"
                style={{
                  backgroundColor: "#f4e9cd",
                }}
              >
                <div className="image-container">
                  {recipe.image && (
                    <Card.Img variant="top" src={recipe.image} />
                  )}
                  {recipe.imageURL && (
                    <Card.Img variant="top" src={recipe.imageURL} />
                  )}
                </div>
                <Card.Body>
                  <Card.Title style={{ color: "#123c69" }}>
                    {recipe.title}
                  </Card.Title>
                  <Card.Text>
                    {recipe.dish_type}
                    <FontAwesomeIcon icon={faUtensils} />
                    Serves {recipe.servings} <FontAwesomeIcon icon={faClock} />{" "}
                    {recipe.cooking_time}min
                  </Card.Text>
                </Card.Body>
                <Button
                  className="btn btn-primary btn-block  mb-2"
                  style={{
                    backgroundColor: "#20695e",
                    border: "#ac3b61",
                    marginTop: "20px",
                  }}
                  onClick={() => viewRecipe(recipe)}
                >
                  View Recipe
                </Button>

                {activeId === recipe.id && isEditing ? (
                  <UpdateForm
                    recipe={recipe}
                    handleUpdateRecipe={handleUpdateRecipe}
                    setIsEditing={setIsEditing}
                  />
                ) : (
                  <Button
                    className="btn btn-primary btn-block "
                    style={{
                      backgroundColor: "#20695e",
                      border: "#ac3b61",
                    }}
                    onClick={() => openEditor(recipe.id)}
                  >
                    Edit Recipe
                  </Button>
                )}
                <br />
                <div className="icon-delete">
                  <a onClick={() => deleteRecipe(recipe.id)}>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ color: "#1f695e" }}
                    />
                  </a>
                </div>
              </Card>
            </Col>
          ))}
      </Row>
      <br />
      {recipeModalData && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header
            style={{
              backgroundColor: "#123c69",
              border: "1px solid #f4e9cd",
              color: "#f4e9cd",
            }}
            closeButton
          >
            {recipeModalData.title}
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: "#123c69",
              border: "1px solid #f4e9cd",
              color: "#f4e9cd",
            }}
          >
            <p>Cuisine Type: {recipeModalData.description}</p>
            <p>Meal Type: {recipeModalData.dish_type}</p>
            <p>Cooking Time: {recipeModalData.cooking_time}</p>
            <p>Servings: {recipeModalData.servings}</p>
            <div>
              <p>Ingredients:</p>
              <ul>
                {recipeModalData.ingredients
                  .split(",")
                  .map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
              </ul>
            </div>
            <p>
              Directions:{" "}
              <a href={recipeModalData.directions} target="_blank">
                Click here to view the recipe directions
              </a>
            </p>
            <img
              src={recipeModalData.image}
              className="card-img-top"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
              alt="..."
            />
            <form onSubmit={(e) => addToCalendar(e, recipeModalData)}>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Button
                type="submit"
                size="sm"
                style={{
                  backgroundColor: "#ac3b61",
                  border: "#ac3b61",
                }}
              >
                Add to Calendar
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default MyRecipes;
