import { useDispatch } from "react-redux";
import { addTrending } from "../utils/moviesSlice";
import { API_TMDB_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

import React from "react";

const useTrending = () => {
  const dispatch = useDispatch();

  const getTrending = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      API_TMDB_OPTIONS
    );

    const json = await data.json();

    dispatch(addTrending(json.results));
  };

  useEffect(() => {
    getTrending();
  }, []);
};

export default useTrending;
