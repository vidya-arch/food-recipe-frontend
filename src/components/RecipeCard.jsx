import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../features/favoriteSlice";

function RecipeCard({ recipe, onDelete }) {
  const dispatch = useDispatch();

  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.some(fav => fav.id === recipe.id);

  function handleFavorite() {
    if (isFavorite) {
      dispatch(removeFavorite(recipe.id));
    } else {
      dispatch(addFavorite(recipe));
    }
  }

  return (
    <div className="card">

      <div className="card-image-wrap">
        <img
          src={recipe.image}
          alt={recipe.name}
        />

        <span className="card-cuisine-tag">
          {recipe.cuisine}
        </span>

        <span className="card-rating-tag">
          ⭐ {recipe.rating}
        </span>
      </div>

      <div className="card-body">
        <h3>{recipe.name}</h3>

        <p className="card-category">
          {recipe.category}
        </p>

        <div className="card-meta">
          <span>⏱ {recipe.prepTime}</span>
          <span>🔥 {recipe.calories} kcal</span>
        </div>

        {/* Favorite Button */}
        <button
          className={`favorite-btn ${isFavorite ? "favorite-btn--active" : ""}`}
          onClick={handleFavorite}
        >
          {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
        </button>

        <div className="card-actions">
          <Link
            to={`/recipes/${recipe.id}`}
            className="card-action-btn view-btn"
          >
            👁 View
          </Link>

          <Link
            to={`/edit-recipe/${recipe.id}`}
            className="card-action-btn edit-btn"
          >
            ✏ Edit
          </Link>

          <button
            className="card-action-btn delete-btn"
            onClick={() => onDelete(recipe.id)}
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
