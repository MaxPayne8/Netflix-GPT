import React, { useState } from "react";
import { useSelector } from "react-redux";

import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const GptMovieSuggestions = () => {
  // const [showResults, setShowResults] = useState(false);
  const gptMov = useSelector((store) => store.gptMovies.gMovies);
  const tmdbMov = useSelector((store) => store.gptMovies.tmdbMov);
  // if (tmdbMov?.length === 20) setShowResults(true);
  console.log(gptMov);
  console.log(tmdbMov);

  return (
    <div className="absolute top-[650px] md:top-[400px] px-6 justify-between flex flex-wrap bg-black ">
      {tmdbMov?.map((mov) => (
        <Link to={"/browse/moreinfo/" + mov?.id}>
          <MovieCard posterId={mov?.poster_path} />
        </Link>
      ))}
    </div>
  );
};

export default GptMovieSuggestions;
