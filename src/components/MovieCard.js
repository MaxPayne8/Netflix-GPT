

import React from "react";
import { ImgCDN } from "../utils/constants";

const MovieCard = ({ posterId }) => {
  if (!posterId) return null;
  return (
    <div className="w-36 hover:border-4 mx-auto border-red-700 ">
      <img className="p-2   " src={ImgCDN + posterId} alt="movie-poster" />
    </div>
  );
};

export default MovieCard;
//hover:w-48
