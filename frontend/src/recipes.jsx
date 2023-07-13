import { useEffect, useState, process } from "react";

import React from "react";
import Header from "./Header";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const fetchRecipeData = () => {
    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5eee6e55&app_key=${
        import.meta.env.VITE_RECIPE_PUBLIC_KEY
      }&mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&random=true`
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRecipes(data);
      });
  };
  useEffect(() => {
    fetchRecipeData();
  }, []);
  const newRecipe = (data) => {
    const recipe = {
      title: data.label,
      image: data.image,
      cookingtime: data.totalTime,
      servings: data.yield,
      ingredients: data.ingredients,
    };
    console.log(recipe);
  };
  return (
    <>
      <Header />

      <h1>Welcome to Meal App</h1>

      {/* <UserLogin /> */}
      <div>
        {recipes?.hits?.length > 0 && (
          <ul>
            {recipes.hits.map((recipe) => (
              // console.log(recipe.recipe.label)
              <>
                <li key={recipe.recipe.label}>
                  {recipe.recipe.label} {}
                </li>
                <li>
                  <img src={recipe.recipe.image} alt="img" />{" "}
                  <button onClick={() => newRecipe(recipe.recipe)}>
                    Add to my recipes
                  </button>
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Recipe;
