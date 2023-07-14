import { useEffect, useState, process } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import React from "react";
import Header from "./Header";

const Recipe = () => {
  const navigate = useNavigate();
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
        setRecipes(data.hits);
      });
  };
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("http://localhost:8000/dj-rest-auth/user/");
      if (!response.ok) {
        console.log("this", response.ok);
      } else {
        console.log(response);
      }
    };
    checkAuth();
  }, []);

  const sendRecipeData = (recipe) => {
    fetch("http://127.0.0.1:8000/recipes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(recipe),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("error");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchRecipeData();
  }, []);

  const handleRecipeClick = (recipe) => {
    if (Cookies.get("Authorization")) {
      const selectedRecipe = {
        title: recipe.label,
        description: JSON.stringify(recipe.cuisineType),
        // image: data.image,
        cooking_time: recipe.totalTime,
        directions: recipe.shareAs,
        servings: recipe.yield,
        ingredients: JSON.stringify(recipe.ingredientLines),
      };
      console.log(selectedRecipe);
      sendRecipeData(selectedRecipe);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Header />

      <h1>Welcome to Meal App</h1>

      {/* <UserLogin /> */}
      <div>
        {recipes?.length > 0 && (
          <ul>
            {recipes.map((recipe) => (
              // console.log(recipe.recipe.label)
              <>
                <li key={recipe.recipe.label}>
                  {recipe.recipe.label} {}
                </li>
                =
                <li>
                  <img src={recipe.recipe.image} alt="img" />{" "}
                  <button onClick={() => handleRecipeClick(recipe.recipe)}>
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
