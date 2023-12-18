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
    actors: null,
    trending: null,
    nowPlayingTv: null,
    popularTv: null,
    topRatedTv: null,
    movies: null,
    actorDetails: null,
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
    },
    addActors: (state, action) => {
      state.actors = action.payload;
    },
    addTrending: (state, action) => {
      state.trending = action.payload;
    },
    addNowPlayingTv: (state, action) => {
      state.nowPlayingTv = action.payload;
    },
    addPopularTv: (state, action) => {
      state.popularTv = action.payload;
    },
    addTopRatedTv: (state, action) => {
      state.topRatedTv = action.payload;
    },
    addMovie: (state, action) => {
      state.movies = action.payload;
    },
    addActorDetails: (state, action) => {
      state.actorDetails = action.payload;
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
  addActors,
  addTrending,
  addNowPlayingTv,
  addPopularTv,
  addTopRatedTv,
  addMovie,
  addActorDetails,
} = moviesSlice.actions;

export default moviesSlice.reducer;
