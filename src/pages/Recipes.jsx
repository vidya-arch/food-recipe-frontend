import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/api";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchParams] = useSearchParams();

  const [search, setSearch]     = useState("");
  const [cuisine, setCuisine]   = useState(searchParams.get("cuisine") || "All");
  const [category, setCategory] = useState("All");
  const [diet, setDiet]         = useState("All");
  const [sort, setSort]         = useState("");

  useEffect(() => {
    getRecipes();
  }, []);

  async function getRecipes() {
    try {
      const response = await api.get("/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteRecipe(id) {
    await api.delete(`/recipes/${id}`);
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  const filtered = recipes.filter((recipe) => {
    const q = search.toLowerCase();

    const searchMatch =
      (recipe.name?.toLowerCase() || "").includes(q) ||
      (recipe.cuisine?.toLowerCase() || "").includes(q) ||
      (recipe.category?.toLowerCase() || "").includes(q) ||
      (recipe.diet?.toLowerCase() || "").includes(q) ||
      (recipe.difficulty?.toLowerCase() || "").includes(q);

    const cuisineMatch  = cuisine === "All"  || recipe.cuisine === cuisine;
    const categoryMatch = category === "All" || recipe.category === category;
    const dietMatch     = diet === "All"     || recipe.diet === diet;

    return searchMatch && cuisineMatch && categoryMatch && dietMatch;
  });

  let finalRecipes = [...filtered];

  if (sort === "high")          finalRecipes.sort((a, b) => b.rating - a.rating);
  if (sort === "low")           finalRecipes.sort((a, b) => a.rating - b.rating);
  if (sort === "calories-low")  finalRecipes.sort((a, b) => a.calories - b.calories);
  if (sort === "calories-high") finalRecipes.sort((a, b) => b.calories - a.calories);

  return (
    <div className="recipes-page">

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="All">All Cuisines</option>
          <option value="Indian">Indian</option>
          <option value="Italian">Italian</option>
          <option value="Chinese">Chinese</option>
          <option value="Mexican">Mexican</option>
          <option value="American">American</option>
          <option value="Thai">Thai</option>
          <option value="Japanese">Japanese</option>
          <option value="French">French</option>
          <option value="Korean">Korean</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Main Course">Main Course</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Snack">Snack</option>
          <option value="Dessert">Dessert</option>
          <option value="Soup">Soup</option>
        </select>

        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="All">All Diets</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Vegan">Vegan</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="high">⭐ Rating: High to Low</option>
          <option value="low">⭐ Rating: Low to High</option>
          <option value="calories-low">🔥 Calories: Low to High</option>
          <option value="calories-high">🔥 Calories: High to Low</option>
        </select>
      </div>

      <h1 className="main-title">🍴 Popular Recipes</h1>

      <div className="add-btn-container">
        <Link to="/add-recipe" className="add-btn">
          ➕ Add New Recipe
        </Link>
      </div>

      <p className="results-count">
        Showing {finalRecipes.length} recipe{finalRecipes.length !== 1 ? "s" : ""}
      </p>

      <div className="recipes">
        {finalRecipes.length > 0 ? (
          finalRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={deleteRecipe}
            />
          ))
        ) : (
          <div className="no-results">
            <h2>😕 No recipes found</h2>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Recipes;