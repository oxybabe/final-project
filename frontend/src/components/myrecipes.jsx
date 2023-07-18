import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import AddRecipe from "./AddRecipes";

const UserRecipes = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleError = (err) => {
    console.warn(err);
  };
  useEffect(() => {
    const fetchRecipeData = async () => {
      const response = await fetch(
        `http://localhost:8000/recipe/recipes/${user.id}`
      ).catch(handleError);
      if (!response.ok) {
        throw new Error("Network error");
      }
      const data = await response.json();
      console.log(data);
      setUserRecipes(data);
    };

    fetchRecipeData();
  }, []);
  const handleRecipeClick = (recipe) => {
    window.location.href = recipe.shareAs;
    console.log(selectedRecipe);
  };
  const viewRecipe = (recipe) => {
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
    getRecipeData(selectedRecipe);
  };
  // const getRecipeData = (recipe) => {
  //   fetch(`http://localhost:8000/recipe/recipes/${user.id}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-CSRFToken": Cookies.get("csrftoken"),
  //       Authorization: Cookies.get("Authorization").trim(),
  //     },
  //     body: JSON.stringify(recipe),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         console.log(response);
  //         throw new Error("error");
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <Header />
      <h1 style={{ color: "#123c69" }}>My Recipe Collection</h1>
      <AddRecipe />
      <div className="row row-cols-1 row-cols-md-4 g-4"></div>
      {userRecipes &&
        userRecipes.map((recipe) => (
          <div className="col" key={recipe.id.user}>
            <div className="card h-100" style={{ backgroundColor: "#9dbebb" }}>
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
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
