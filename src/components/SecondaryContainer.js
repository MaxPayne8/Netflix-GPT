import React from "react";
import MovieList from "./MovieList";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  const nowPlaying = useSelector((store) => store.movie.nowPlayingMovies);
  const popular = useSelector((store) => store.movie.popularMovies);
  const topRated = useSelector((store) => store.movie.topRatedMovies);
  const upcoming = useSelector((store) => store.movie.upcomingMovies);
  console.log(popular);
  console.log(nowPlaying);
  console.log(topRated);
  console.log(upcoming);

  return (
    <div className=" w-full  ">
      <div className="relative mt-[370px]  md:-mt-[200px] ml-5">
        <MovieList movList={nowPlaying} title="Now Playing Movies" />

        <MovieList movList={topRated} title="Top Rated Movies" />
        <MovieList movList={upcoming} title="Upcoming Movies" />
        <MovieList movList={popular} title="Popular Movies" />
      </div>
    </div>
  );
};

export default SecondaryContainer;
