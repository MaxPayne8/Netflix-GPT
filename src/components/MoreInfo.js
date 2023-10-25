import React, { useEffect } from "react";
import { API_TMDB_OPTIONS, ImgCDN } from "../utils/constants";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMoreInfo, addSimilarMovies } from "../utils/moviesSlice";
import MovieList from "./MovieList";
import MovieCard from "./MovieCard";
import useGetTrailer from "../hooks/useGetTrailer";

const MoreInfo = () => {
  const dispatch = useDispatch();
  const { movId } = useParams();
  console.log(movId);
  useGetTrailer(movId);

  const getMovieInfo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movId + "?language=en-US",
      API_TMDB_OPTIONS
    );

    const json = await data.json();
    dispatch(addMoreInfo(json));

    console.log(json);
  };
  useEffect(() => {
    getMovieInfo();
  }, []);

  const getSimilarMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movId +
        "/similar?language=en-US&page=1",
      API_TMDB_OPTIONS
    );

    const json = await data.json();
    const similarMov = json.results;
    dispatch(addSimilarMovies(similarMov));
  };
  useEffect(() => {
    getSimilarMovies();
  }, []);

  const trailerInfo = useSelector((store) => store.movie.trailerVideo);
  const info = useSelector((store) => store.movie.moreInfo);
  const infoSimilarMovies = useSelector((store) => store.movie.similarMovies);
  console.log(info);
  console.log(infoSimilarMovies);
  console.log(trailerInfo);
  if (!info) return;
  const {
    poster_path,
    budget,
    genres,
    homepage,
    original_title,
    overview,
    production_companies,
    production_countries,
    release_date,
    revenue,
    runtime,
    spoken_languages,
    tagline,
    vote_average,
  } = info;
  return (
    <div className="z-10 absolute top-[90px] w-screen  bg-gradient-to-t from-blue-800  p-6 font-semibold">
      <div>
        <ul>
          <div className="flex justify-between">
            <li className="ml-16 p-1">Official Poster</li>
            <li className="mr-96 p-1">Official Trailer</li>
          </div>

          <div className="flex">
            <li>
              <img
                className="p-2 border-4 border-red-700"
                src={ImgCDN + poster_path}
                alt="movie-poster"
              />
            </li>

            <li>
              <iframe
                className="ml-[350px] w-[600px] border-4 border-red-700  aspect-video "
                src={
                  "https://www.youtube.com/embed/" +
                  trailerInfo?.key +
                  "?autoplay=1&mute=1"
                }
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </li>
          </div>

          <li className="p-2">Title: {original_title}</li>
          <li className="p-2">Overview: {overview}</li>
          <li className="p-2">
            Geners: {genres?.map((mov) => mov.name).join(",")}
          </li>
          <li className="p-2">Budget: {budget / 1000000} Million Dollars</li>

          <li className="p-2">
            MovieSite: <a href={homepage}>{homepage}</a>
          </li>

          <li className="p-2">
            Production Companies:{" "}
            {production_companies?.map((e) => e.name).join(",")}
          </li>
          <li className="p-2">
            Production Countries:{" "}
            {production_countries?.map((e) => e.name).join(",")}
          </li>
          <li className="p-2">Release Date: {release_date}</li>
          <li className="p-2">Revenue: {revenue / 1000000} Million Dollars</li>
          <li className="p-2">Runtime: {runtime} minutes</li>
          <li className="p-2">
            Spoken Languages:{" "}
            {spoken_languages?.map((e) => e.english_name).join(",")}
          </li>
          <li className="p-2">Tagline: {tagline}</li>
          <li className="p-2">Rating: {vote_average}⭐ out of 10</li>
        </ul>
      </div>

      {/* <MovieList movList={infoSimilarMovies} title="Similar Movies" /> */}
      <div className=" ">
        <h1 className="text-white ml-3 text-xl">Similar Movies</h1>
        <div className="flex  overflow-x-scroll no-scrollbar ">
          {infoSimilarMovies?.map((mov) => (
            // <Link to={"/browse/" + mov.id}> </Link>
            <a href={"/browse/" + mov.id}>
              <MovieCard
                posterId={mov.poster_path}
                title={mov.title}
                key={mov.id}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
