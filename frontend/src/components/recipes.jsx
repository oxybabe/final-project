import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { json, useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

import React from "react";
import Header from "./Header";

const Recipe = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isUserLoggedIn, setIsUserLoggedIn] = useState("false");
  const [search, setSearch] = useState("");
  console.log(user.username);

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
    fetchRecipeData();
  }, []);

  const viewRecipe = (recipe) => {
    window.location.href = recipe.shareAs;
  };

  const addRecipeToCollection = async (recipe) => {
    // console.log("user:", username);
    if (Cookies.get("Authorization")) {
      const selectedRecipe = {
        author_id: user.id, // Use the username from local storage
        title: recipe.label,
        description: recipe.cuisineType[0],
        image: null,
        imageURL: recipe.image,
        dish_type: recipe.dish_type,
        cooking_time: recipe.totalTime,
        directions: recipe.shareAs,
        servings: recipe.yield,
        ingredients: recipe.ingredientLines.join(", "),
      };
      console.log({ selectedRecipe });
      fetch(`http://localhost:8000/recipe/recipes/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          Authorization: Cookies.get("Authorization").trim(),
        },
        body: JSON.stringify(selectedRecipe),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log({ response });
            throw new Error("error");
          }
        })
        .then((data) => {
          console.log(data);
          alert("Recipe added to your library!");
        })
        .catch((error) => {
          console.log(error);
        });
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

      <h1 style={{ color: "#123c69", textAlign: "center", marginTop: "2rem" }}>
        Recipe Library
      </h1>
      <form
        onSubmit={handleSearchSubmit}
        style={{ marginBottom: "2rem", textAlign: "center" }}
      >
        <input
          className="search-bar"
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={handleSearchInput}
          style={{
            backgroundColor: "#f4e9cd",
            color: "#123c69",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        />
        <button
          className="search-button"
          type="submit"
          style={{ backgroundColor: "#20695e", marginLeft: "1rem" }}
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
                style={{ backgroundColor: "#9dbebb", border: "1px solid #ddd" }}
              >
                <img
                  src={recipe.recipe.image}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.recipe.label}</h5>
                  <p className="card-text"></p>
                  <div
                    className="button-container"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button
                      className="btn btn-primary btn-block"
                      style={{ backgroundColor: "#20695e", border: "#123c69", flex: 1, marginRight: '5px' }}
                      onClick={() => viewRecipe(recipe.recipe)}
                    >
                      View Recipe
                    </button>
                    <br />
                    <button
                      className="btn btn-primary btn-block padding-top"
                      style={{ backgroundColor: "#20695e", border: "#123c69", flex: 1, marginRight: '5px' }}
                      onClick={() => addRecipeToCollection(recipe.recipe)}
                    >
                      Add to my recipes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Recipe;
