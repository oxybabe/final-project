import { useEffect, useState } from "react";
import UserLogin from "./login";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";

import "./App.css";

const App = () => {
  let [newRecipes, setNewRecipes] = useState({
 
  });

  async function addRecipe(recipeData) {
    const response = await fetch("http://127.0.0.1:8000/recipes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "",
        image: "",
        cookingtime: "",
        servings: "",
        ingredients: "",
        directions: "",
      }),
    });
    setNewRecipes({
     
    });

    return (
      <>
        <Header />
      </>
    );
  }
};

export default App;
