import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    category: "",
    difficulty: "",
    image: "",
    description: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    rating: "",
    calories: "",
    diet: "",
    spiceLevel: "",
    famousFor: "",
    ingredients: "",
    steps: "",
  });

  useEffect(() => {
    getRecipe();
  }, []);

  async function getRecipe() {
    const response = await api.get(`/recipes/${id}`);
    const r = response.data;

    // Convert arrays back to editable strings
    setFormData({
      ...r,
      ingredients: Array.isArray(r.ingredients)
        ? r.ingredients.join(", ")
        : r.ingredients || "",
      steps: Array.isArray(r.steps)
        ? r.steps.join("\n")
        : r.steps || "",
    });
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const updatedRecipe = {
      ...formData,
      servings: Number(formData.servings),
      rating: Number(formData.rating),
      calories: Number(formData.calories),
      ingredients: typeof formData.ingredients === "string"
        ? formData.ingredients.split(",").map((i) => i.trim()).filter(Boolean)
        : formData.ingredients,
      steps: typeof formData.steps === "string"
        ? formData.steps.split("\n").map((s) => s.trim()).filter(Boolean)
        : formData.steps,
    };

    await api.put(`/recipes/${id}`, updatedRecipe);
    navigate("/recipes");
  }

  return (
    <div className="form-container">
      <h2>✏️ Edit Recipe</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Recipe Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cuisine"
            placeholder="Cuisine"
            value={formData.cuisine}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="" disabled>Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="form-row">
          <input
            type="text"
            name="prepTime"
            placeholder="Prep Time"
            value={formData.prepTime}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cookTime"
            placeholder="Cook Time"
            value={formData.cookTime}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <input
            type="number"
            name="servings"
            placeholder="Servings"
            value={formData.servings}
            onChange={handleChange}
          />
          <input
            type="number"
            name="calories"
            placeholder="Calories"
            value={formData.calories}
            onChange={handleChange}
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
          >
            <option value="" disabled>Diet Type</option>
            <option>Vegetarian</option>
            <option>Non-Vegetarian</option>
            <option>Vegan</option>
          </select>
          <select
            name="spiceLevel"
            value={formData.spiceLevel}
            onChange={handleChange}
          >
            <option value="" disabled>Spice Level</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <input
          type="text"
          name="famousFor"
          placeholder="Famous For"
          value={formData.famousFor}
          onChange={handleChange}
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={formData.ingredients}
          onChange={handleChange}
        />

        <textarea
          name="steps"
          placeholder="Cooking Steps (one per line)"
          rows="6"
          value={formData.steps}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">
          💾 Update Recipe
        </button>
      </form>
    </div>
  );
}

export default EditRecipe;
