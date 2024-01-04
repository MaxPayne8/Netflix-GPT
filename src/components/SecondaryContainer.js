import React, { useEffect } from "react";
import MovieList from "./MovieList";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import useTrending from "../hooks/useTrending";
import PureMovieList from "./PureMovieList";
import useNowPlayingTvShows from "../hooks/useNowPlayingTvShows";
import PureTvList from "./PureTvList";
import usePopularTv from "../hooks/usePopularTv";
import useTopTv from "../hooks/useTopTv";

const SecondaryContainer = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useTrending();
  useNowPlayingTvShows();
  usePopularTv();
  useTopTv();
  const nowPlaying = useSelector((store) => store.movie.nowPlayingMovies);
  const popular = useSelector((store) => store.movie.popularMovies);
  const topRated = useSelector((store) => store.movie.topRatedMovies);
  const upcoming = useSelector((store) => store.movie.upcomingMovies);
  const trending = useSelector((store) => store.movie.trending);
  const nowPlayingTv = useSelector((store) => store.movie.nowPlayingTv);
  const popularTv = useSelector((store) => store.movie.popularTv);
  const topTv = useSelector((store) => store.movie.topRatedTv);

  //console.log(popular);
  //console.log(nowPlaying);
  //console.log(topRated);
  //console.log(upcoming);
  //console.log(trending);

  return (
    <div className=" w-full ">
      <div className="relative mt-[370px]  md:-mt-[200px] ">
        <MovieList movList={trending} title="Trending Movies and TV Shows" />
        <PureMovieList movList={nowPlaying} title="Now Playing Movies" />
        <PureTvList movList={nowPlayingTv} title="Now Playing Tv Shows" />
        <PureMovieList movList={topRated} title="Top Rated Movies" />
        <PureTvList movList={topTv} title="Top Rated Tv Shows" />
        <PureMovieList movList={upcoming} title="Upcoming Movies" />
        <PureMovieList movList={popular} title="Popular Movies" />
        <PureTvList movList={popularTv} title="Popular Tv Shows" />
      </div>
    </div>
  );
};

export default SecondaryContainer;
