import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.get("/users", {
      params: {
        email: email.trim().toLowerCase(),
        password,
      },
    });

    if (response.data.length > 0) {
      localStorage.setItem("user", JSON.stringify(response.data[0]));
      navigate("/");
      window.location.reload();
    } else {
      alert("Invalid Credentials");
    }
  }

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>Welcome Back</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password row — wrapper holds input + icon together */}
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            marginBottom: "18px"
          }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ marginBottom: 0, paddingRight: "46px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "14px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                padding: 0,
                lineHeight: 1,
                color: "#92400e",
                display: "flex",
                alignItems: "center"
              }}
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button className="submit-btn">Login</button>
        </form>

        <p>
          Don&apos;t have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
