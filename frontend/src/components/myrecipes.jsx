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
  const [viewedRecipe, setViewedRecipe] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [activeId, setActiveId] = useState(null);
  const [recipeModalData, setRecipeModalData] = useState(null);
  const [show, setShow] = useState(false);
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
      console.log(data);
      setUserRecipes(data);
    };

    fetchRecipeData();
  }, []);

  const viewRecipe = (recipe) => {
    console.log(recipe);
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
    formData.append("cooking_type", cooking_time);
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

  console.log({ userRecipes });

  return (
    <>
      <Header />
      <h1 style={{ color: "#123c69" }}>My Recipe Collection</h1>

      <AddRecipe setUserRecipes={setUserRecipes} userRecipes={userRecipes} />
      <br />

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {userRecipes &&
          userRecipes.map((recipe) => (
            <div className="col" key={recipe.id}>
              <div
                className="card h-100"
                style={{ backgroundColor: "#9dbebb" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  Meal Type:
                  <p className="card-text">{recipe.dish_type}</p>
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      className="card-img-top"
                      style={{ width: 400 }}
                      alt="..."
                    />
                  )}
                  {recipe.imageURL && (
                    <img
                      src={recipe.imageURL}
                      className="card-img-top"
                      style={{ width: 400 }}
                      alt="..."
                    />
                  )}
                  <br />
                  <button
                    className="btn btn-primary btn-block"
                    style={{ backgroundColor: "#20695e", border: "#ac3b61" }}
                    onClick={() => viewRecipe(recipe)}
                  >
                    View Recipe
                  </button>
                  {recipeModalData && (
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body>{recipeModalData.title}</Modal.Body>
                      <Button variant="primary" onClick={handleClose}>
                        Add to Calendar
                      </Button>
                    </Modal>
                  )}
                  <br />
                  {activeId === recipe.id && isEditing ? (
                    <UpdateForm
                      recipe={recipe}
                      handleUpdateRecipe={handleUpdateRecipe}
                      setIsEditing={setIsEditing}
                    />
                  ) : (
                    <button
                      className="btn btn-primary btn-block"
                      style={{ backgroundColor: "#20695e", border: "#ac3b61" }}
                      onClick={() => openEditor(recipe.id)}
                    >
                      Edit Recipe
                    </button>
                  )}
                  <br />
                  <button
                    className="btn btn-primary btn-block"
                    style={{ backgroundColor: "#20695e", border: "#ac3b61" }}
                    onClick={() => deleteRecipe(recipe.id)}
                  >
                    Delete Recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserRecipes;
