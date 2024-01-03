import React, { useRef } from "react";
import { useSelector } from "react-redux";
import MovieTitle from "./MovieTitle";
import BackgroundVideo from "./BackgroundVideo";
import { useIsVisible } from "../hooks/useIsVisible";

const MainContainer = () => {
  const movies = useSelector((store) => store.movie?.nowPlayingMovies);
  const ref1 = useRef();
  const isVisible1 = useIsVisible(ref1);
  if (!movies) return;
  const randomIndex = Math.trunc(Math.random() * 20);
  const trailermovie = movies[randomIndex];

  console.log(trailermovie);
  const { id, title, overview } = trailermovie;

  return (
    <div
      ref={ref1}
      className={`my-4 transition-opacity ease-in duration-700 ${
        isVisible1 ? "opacity-100" : "opacity-0"
      }`}
    >
      <MovieTitle title={title} overview={overview} id={id} />
      <BackgroundVideo id={id} />
    </div>
  );
};

export default MainContainer;
