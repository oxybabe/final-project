import React, { useState } from "react";

import FileUploader from "./FileUploaded";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [selectedRecipeFile, setSelectedRecipeFile] = useState(null);
  const input = document.getElementById("fileinput");

  const upload = (file) => {
    fetch("http://localhost:8000/recipe/recipes/", {
      method: "POST",
      body: file,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((success) => console.log(success))
      .catch((error) => console.log(error));
  };
  const onSelectFile = () => upload(input.files[0]);
  if (input) {
    input.addEventListener("change", onSelectFile, false);
  }
  //   const submitForm = (event) => {
  //     event.preventDefault();
  //     fetch("http://localhost:8000/recipe/recipes/", {
  //         method:'POST',

  //         body: JSON.stringify({title, selectedRecipeFile}),
  //         headers:{'Content-Type': 'application/json'},
  //     })
  //     .then(response => response.json())
  //     .then(json => setTitle(json.title))

  //     const formData = new FormData();
  //     formData.append("title", title);
  //     formData.append("file", selectedRecipeFile);
  //   };

  return (
    <div className="AddRecipe">
      <form action="">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <FileUploader
          onFileSelectSuccess={(file) => setSelectedRecipeFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        />
        <button onClick={AddRecipe}>Submit</button>
        {/* <input
          type="file"
          value={selectedRecipeFile}
          onChange={(event) => setSelectedRecipeFile(event.target.files[0])}
        /> */}
      </form>
    </div>
  );
};
export default AddRecipe;
