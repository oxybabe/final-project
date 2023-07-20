import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

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
  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // const [selectedRecipeFile, setSelectedRecipeFile] = useState(false);
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
  };
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleClick = (event) => {
    setIsShown(true);
  };

  return (
    <div className="form-group">
      <Button style={{ backgroundColor: "#20695e", marginTop: "20px" }} onClick={handleShowModal}>
        Add Custom Recipe To Personal Collection Here
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header style={{ color: "#f4e9cd", background: "#123c69" }}>
          Add to your collection:
        </Modal.Header>
        <Form onSubmit={handleSubmit} style={{ background: "#123c69" }}>
          <Form.Group controlId="title">
            <Form.Label style={{ color: "#f4e9cd" }}>Recipe Title:</Form.Label>
            <Form.Control
              style={{ background: "#f4e9cd" }}
              type="text"
              placeholder="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label style={{ color: "#f4e9cd" }}>Add Image:</Form.Label>
            <Form.Control
              type="file"
              style={{ background: "#f4e9cd" }}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label style={{ color: "#f4e9cd" }}>
              Recipe Description:
            </Form.Label>
            <Form.Control
              placeholder="description"
              style={{ background: "#f4e9cd" }}
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="dish type">
            <Form.Label style={{ color: "#f4e9cd" }}>
              Recipe Dish Type:
            </Form.Label>
            <Form.Control
              placeholder="dish type"
              style={{ background: "#f4e9cd" }}
              type="text"
              value={dishType}
              onChange={(event) => setDishType(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="cooking time">
            <Form.Label style={{ color: "#f4e9cd" }}>Cooking Time:</Form.Label>
            <Form.Control
              placeholder="cooking time"
              style={{ background: "#f4e9cd" }}
              type="text"
              value={cookingTime}
              onChange={(event) => setCookingTime(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="servings">
            <Form.Label style={{ color: "#f4e9cd" }}>Servings:</Form.Label>
            <Form.Control
              placeholder="servings"
              style={{ background: "#f4e9cd" }}
              type="text"
              value={servings}
              onChange={(event) => setServings(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="ingredients">
            <Form.Label style={{ color: "#f4e9cd" }}>Ingredients:</Form.Label>
            <Form.Control
              placeholder="ingredients"
              style={{ background: "#f4e9cd" }}
              type="text"
              value={ingredients}
              onChange={(event) => setIngredients(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="directions">
            <Form.Label style={{ color: "#f4e9cd" }}>Directions:</Form.Label>
            <Form.Control
              placeholder="directions"
              style={{ background: "#f4e9cd" }}
              type="text"
              value={directions}
              onChange={(event) => setDirections(event.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            style={{ backgroundColor: "#ac3b61", border: "#f4e9cd" }}
            type="submit"
          >
            Submit
          </Button>
        </Form>

        <Button
          style={{
            backgroundColor: "#20695e",
            border: "#f4e9cd",
            marginBottom: "10px",
          }}
          className="btn btn-secondary"
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
      </Modal>

      <br />
    </div>
  );
};
export default AddRecipe;
