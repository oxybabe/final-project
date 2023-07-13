import { useEffect, useState, process } from "react";
import UserLogin from "./login";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const fetchRecipeData = () => {
    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5eee6e55&app_key=${
        import.meta.env.VITE_RECIPE_PUBLIC_KEY
      }&mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&random=false`
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
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default App;
