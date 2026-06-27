import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favoriteSlice";

function Favorites() {
  const dispatch = useDispatch();

  const favorites = useSelector(state => state.favorites);

  return (
    <div className="favorites-container">

      <h1 className="page-title"> Favorite Recipes</h1>

      {favorites.length === 0 ? (

        <div className="empty-favorites">
          <h2>No Favorite Recipes Yet</h2>
          <p>Go to the Recipes page and add some favorites!</p>
        </div>

      ) : (

        <div className="favorites-grid">
          {favorites.map(recipe => (

            <div key={recipe.id} className="favorite-card">

              <img src={recipe.image} alt={recipe.name} />

              <div className="favorite-content">
                <h2>{recipe.name}</h2>

                <p>{recipe.cuisine}</p>
                <p>{recipe.category}</p>
                <p> {recipe.rating}</p>
                <p> {recipe.calories} kcal</p>
                <p>{recipe.prepTime}</p>
                <p> {recipe.difficulty}</p>

                <button
                  onClick={() =>
                    dispatch(removeFavorite(recipe.id))
                  }
                >
                  🗑 Remove
                </button>

              </div>
            </div>

          ))}
        </div>

      )}
    </div>
  );
}

export default Favorites;
