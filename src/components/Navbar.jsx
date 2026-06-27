import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const favorites = useSelector(state => state.favorites);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/favorites">
        ❤️ Favorites ({favorites.length})
      </Link>

      {!user && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}

      {user && (
        <>
          <span className="nav-user">👋 {user.name}</span>
          <Link to="/logout" className="nav-logout-link">Logout</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
