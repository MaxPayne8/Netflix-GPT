import React from "react";
import { ImgCDN } from "../utils/constants";

const MovieCard = ({ posterId, title, rating }) => {
  if (!posterId) return;
  return (
    <div className="w-36 relative hover:border-2 group hover:border-blue-700 hover:shadow-xl m-2 text-white hover:shadow-blue-800 mx-auto transition hover:scale-125 ease-in-out">
      <img className=" " src={ImgCDN + posterId} alt="movie-poster" />
      <div className=" absolute top-0  bottom-0 left-0 right-0 text-center  bg-gradient-to-b from-black opacity-0 group-hover:opacity-100">
        <h1 className="mt-10">{title}</h1>
        <label className="">{rating}⭐</label>
      </div>
    </div>
  );
};

export default MovieCard;
