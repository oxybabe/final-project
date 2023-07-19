import React, { useState } from "react";

const AddRecipe = ({ setUserRecipes, userRecipes }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [dishType, setDishType] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [isShown, setIsShown] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [selectedRecipeFile, setSelectedRecipeFile] = useState(false);
  const input = document.getElementById("fileinput");

  const changeHandler = async (event) => {
    const file = event.target.files[0];
    
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("dish_type", dishType);
    formData.append("cooking_time", cookingTime);
    formData.append("servings", servings);
    formData.append("ingredients", ingredients);
    formData.append("directions", directions);
    formData.append("author_id", user.id);

    const response = await fetch(
      `http://localhost:8000/recipe/recipes/${user.id}`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("not working");
    } else {
      const data = await response.json();
      console.log(data);
      setUserRecipes([...userRecipes, data]);
      setTitle("");
      setImage("");
      setDescription("");
      setDishType("");
      setCookingTime("");
      setServings("");
      setIngredients("");
      setDirections("");
    }
  };
  const handleRecipeClick = (recipe) => {
    window.location.href = recipe.shareAs;
    console.log(selectedRecipeFile);
  };
  const handleClick = (event) => {
    setIsShown(true);
  };

  return (
    <div className="form-group">
      <button style={{ backgroundColor: "#20695e" }} onClick={handleClick}>
        Click To Add To A Personal Recipe
      </button>

      {isShown && (
        <form onSubmit={handleSubmit} style={{ background: "#20695e" }}>
          <h5>Add to your collection:</h5>
          <label>
            Recipe Title:
            <input
              className="form-group"
              placeholder="title"
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <br />
          <label>
            Add Image:
            <input type="file" name="image" onChange={changeHandler} />
            <br />
            Recipe Description:
            <input
              type="text"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <br />
          <br />
          Dish Type:
          <input
            type="text"
            name="Dish Type"
            value={dishType}
            onChange={(event) => setDishType(event.target.value)}
          />
          Cooking Time:
          <input
            type="text"
            name="cooking time"
            value={cookingTime}
            onChange={(event) => setCookingTime(event.target.value)}
          />
          <br />
          Servings:
          <input
            type="text"
            name="servings"
            value={servings}
            onChange={(event) => setServings(event.target.value)}
          />
          <br />
          Ingredients:
          <input
            type="text"
            name="ingredients"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
          />
          <br />
          Directions:
          <input
            type="text"
            name="directions"
            value={directions}
            onChange={(event) => setDirections(event.target.value)}
          />
          <br />
          <input type="submit" />
          <button
            style={{ backgroundColor: "#123c69", border: "#ac3b61" }}
            className="btn btn-secondary"
            onClick={() => {
              setIsShown(false);
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <br />
    </div>
  );
};
export default AddRecipe;
