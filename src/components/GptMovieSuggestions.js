import React, { useState } from "react";
import { useSelector } from "react-redux";

import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  // const [showResults, setShowResults] = useState(false);
  const gptMov = useSelector((store) => store.gptMovies?.gMovies);
  const tmdbMov = useSelector((store) => store.gptMovies?.tmdbMov);
  // if (tmdbMov?.length === 20) setShowResults(true);
  console.log(gptMov);
  console.log(tmdbMov);

  return (
    <div className="absolute w-full top-[650px] md:top-[400px] px-6  bg-black ">
      {tmdbMov?.map((list, index) => (
        <MovieList movList={list} title={gptMov[index]} />
      ))}
    </div>
  );
};

export default GptMovieSuggestions;
