import React from "react";
import { ImgCDN } from "../utils/constants";

const MovieCard = ({ posterId }) => {
  if (!posterId) return null;
  return (
    <div className="w-36 hover:border-2 hover:border-blue-700 hover:shadow-xl m-2 hover:shadow-blue-800 mx-auto transition hover:scale-125 ease-in-out">
      <img className=" " src={ImgCDN + posterId} alt="movie-poster" />
    </div>
  );
};

export default MovieCard;
//hover:w-48
