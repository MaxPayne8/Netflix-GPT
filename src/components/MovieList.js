import React, { useRef } from "react";

import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useIsVisible } from "../hooks/useIsVisible";

const MovieList = ({ movList, title }) => {
  const ref1 = useRef();
  const isVisible1 = useIsVisible(ref1);
  return (
    <div
      ref={ref1}
      className={`my-4 transition-opacity ease-in duration-700 ${
        isVisible1 ? "opacity-100 " : "opacity-0"
      }`}
    >
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
