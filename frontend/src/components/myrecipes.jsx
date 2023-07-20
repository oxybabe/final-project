import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import AddRecipe from "./AddRecipes";
import Cookies from "js-cookie";
import UpdateForm from "./UpdateForm";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UserRecipes = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [activeId, setActiveId] = useState(null);
  const [recipeModalData, setRecipeModalData] = useState(null);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
  const openEditor = (id) => {
    setActiveId(id);
    setIsEditing(true);
  };

  const handleError = (err) => {
    console.warn(err);
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
    console.log("here", { recipeData });

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
            // "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
            Authorization: Cookies.get("Authorization").trim(),
          },
          body: formData,
        }
      );
      if (response.ok) {
        console.log("Recipe updated");
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
    console.log({ recipe });
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
    console.log("herer");
    const response = await fetch(
      `http://127.0.0.1:8000/recipe/calendarevents/${user.id}`,
      options
    ).catch(handleError);
    if (!response.ok) {
      console.log("login not successful");
    }
    const data = await response.json();
    console.log({ data });
    handleClose();
  };

  return (
    <>
      <Header />
      <h1 style={{ color: "#123c69" }}>My Recipe Library</h1>

      <br />

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {userRecipes &&
          userRecipes.map((recipe) => (
            <div className="col" key={recipe.id}>
              <div
                className="card h-100"
                style={{ backgroundColor: "#9dbebb", border: "1px solid #ddd" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>

                  <p className="card-text">{recipe.dish_type}</p>
                  <div>
                    {recipe.image && (
                      <img
                        src={recipe.image}
                        className="card-img-top"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                        alt="..."
                      />
                    )}
                    {recipe.imageURL && (
                      <img
                        src={recipe.imageURL}
                        className="card-img-top"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                        alt="..."
                      />
                    )}

                    <br />

                    <button
                      className="btn btn-primary btn-block  mb-2"
                      style={{
                        backgroundColor: "#20695e",
                        border: "#ac3b61",
                        marginTop: "20px",
                      }}
                      onClick={() => viewRecipe(recipe)}
                    >
                      View Recipe
                    </button>
                    <br />
                    {activeId === recipe.id && isEditing ? (
                      <UpdateForm
                        recipe={recipe}
                        handleUpdateRecipe={handleUpdateRecipe}
                        setIsEditing={setIsEditing}
                      />
                    ) : (
                      <button
                        className="btn btn-primary btn-block mb-2 "
                        style={{
                          backgroundColor: "#20695e",
                          border: "#ac3b61",
                        }}
                        onClick={() => openEditor(recipe.id)}
                      >
                        Edit Recipe
                      </button>
                    )}
                    <br />
                    <button
                      className="btn btn-primary btn-block mb-2"
                      style={{ backgroundColor: "#20695e", border: "#ac3b61" }}
                      onClick={() => deleteRecipe(recipe.id)}
                    >
                      Delete Recipe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <br />
      <AddRecipe setUserRecipes={setUserRecipes} userRecipes={userRecipes} />
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

export default UserRecipes;
