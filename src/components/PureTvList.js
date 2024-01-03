import React, { useRef } from "react";

import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useIsVisible } from "../hooks/useIsVisible";

const PureTvList = ({ movList, title }) => {
  const ref3 = useRef();
  const isVisible3 = useIsVisible(ref3);
  return (
    <div
      ref={ref3}
      className={`transition-opacity ease-in duration-700 ${
        isVisible3 ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-white ml-3 text-3xl">{title}</h1>
      <div className="flex  overflow-x-scroll no-scrollbar ">
        {movList?.map((mov) => (
          <Link to={"/browse/moreinfoTv/" + mov?.id}>
            <MovieCard posterId={mov?.poster_path} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PureTvList;
