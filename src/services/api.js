import axios from "axios";

const api = axios.create({
  baseURL: "https://food-recipe-backend-rrmn.onrender.com"
});

export default api;
