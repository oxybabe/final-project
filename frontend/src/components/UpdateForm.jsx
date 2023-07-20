import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";

export default function UpdateRecipe({
  recipe,
  handleUpdateRecipe,
  setIsEditing,
}) {
  const [recipeData, setRecipeData] = useState(recipe);
  const editFormSubmit = (e) => {
    e.preventDefault();
    console.log("recipe", { recipe });
    console.log("data", recipeData);
    handleUpdateRecipe(recipe.id, recipeData);
  };

  console.log({ recipe });
  return (
    <>
      <Modal show={true} onHide={() => setIsEditing(false)} centered>
        <Modal.Header close style={{ backgroundColor: "#9dbebb"}}>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#9dbebb"}}>
          <form onSubmit={editFormSubmit}>
            <div className="form-group">
              <label htmlFor="title">Recipe title:</label>
              <input
              style={{ backgroundColor: "#f4e9cd"}}
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                value={recipeData.title}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                style={{ backgroundColor: "#f4e9cd"}}
                className="form-control"
                id="description"
                placeholder="Description"
                value={recipeData.description}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, description: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Dish Type:</label>
              <input
                type="text"
                style={{ backgroundColor: "#f4e9cd"}}
                className="form-control"
                id="dish_type"
                placeholder="Dish Type"
                value={recipeData.dish_type}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, dish_type: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="cooking_time">Cooking time:</label>
              <input
                className="form-control"
                style={{ backgroundColor: "#f4e9cd"}}
                id="cooking_time"
                placeholder="Cooking time"
                value={recipeData.cooking_time}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, cooking_time: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="servings">Servings:</label>
              <input
                type="text"
                style={{ backgroundColor: "#f4e9cd"}}
                className="form-control"
                id="servings"
                placeholder="Servings"
              />
            </div>
            <div className="form-group">
              <label htmlFor="ingredients">Ingredients:</label>
              <textarea
                className="form-control"
                style={{ backgroundColor: "#f4e9cd"}}
                id="ingredients"
                placeholder="Ingredients"
                value={recipeData.ingredients}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, ingredients: e.target.value })
                }
                rows="3"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="directions">Directions:</label>
              <textarea
                className="form-control"
                style={{ backgroundColor: "#f4e9cd"}}
                id="directions"
                placeholder="Directions"
                value={recipeData.directions}
                rows="3"
                onChange={(e) =>
                  setRecipeData({ ...recipeData, directions: e.target.value })
                }
              ></textarea>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "#9dbebb"}}>
          <Button
            type="submit"
            className="btn btn-primary"
            onClick={() => handleUpdateRecipe(recipe.id, recipeData)}
            style={{ backgroundColor: "#20695e", border: "#ac3b61" }}
          >
            Submit Change
          </Button>
          <Button
            style={{ backgroundColor: "#20695e", border: "#ac3b61" }}
            className="btn btn-secondary"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
