import React, { useEffect } from "react";
import { addTopRatedMovies, addTopRatedTv } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";
import { API_TMDB_OPTIONS } from "../utils/constants";

const useTopTv = () => {
  const dispatch = useDispatch();

  const getTopTv = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      API_TMDB_OPTIONS
    );

    const json = await data.json();

    dispatch(addTopRatedTv(json.results));
  };

  useEffect(() => {
    getTopTv();
  }, []);
};

export default useTopTv;
