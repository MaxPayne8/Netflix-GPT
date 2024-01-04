import React from "react";
import { useSelector } from "react-redux";

import MovieCard from "./MovieCard";

const Results = () => {
  const data = useSelector((store) => store?.movie?.movies);
  //console.log(data);
  return (
    <div className="absolute w-full top-[650px] md:top-[400px] px-6  bg-black ">
      {data?.map((movie) => (
        <MovieCard posterId={movie.poster_path} />
      ))}
    </div>
  );
};

export default Results;
