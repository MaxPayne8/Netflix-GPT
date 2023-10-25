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
      <div className="absolute  w-screen aspect-video pt-[20%] pl-8 bg-gradient-to-r from-black text-white ">
        <h1 className="font-bold text-6xl mb-2">{title}</h1>
        <p className="font-semibold w-1/2  text-xl">{overview}</p>
        <Link to={"/browse/" + id}>
          <button className="bg-blue-700 mt-3 p-2 rounded-lg">
            More Info❕
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MovieTitle;
