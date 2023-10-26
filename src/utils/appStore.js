import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./moviesSlice";
import langReducer from "./langSlice";

const appStore = configureStore({
  reducer: { user: userReducer, movie: movieReducer, language: langReducer },
});

export default appStore;
