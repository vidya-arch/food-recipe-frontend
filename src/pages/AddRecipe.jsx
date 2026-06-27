import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddRecipe() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    difficulty: "",
    image: "",
    cookTime: "",
    servings: "",
    rating: "",
    diet: "",
    ingredients: "",
    steps: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newRecipe = {
      ...formData,
      servings: Number(formData.servings),
      rating: Number(formData.rating),

      ingredients: formData.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      steps: formData.steps
        .split("\n")
        .map((step) => step.trim())
        .filter(Boolean),
    };

    await api.post("/recipes", newRecipe);
    navigate("/recipes");
  }

  return (
    <div className="form-container">
      <h2>🍽️ Add New Recipe</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Recipe Name *"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine (e.g. Indian) *"
          onChange={handleChange}
          required
        />

        <select
          name="difficulty"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled>
            Select Difficulty
          </option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />

        <input
          type="text"
          name="cookTime"
          placeholder="Cook Time (e.g. 30 mins)"
          onChange={handleChange}
        />

        <input
          type="number"
          name="servings"
          placeholder="Servings"
          onChange={handleChange}
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (0 - 5)"
          step="0.1"
          min="0"
          max="5"
          onChange={handleChange}
        />

        <select
          name="diet"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled>
            Select Diet Type
          </option>
          <option>Vegetarian</option>
          <option>Non-Vegetarian</option>
          <option>Vegan</option>
        </select>

        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          onChange={handleChange}
        />

        <textarea
          name="steps"
          placeholder="Cooking Steps (one step per line)"
          rows="6"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="submit-btn"
        >
          🍴 Add Recipe
        </button>

      </form>
    </div>
  );
}

export default AddRecipe;