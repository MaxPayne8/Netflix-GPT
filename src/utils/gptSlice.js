import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptMovies",
  initialState: {
    gMovies: null,
    tmdbMov: null,
  },
  reducers: {
    addGptMovies: (state, action) => {
      const { gptMovies, tmdbMovies } = action.payload;
      state.gMovies = gptMovies;
      state.tmdbMov = tmdbMovies;
    },
  },
});

export default gptSlice.reducer;

export const { addGptMovies } = gptSlice.actions;
