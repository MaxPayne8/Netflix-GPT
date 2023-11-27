import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MovieTitle = ({ title, overview }) => {
  const getMov = useSelector((store) => store.movie.nowPlayingMovies);
  const finalMov = getMov[0];
  const { id } = finalMov;
  const newOverView = overview.substring(0, 280);
  console.log(finalMov);
  return (
    <div className="absolute top-[320px] text-sm sm:top-[200px] md:-mt-[400px] sm:text-xl   w-screen md:w-auto   aspect-video md:pt-[25%] pl-4 md:pl-8 bg-gradient-to-b from-black  text-white ">
      <h1 className="font-bold text-xl text-red-800 mt-1 md:mt-0 md:text-6xl mb-2">
        {title}
      </h1>
      <p className="font-semibold md:w-[70%]   md:h-auto md:text-base">
        {newOverView}..
      </p>
      <Link to={"/browse/moreinfo/" + id}>
        <button className="bg-blue-700 mt-4 p-2 rounded-lg hover:bg-blue-500">
          More Info❕
        </button>
      </Link>
    </div>
  );
};

export default MovieTitle;
