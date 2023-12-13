import React from "react";
import MovieList from "./MovieList";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import useTrending from "../hooks/useTrending";
import PureMovieList from "./PureMovieList";

const SecondaryContainer = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useTrending();
  const nowPlaying = useSelector((store) => store.movie.nowPlayingMovies);
  const popular = useSelector((store) => store.movie.popularMovies);
  const topRated = useSelector((store) => store.movie.topRatedMovies);
  const upcoming = useSelector((store) => store.movie.upcomingMovies);
  const trending = useSelector((store) => store.movie.trending);
  console.log(popular);
  console.log(nowPlaying);
  console.log(topRated);
  console.log(upcoming);
  console.log(trending);

  return (
    <div className=" w-full  ">
      <div className="relative mt-[370px]  md:-mt-[200px] ml-5">
        <MovieList movList={trending} title="Trending Movies and TV Shows" />
        <PureMovieList movList={nowPlaying} title="Now Playing Movies" />

        <PureMovieList movList={topRated} title="Top Rated Movies" />
        <PureMovieList movList={upcoming} title="Upcoming Movies" />
        <PureMovieList movList={popular} title="Popular Movies" />
      </div>
    </div>
  );
};

export default SecondaryContainer;
