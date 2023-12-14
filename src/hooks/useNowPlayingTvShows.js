import { useDispatch } from "react-redux";
import { addNowPlayingMovies, addNowPlayingTv } from "../utils/moviesSlice";
import { API_TMDB_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

import React from "react";

const useNowPlayingTvShows = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
      API_TMDB_OPTIONS
    );

    const json = await data.json();

    dispatch(addNowPlayingTv(json.results));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingTvShows;
