import { useEffect, useState, process } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import React from "react";
import Header from "./Header";

const Recipe = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState("false");
  const [search, setSearch] = useState("");
  const fetchRecipeData = () => {
    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5eee6e55&app_key=${
        import.meta.env.VITE_RECIPE_PUBLIC_KEY
      }&q=${search}&mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&random=true`
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
    const checkAuth = () => {
      const token = Cookies.get("Authorization");
      console.log("auth cookie", Cookies.get("Authorization"));
      if (token) {
        setIsUserLoggedIn(true);
      }
    };
    checkAuth();
  }, []);

  const sendRecipeData = (recipe) => {
    fetch("http://127.0.0.1:8000/recipe/recipes/", {
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
          console.log(response);
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
    // const selectedRecipe = {
    window.location.href = recipe.shareAs;
    // title: recipe.label,
    // description: JSON.stringify(recipe.cuisineType),
    // image: data.image,
    // cooking_time: recipe.totalTime,
    // directions: recipe.shareAs,
    // servings: recipe.yield,
    // ingredients: JSON.stringify(recipe.ingredientLines),
    // user: null,
    // };

    console.log(selectedRecipe);
  };

  const handleAddRecipeClick = (recipe, user) => {
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
  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchRecipeData();
  };

  return (
    <>
      <Header />

      <h1 style={{ color: "#123c69" }}>Recipe Library</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          className="search-bar"
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={handleSearchInput}
          style={{ backgroundColor: "#f4e9cd", color: "#123c69" }}
        />
        <button
          className="search-button"
          type="submit"
          style={{ backgroundColor: "#20695e" }}
        >
          Search
        </button>
      </form>

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {recipes?.length > 0 &&
          recipes.map((recipe) => (
            <div className="col" key={recipe.recipe.label}>
              <div
                className="card h-100"
                style={{ backgroundColor: "#9dbebb" }}
              >
                <img
                  src={recipe.recipe.image}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.recipe.label}</h5>
                  <p className="card-text"></p>
                  <button
                    className="btn btn-primary btn-block"
                    style={{ backgroundColor: "#20695e" }}
                    onClick={() => handleRecipeClick(recipe.recipe)}
                  >
                    View Recipe
                  </button>
                  <br />
                  <button
                    className="btn btn-primary btn-block padding-top"
                    style={{ backgroundColor: "#20695e" }}
                    onClick={() => handleAddRecipeClick(recipe.recipe,)}
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
