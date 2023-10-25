import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movie",
  initialState: { nowPlayingMovies : null , trailerVideo : null , moreInfo:null ,popularMovies:null,topRatedMovies:null, upcomingMovies:null,similarMovies:null},
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailer:(state,action)=>{
        state.trailerVideo = action.payload;
    },
    addMoreInfo:(state,action)=>{
        state.moreInfo = action.payload;
    },
    addPopularMovies:(state,action)=>{
        state.popularMovies = action.payload;
    },
    addTopRatedMovies:(state,action)=>{
        state.topRatedMovies = action.payload;
    },
    addUpcomingMovies:(state,action)=>{
        state.upcomingMovies = action.payload;
    },
    addSimilarMovies:(state,action)=>{
        state.similarMovies= action.payload;
    }
  },
});

export const { addNowPlayingMovies , addTrailer, addMoreInfo , addPopularMovies,addUpcomingMovies,addTopRatedMovies,addSimilarMovies} = moviesSlice.actions;

export default moviesSlice.reducer;
