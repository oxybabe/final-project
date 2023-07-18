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
      cooking_time: "",
      servings: "",
      ingredients: "",
    });
  };
  return (
    <>
      <form onSubmit={editFormSubmit}>
        <div className="form-group">
          <label>Recipe title:{""}</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="title"
            value={recipeData.title}
            onChange={(e) =>
              setRecipeData({ ...recipeData, title: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Description:{""}</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="description"
            value={recipeData.description}
            onChange={(e) =>
              setRecipeData({ ...recipeData, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Cooking time:{""}</label>
          <input
            className="form-control"
            id="cooking_time"
            placeholder="cooking time"
            value={recipeData.cooking_time}
            onChange={(e) =>
              setRecipeData({ ...recipeData, cooking_time: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Servings:</label>
          <input className="form-control" id="" placeholder="servings" />
        </div>
        <div className="form-group">
          <label>Ingredients:{""}</label>
          <textarea
            className="form-control"
            id=""
            placeholder="ingredients"
            value={recipeData.ingredients}
            onChange={(e) =>
              setRecipeData({ ...recipeData, ingredients: e.target.value })
            }
            rows="3"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Directions:{""}</label>
          <textarea
            className="form-control"
            id=""
            placeholder="directions"
            value={recipeData.directions}
            rows="3"
            onChange={(e) =>
              setRecipeData({ ...recipeData, directions: e.target.value })
            }
          ></textarea>
        </div>
      </form>
      <button
        type="submit"
        onClick={() => handleUpdateRecipe(recipe.id, recipeData)}
      >
        Submit Change
      </button>
      <br />
      <button
        onClick={() => {
          console.log("here");
          setIsEditing(false);
        }}
      >
        Cancel
      </button>
    </>
  );
}
