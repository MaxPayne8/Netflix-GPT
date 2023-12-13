import React from "react";

import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const PureMovieList = ({ movList, title }) => {
  return (
    <div className=" ">
      <h1 className="text-white ml-3 text-3xl">{title}</h1>
      <div className="flex  overflow-x-scroll no-scrollbar ">
        {movList?.map((mov) => (
          <Link to={"/browse/moreinfo/" + mov?.id}>
            <MovieCard posterId={mov?.poster_path} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PureMovieList;
