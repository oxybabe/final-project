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
        console.log("this", response);
      } else {
        console.log(response);
      }
    };
    checkAuth();
    console.log("auth cookie", Cookies.get("Authorization"));
  }, []);

  const sendRecipeData = (recipe) => {
    fetch("http://127.0.0.1:8000/recipes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        Authorization: Cookies.get("Authorization"),
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

  const handleRecipeClick = (recipe, user) => {
    if (Cookies.get("Authorization")) {
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
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Header />

      <h1>Welcome to Meal App</h1>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {recipes?.length > 0 &&
          recipes.map((recipe) => (
            <div className="col" key={recipe.recipe.label}>
              <div className="card">
                <img src={recipe.recipe.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{recipe.recipe.label}</h5>
                  <p className="card-text">
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleRecipeClick(recipe.recipe)}
                  >
                    Add to my recipes
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Recipe;
