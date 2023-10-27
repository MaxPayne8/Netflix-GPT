import React from "react";
import { useSelector } from "react-redux";
import MovieTitle from "./MovieTitle";
import BackgroundVideo from "./BackgroundVideo";

const MainContainer = () => {
  const movies = useSelector((store) => store.movie?.nowPlayingMovies);
  if (!movies) return;
  const trailermovie = movies[0];
  console.log(trailermovie);
  const { id, title, overview } = trailermovie;

  return (
    <div className="w-[100%]">
      <MovieTitle title={title} overview={overview} />
      <BackgroundVideo id={id} />
    </div>
  );
};

export default MainContainer;
