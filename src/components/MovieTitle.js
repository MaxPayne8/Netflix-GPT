import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const MovieTitle = ({ title, overview, id }) => {
  useEffect(() => {
    Aos.init();
  }, []);

  const getMov = useSelector((store) => store.movie.nowPlayingMovies);

  const finalMov = getMov[id];

  const newOverview = overview.substring(0, 130);

  console.log(finalMov);
  return (
    <div
      data-aos="zoom-in"
      className="absolute top-[320px] text-sm  md:-mt-[530px]   w-screen md:w-full   aspect-video md:pt-[25%] pl-4 md:pl-8 bg-gradient-to-b from-black  text-white "
    >
      <h1 className="font-bold overflow-hidden text-xl text-red-800 mt-1 md:mt-0 md:text-5xl mb-2">
        {title}
      </h1>

      <p className="font-semibold md:w-[60%] w-[90%]  md:h-auto md:text-base">
        {newOverview}..
      </p>
      <Link to={"/browse/moreinfo/" + id}>
        <button className="bg-blue-700 mt-1 p-2 rounded-lg hover:bg-blue-500">
          More Info❕
        </button>
      </Link>
    </div>
  );
};

export default MovieTitle;
