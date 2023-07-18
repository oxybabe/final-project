import React, { useState } from "react";

const AddRecipe = ({ setUserRecipes, userRecipes }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [selectedRecipeFile, setSelectedRecipeFile] = useState(false);
  const input = document.getElementById("fileinput");
  //   const resizeFile = (file) => new Promise(resolve => {
  //     Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
  //     uri => {
  //       resolve(uri);
  //     }, 'base64' );
  // });
  const changeHandler = async (event) => {
    const file = event.target.files[0];
    // const image = await resizeFile(file);
    setImage(file);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("description", description);
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
        //   headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error("not working");
    } else {
      const data = await response.json();
      console.log(data);
      setUserRecipes([...userRecipes, data]);
      setTitle("");
      setDescription("");
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

  return (
    <div className="AddRecipe">
      <form onSubmit={handleSubmit} style={{ backgroundColor: "#20695e" }}>
        <h5>Add to your collection:</h5>
        <label>
          Recipe Title:
          <input
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
        {/* <FileUploader
          onFileSelectSuccess={(file) => setSelectedRecipeFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        /> */}
        <input type="submit" />
        {/* <input
          type="file"
          value={selectedRecipeFile}
          onChange={(event) => setSelectedRecipeFile(event.target.files[0])}
        /> */}
      </form>
      //{" "}
    </div>
  );
};
export default AddRecipe;
