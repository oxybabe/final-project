import { useState } from "react";
import React from "react";

export default function UpdateRecipe({
  recipe,
  handleUpdateRecipe,
  setIsEditing,
}) {
  const [recipeData, setRecipeData] = useState(recipe);
  const editFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateRecipe(recipe.id, recipeData);
    setRecipeData({
      id: "",
      title: "",
      image: "",
      description: "",
      dish_type: "",
      cooking_time: "",
      servings: "",
      ingredients: "",
    });
  };
  return (
    <>
      <form onSubmit={editFormSubmit}>
        <div className="form-group">
          <label htmlFor="title">Recipe title:</label>
          <input
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
            className="form-control"
            id="servings"
            placeholder="Servings"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            className="form-control"
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
            id="directions"
            placeholder="Directions"
            value={recipeData.directions}
            rows="3"
            onChange={(e) =>
              setRecipeData({ ...recipeData, directions: e.target.value })
            }
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => handleUpdateRecipe(recipe.id, recipeData)}
          style={{ backgroundColor: "#20695e", border: "#ac3b61" }}
        >
          Submit Change
        </button>
        <button
          style={{ backgroundColor: "#20695e", border: "#ac3b61" }}
          className="btn btn-secondary"
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
}
