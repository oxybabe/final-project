import { useEffect, useState, } from "react";
import UserLogin from "./login";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";

import "./App.css";

const App = () => {
  let [newRecipes, setNewRecipes] = useState({
    title: "", 
    image: "", 
    cookingtime: "",
    servings: "",
    ingredients: "",
    directions: "",
  });


 const handleSubmit = (e) => {
  (`http://127.0.0.1:8000/recipes/${id}/`);
  setNewRecipes({
    title: "",
    image: "",
    cookingtime: "",
    servings: "",
    ingredients: "",
    directions: "",
  });
 
  return (
    <>
    <form onSubmit={handleSubmit}>
   
        <input
          type="text"
          name="title"
          value={newRecipes.title}
          onChange={(e) =>
            setNewRecipes({ ...newRecipes, title: e.target.value })
          }
        />

        <button type="submit">Submit</button>
      </form>
    </>
  )
 }
};

export default App;
