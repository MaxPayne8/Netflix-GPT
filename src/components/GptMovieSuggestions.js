import React from "react";
import { useSelector } from "react-redux";

import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gptMov = useSelector((store) => store.gptMovies?.gMovies);
  const tmdbMov = useSelector((store) => store.gptMovies?.tmdbMov);

  return (
    <div className="absolute w-full top-[650px] md:top-[400px] px-6  bg-black ">
      {tmdbMov?.map((list, index) => (
        <MovieList movList={list} title={gptMov[index]} />
      ))}
    </div>
  );
};

export default GptMovieSuggestions;
