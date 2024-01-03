import React, { useRef } from "react";

import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useIsVisible } from "../hooks/useIsVisible";

const PureMovieList = ({ movList, title }) => {
  const ref2 = useRef();
  const isVisible2 = useIsVisible(ref2);
  return (
    <div
      ref={ref2}
      className={`transition-opacity ease-in duration-700 ${
        isVisible2 ? "opacity-100" : "opacity-0"
      }`}
    >
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
