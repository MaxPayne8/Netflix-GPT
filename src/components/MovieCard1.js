import React from "react";
import { ImgCDN } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard1 = ({ posterId, id, media }) => {
  if (!posterId) return null;
  return media === "movie" ? (
    <Link to={"/browse/moreinfo/" + id}>
      <div className="w-36 hover:border-4 mx-auto border-red-700 ">
        <img className="p-2   " src={ImgCDN + posterId} alt="movie-poster" />
      </div>
    </Link>
  ) : (
    <Link to={"/browse/moreinfotv/" + id}>
      <div className="w-36 hover:border-4 mx-auto border-red-700 ">
        <img className="p-2   " src={ImgCDN + posterId} alt="movie-poster" />
      </div>
    </Link>
  );
};

export default MovieCard1;