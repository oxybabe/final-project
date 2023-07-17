import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const UserRecipes = () => {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch("http://localhost:8000/recipes/recipes/");
        if (response.ok) {
          const recipe = await response.json();
          setUserRecipes(recipe.hits);
        } else {
          console.log("Error:", response.status);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchRecipeData();
  }, []);
  const handleRecipeClick = (recipe) => {
    window.location.href = recipe.shareAs;
    console.log(selectedRecipe);
  };
  const handleAddRecipeClick = (recipe, user) => {
    const selectedRecipe = {
      title: recipe.label,
      description: JSON.stringify(recipe.cuisineType),
      // image: data.image,
      cooking_time: recipe.totalTime,
      directions: recipe.shareAs,
      servings: recipe.yield,
      ingredients: JSON.stringify(recipe.ingredientLines),
      user: user,
    };
    console.log(selectedRecipe);
    sendRecipeData(selectedRecipe);
  };

  return (
    <>
      <Header />
      <h1 style={{ color: "#123c69" }}>My Recipe Collection</h1>
      <div className="row row-cols-1 row-cols-md-4 g-4"></div>
      {userRecipes &&
        userRecipes.map((recipe, user) => (
          <div className="col" key={recipe.id.user}>
            <div className="card h-100" style={{ backgroundColor: "#9dbebb" }}>
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text"></p>
                <button
                  className="btn btn-primary btn-block"
                  style={{ backgroundColor: "#20695e" }}
                  onClick={() => handleRecipeClick(recipe.recipe)}
                >
                  View Recipe
                </button>
              </div>
            </div>

            {/* <p>{recipe.description}</p> */}
          </div>
        ))}
    </>
  );
};

export default UserRecipes;
