import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    getRecipe();
    setShowSteps(false);
  }, [id]);

  async function getRecipe() {
    try {
      const response = await api.get(`/recipes/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!recipe) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">
      <div className="details-hero">
        <img src={recipe.image} alt={recipe.name} />

        <div className="details-hero-overlay">
          <span className="badge">{recipe.cuisine}</span>
          <h1>{recipe.name}</h1>
          <p className="tagline">{recipe.famousFor}</p>
        </div>
      </div>

      <p className="description">{recipe.description}</p>

      <div className="stats-strip">
        <div className="stat-pill">
          <span className="stat-label">Prep</span>
          <span className="stat-value">{recipe.prepTime}</span>
        </div>
        <div className="stat-pill">
          <span className="stat-label">Cook</span>
          <span className="stat-value">{recipe.cookTime}</span>
        </div>
        <div className="stat-pill">
          <span className="stat-label">Serves</span>
          <span className="stat-value">{recipe.servings}</span>
        </div>
        <div className="stat-pill">
          <span className="stat-label">Calories</span>
          <span className="stat-value">{recipe.calories}</span>
        </div>
        <div className="stat-pill">
          <span className="stat-label">Rating</span>
          <span className="stat-value">⭐ {recipe.rating}</span>
        </div>
      </div>

      <div className="details-grid">
        <div className="info-card">
          <h3>Category</h3>
          <p>{recipe.category}</p>
        </div>

        <div className="info-card">
          <h3>Difficulty</h3>
          <p>{recipe.difficulty}</p>
        </div>

        <div className="info-card">
          <h3>Diet</h3>
          <p>{recipe.diet}</p>
        </div>

        <div className="info-card">
          <h3>Spice Level</h3>
          <p>{recipe.spiceLevel}</p>
        </div>

        <div className="info-card ingredients-card">
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="steps-section">
        <button
          className="steps-toggle-btn"
          onClick={() => setShowSteps(!showSteps)}
        >
          {showSteps ? "Hide Steps" : "Steps to Cook"}
        </button>

        {showSteps && (
          <ol className="steps-list">
            {recipe.steps && recipe.steps.length > 0 ? (
              recipe.steps.map((step, index) => (
                <li key={index}>
                  <span className="step-number">{index + 1}</span>
                  <span className="step-text">{step}</span>
                </li>
              ))
            ) : (
              <li>No steps available for this recipe yet.</li>
            )}
          </ol>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;
