import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./moviesSlice";
import langReducer from "./langSlice";
import gptReducer from "./gptSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
    language: langReducer,
    gptMovies: gptReducer,
  },
});

export default appStore;
