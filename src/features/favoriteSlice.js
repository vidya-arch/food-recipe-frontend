import { createSlice } from "@reduxjs/toolkit";

// Persist: load from localStorage on startup
const initialState =
  JSON.parse(localStorage.getItem("favorites")) || [];

const favoriteSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {

    addFavorite: (state, action) => {
      const exists = state.find(
        recipe => recipe.id === action.payload.id
      );
      if (!exists) {
        state.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state));
      }
    },

    removeFavorite: (state, action) => {
      const updated = state.filter(
        recipe => recipe.id !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    }

  }
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
