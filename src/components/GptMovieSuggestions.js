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
    <div className="w-screen ">
      <div className="absolute top-[400px]   z-20 flex flex-wrap  bg-black ">
        {/* {gptMov?.map((mov) => (
        <h1>{mov}</h1>
      ))} */}
        {tmdbMov?.map((mov) => (
          <Link to={"/browse/" + mov?.id}>
            {" "}
            <MovieCard posterId={mov?.poster_path} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
