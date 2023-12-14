import React from "react";

import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const MovieList = ({ movList, title }) => {
  return (
    <div className=" my-4 ">
      <h1 className="text-white  ml-3 text-3xl">{title}</h1>
      <div className="flex  overflow-x-scroll no-scrollbar ">
        {movList?.map((mov) =>
          mov?.media_type === "movie" ? (
            <Link to={"/browse/moreinfo/" + mov?.id}>
              <MovieCard posterId={mov?.poster_path} />
            </Link>
          ) : (
            <Link to={"/browse/moreinfotv/" + mov?.id}>
              <MovieCard posterId={mov?.poster_path} />
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default MovieList;
