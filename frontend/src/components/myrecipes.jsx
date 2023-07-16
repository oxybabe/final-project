import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const UserRecipes = () => {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch("http://localhost:8000/recipes/");
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

  return (
    <>
      <Header />
      <h1 style={{ color: "black" }}>My Recipes</h1>
      {userRecipes &&
        userRecipes.map((recipe, user) => (
          <div key={recipe.id.user}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
          </div>
        ))}
    </>
  );
};

export default UserRecipes;
