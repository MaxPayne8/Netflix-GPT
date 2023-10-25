import React from "react";

import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const MovieList = ({ movList, title }) => {
  return (
    <div className=" ">
      <h1 className="text-white ml-3 text-xl">{title}</h1>
      <div className="flex  overflow-x-scroll no-scrollbar ">
        {movList?.map((mov) => (
          <Link to={"/browse/" + mov.id}>
            <MovieCard
              posterId={mov.poster_path}
              title={mov.title}
              key={mov.id}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
