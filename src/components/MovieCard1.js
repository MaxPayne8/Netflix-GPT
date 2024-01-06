import React from "react";
import { ImgCDN } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard1 = ({ posterId, id, media, title }) => {
  if (!posterId) return null;
  if (media === "movie")
    return (
      <Link to={"/browse/moreinfo/" + id}>
        <div className="w-36 relative hover:border-2 group hover:border-blue-700 hover:shadow-xl m-6 hover:shadow-blue-800  transition hover:scale-125 ease-in-out ">
          <img className=" " src={ImgCDN + posterId} alt="movie-poster" />
          <div className="text-white absolute top-0  bottom-0 left-0 right-0 text-center  bg-gradient-to-b from-black opacity-0 group-hover:opacity-100">
            <h1 className="mt-10">{title}</h1>
          </div>
        </div>
      </Link>
    );
  else if (media === "tv")
    return (
      <Link to={"/browse/moreinfotv/" + id}>
        <div className="w-36 relative hover:border-2 group hover:border-blue-700 hover:shadow-xl m-6 hover:shadow-blue-800  transition hover:scale-125 ease-in-out">
          <img className=" " src={ImgCDN + posterId} alt="movie-poster" />
          <div className="text-white absolute top-0  bottom-0 left-0 right-0 text-center  bg-gradient-to-b from-black opacity-0 group-hover:opacity-100">
            <h1 className="mt-10">{title}</h1>
          </div>
        </div>
      </Link>
    );
  else
    return (
      <Link to={"/browse/actor/" + id}>
        <div className="w-36 relative hover:border-2 group hover:border-blue-700 hover:shadow-xl m-6 hover:shadow-blue-800  transition hover:scale-125 ease-in-out">
          <img className=" " src={ImgCDN + posterId} alt="movie-poster" />
          <div className="text-white absolute top-0  bottom-0 left-0 right-0 text-center  bg-gradient-to-b from-black opacity-0 group-hover:opacity-100">
            <h1 className="mt-10">{title}</h1>
          </div>
        </div>
      </Link>
    );
};

export default MovieCard1;
