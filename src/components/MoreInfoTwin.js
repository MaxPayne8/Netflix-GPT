import React, { useEffect } from "react";
import { API_TMDB_OPTIONS, ImgCDN, NetflixLogo } from "../utils/constants";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMoreInfo, addSimilarMovies } from "../utils/moviesSlice";

import MovieCard from "./MovieCard";
import useGetTrailer from "../hooks/useGetTrailer";

const MoreInfoTwin = () => {
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

  const trailerInfo = useSelector((store) => store.movie?.trailerVideo);
  const info = useSelector((store) => store.movie?.moreInfo);
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
    <div className="z-10 absolute  w-full  bg-gradient-to-r from-blue-800  p-6 font-semibold">
      <Link to="/browse">
        <div className="absolute left-0 bg-gradient-to-b from-black z-20 top-0 ">
          <img className="w-56" src={NetflixLogo} alt="netflix-logo" />
        </div>
      </Link>

      <Link to="/browse">
        <button className="bg-violet-700 absolute  md:mr-0 md:right-12 z-20  font-semibold hover:bg-violet-600 hover:border-2 mt-16 md:mt-0 hover:border-black text-white  md:left-[1050px]  rounded-lg p-2">
          Goto Netflix-Browse-Page
        </button>
      </Link>
      <Link to="/browse/gptsearch">
        <button className="bg-violet-700 z-30 font-semibold hover:bg-violet-600 hover:border-2 hover:border-black text-white relative  md:left-[750px] mt-28 md:mt-0 rounded-lg p-2">
          Goto Gpt-Movies-Search
        </button>
      </Link>
      <div>
        <ul>
          <div className=" md:flex justify-between">
            <li className="md:ml-[70px] p-1  mt-8 md:mt-10">Official Poster</li>
            <li className="  md:mr-[350px] p-1 mt-96 md:mt-10">
              Official Trailer
            </li>
          </div>

          <div className=" md:flex">
            <li>
              <img
                className="p-2 top-60  md:top-0 absolute md:relative ml-0 md:ml-2 border-4 border-red-700"
                src={ImgCDN + poster_path}
                alt="movie-poster"
              />
            </li>

            <li>
              <iframe
                className="ml-0 mt-2 md:mt-0 md:ml-[350px] w-[100%] md:w-[600px] border-4 border-red-700  aspect-video "
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
            <Link to={"/browse/moreinfo/" + mov.id}>
              {/* <a href={"/browse/" + mov.id}> */}
              <MovieCard
                posterId={mov.poster_path}
                title={mov.title}
                key={mov.id}
              />
            </Link>
            // </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreInfoTwin;
