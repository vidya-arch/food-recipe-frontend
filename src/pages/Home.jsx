import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const cuisines = [
    { name: "Indian", emoji: "🍛" },
    { name: "Italian", emoji: "🍕" },
    { name: "Mexican", emoji: "🌮" },
    { name: "Chinese", emoji: "🥡" },
    { name: "Thai", emoji: "🍜" },
    { name: "Japanese", emoji: "🍣" },
    { name: "French", emoji: "🥖" },
    { name: "Korean", emoji: "🍲" }
  ];

  function handleCuisineClick(cuisineName) {
    navigate(`/recipes?cuisine=${cuisineName}`);
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <span className="hero-eyebrow">Recipe Explorer</span>
          <h1>Cook something new today</h1>
          <p>
            Browse recipes from around the world, see exactly what you
            need, and follow step-by-step instructions to cook with
            confidence.
          </p>
          <button
            className="hero-btn"
            onClick={() => navigate("/recipes")}
          >
            Explore Recipes
          </button>
        </div>

        <div className="hero-art">
          <span>🍳</span>
          <span>🍲</span>
          <span>🥗</span>
          <span>🍣</span>
        </div>
      </section>

      <section className="cuisine-strip">
        <h2>Cuisines to explore</h2>
        <div className="cuisine-chips">
          {cuisines.map((c) => (
            <button
              key={c.name}
              className="cuisine-chip"
              onClick={() => handleCuisineClick(c.name)}
            >
              <span className="cuisine-emoji">{c.emoji}</span>
              {c.name}
            </button>
          ))}
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">📋</span>
          <h3>Clear Ingredients</h3>
          <p>Every recipe lists exactly what you need before you start.</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">👩‍🍳</span>
          <h3>Step-by-Step Cooking</h3>
          <p>Tap "Steps to Cook" on any recipe for guided instructions.</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">🌍</span>
          <h3>Global Flavors</h3>
          <p>From Indian curries to Korean bowls — explore world cuisine.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;