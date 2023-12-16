import { useDispatch, useSelector } from "react-redux";

import React, { useEffect } from "react";
import { addTrailer } from "../utils/moviesSlice";
import { API_TMDB_OPTIONS } from "../utils/constants";

const useTvTrailer = (movId) => {
  //   const movies = useSelector((store) => store.movie?.nowPlayingMovies);
  //   if (!movies) return;
  //   const trailermovie = movies[0];
  //   const { id } = trailermovie;
  const dispatch = useDispatch();
  const getTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/" + movId + "/videos?language=en-US",

      API_TMDB_OPTIONS
    );
    const json = await data.json();
    const dataa = json.results;
    const trailerVid = dataa?.filter((vid) => vid?.type === "Trailer");

    console.log(dataa);
    console.log(trailerVid);
    const finalTrailer = trailerVid[0] || trailerVid[1];
    console.log(finalTrailer);
    dispatch(addTrailer(finalTrailer));
  };
  useEffect(() => {
    getTrailer();
  }, []);
};

export default useTvTrailer;
