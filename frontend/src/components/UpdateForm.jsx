import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function UpdateForm({ recipe, handleUpdateRecipe, setIsEditing }) {
  const [recipeData, setRecipeData] = useState(recipe);
  const editFormSubmit = (e) => {
    e.preventDefault();
    console.log("recipe", { recipe });
    console.log("data", recipeData);
    handleUpdateRecipe(recipe.id, recipeData);
  };

  return (
    <>
      <Modal show={true} onHide={() => setIsEditing(false)} centered>
        <Modal.Header close style={{ backgroundColor: "#123c69"}}>
          <Modal.Title style={{color: "#f4e9cd" }}>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#123c69" }}>
          <form onSubmit={editFormSubmit}>
            <div className="form-group">
              <label htmlFor="title" style={{color: "#f4e9cd" }}>Recipe title:</label>
              <input
                style={{ backgroundColor: "#f4e9cd" }}
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
              <label htmlFor="description" style={{color: "#f4e9cd" }}>Description:</label>
              <input
                type="text"
                style={{ backgroundColor: "#f4e9cd" }}
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
              <label htmlFor="description" style={{color: "#f4e9cd" }}>Dish Type:</label>
              <input
                type="text"
                style={{ backgroundColor: "#f4e9cd" }}
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
              <label htmlFor="cooking_time" style={{color: "#f4e9cd" }}>Cooking time:</label>
              <input
                className="form-control"
                style={{ backgroundColor: "#f4e9cd" }}
                id="cooking_time"
                placeholder="Cooking time"
                value={recipeData.cooking_time}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, cooking_time: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="servings" style={{color: "#f4e9cd" }}>Servings:</label>
              <input
                type="text"
                style={{ backgroundColor: "#f4e9cd" }}
                className="form-control"
                id="servings"
                placeholder="Servings"
              />
            </div>
            <div className="form-group">
              <label htmlFor="ingredients" style={{color: "#f4e9cd" }}>Ingredients:</label>
              <textarea
                className="form-control"
                style={{ backgroundColor: "#f4e9cd" }}
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
              <label htmlFor="directions" style={{color: "#f4e9cd" }}>Directions:</label>
              <textarea
                className="form-control"
                style={{ backgroundColor: "#f4e9cd" }}
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

        <Modal.Footer style={{ backgroundColor: "#123c69" }}>
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

export default UpdateForm;
