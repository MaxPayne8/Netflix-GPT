import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    moreInfo: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    similarMovies: null,
    review: null,
    actors:null
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailer: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addMoreInfo: (state, action) => {
      state.moreInfo = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addSimilarMovies: (state, action) => {
      state.similarMovies = action.payload;
    },
    addReview: (state, action) => {
      state.review = action.payload;
    }, addActors: (state, action) => {
      state.actors = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailer,
  addMoreInfo,
  addPopularMovies,
  addUpcomingMovies,
  addTopRatedMovies,
  addSimilarMovies,
  addReview,
  addActors
} = moviesSlice.actions;

export default moviesSlice.reducer;
