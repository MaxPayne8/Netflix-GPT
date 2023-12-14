import React, { useEffect } from "react";
import { API_TMDB_OPTIONS } from "../utils/constants";
import { addPopularTv } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";

const usePopularTv = () => {
  const dispatch = useDispatch();

  const getPopularTv = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      API_TMDB_OPTIONS
    );

    const json = await data.json();

    dispatch(addPopularTv(json.results));
  };

  useEffect(() => {
    getPopularTv();
  }, []);
};

export default usePopularTv;
