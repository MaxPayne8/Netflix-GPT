import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MovieTitle = ({ title, overview }) => {
  const getMov = useSelector((store) => store.movie.nowPlayingMovies);
  const finalMov = getMov[0];
  const { id } = finalMov;
  console.log(finalMov);
  return (
    <div>
      <div className="absolute mt-48 h-[400px] md:h-auto w-screen md:w-auto  md:mt-0 aspect-video md:pt-[20%] pl-4 md:pl-8 bg-gradient-to-b from-black  md:bg-gradient-to-r from-black text-white ">
        <h1 className="font-bold text-xl text-red-800 mt-1 md:mt-0 md:text-6xl mb-2">
          {title}
        </h1>
        <p className="font-semibold md:w-[70%] text-sm  md:h-auto md:text-base">
          {overview}
        </p>
        <Link to={"/browse/moreinfo/" + id}>
          <button className="bg-blue-700 mt-4 p-2 rounded-lg hover:bg-blue-500">
            More Info❕
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MovieTitle;
