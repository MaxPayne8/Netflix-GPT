import React, { useEffect, useLayoutEffect } from "react";
import { API_TMDB_OPTIONS, ImgCDN, NetflixLogo } from "../utils/constants";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addActors,
  addMoreInfo,
  addReview,
  addSimilarMovies,
} from "../utils/moviesSlice";

import MovieCard from "./MovieCard";
import useGetTrailer from "../hooks/useTvTrailer";

const MoreInfoTv = () => {
  const dispatch = useDispatch();
  const { movId } = useParams();
  console.log(movId);
  useGetTrailer(movId);

  const getActors = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/" + movId + "/credits?language=en-US",
      API_TMDB_OPTIONS
    );
    const json = await data?.json();
    console.log(json);

    dispatch(addActors(json?.cast));
  };

  const getRev = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/" +
        movId +
        "/reviews?language=en-US&page=1",
      API_TMDB_OPTIONS
    );
    const json = await data.json();
    console.log(json);
    const result = await json?.results;
    dispatch(addReview(result));
  };

  const getMovieInfo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/" + movId + "?language=en-US",
      API_TMDB_OPTIONS
    );

    const json = await data.json();
    dispatch(addMoreInfo(json));

    console.log(json);
  };

  const getSimilarMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/" +
        movId +
        "/similar?language=en-US&page=1",
      API_TMDB_OPTIONS
    );

    const json = await data.json();
    const similarMov = json.results;
    dispatch(addSimilarMovies(similarMov));
  };
  useEffect(() => {
    getMovieInfo();
    getSimilarMovies();
    getRev();
    getActors();
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const trailerInfo = useSelector((store) => store.movie?.trailerVideo);
  const info = useSelector((store) => store.movie?.moreInfo);
  const infoSimilarMovies = useSelector((store) => store.movie?.similarMovies);
  const review = useSelector((store) => store.movie?.review);
  const actors = useSelector((store) => store.movie?.actors);
  console.log(review);
  console.log(info);
  console.log(infoSimilarMovies);
  console.log(trailerInfo);
  console.log(actors);

  const actorsName = actors?.map((actor) => actor?.name).join(",");

  const actorImages = actors?.map((actor) => actor?.profile_path);
  console.log(actorsName);
  console.log(actorImages);
  if (!info) return;
  // if (!review) return null;

  const {
    poster_path,
    number_of_episodes,
    number_of_seasons,
    genres,
    homepage,
    name,
    overview,
    networks,
    production_countries,
    first_air_date,
    episode_run_time,

    runtime,
    spoken_languages,
    tagline,
    vote_average,
  } = info;

  //
  return (
    <div className="z-10   w-full bg-black  p-6 ">
      <Link to="/browse">
        <div className="absolute left-0 bg-gradient-to-b from-black z-20 top-0 ">
          <img className="w-32 lg:w-56" src={NetflixLogo} alt="netflix-logo" />
        </div>
      </Link>
      <Link to="/browse">
        <button className="bg-violet-700 absolute  md:w-56 md:right-12 z-20  font-semibold hover:bg-violet-600 hover:border-2 mt-16 md:mt-0 hover:border-black text-white  md:left-[1050px]  rounded-lg p-2">
          Goto Netflix-Browse-Page
        </button>
      </Link>
      <Link to="/browse/gptsearch">
        <button className="bg-violet-700 z-30 font-semibold hover:bg-violet-600 hover:border-2 hover:border-black text-white relative  md:left-[750px] mt-28 md:mt-0 rounded-lg p-2">
          Go to Gpt-Search
        </button>
      </Link>
      <div>
        <ul className="text-gray-300">
          <div className=" md:flex justify-between">
            <li className="md:ml-[70px] p-1 text-red-600  mt-8 md:mt-10">
              Official Poster
            </li>
            <li className="   md:mr-[350px] text-red-600 p-1 mt-96 md:mt-10">
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
                className=" mt-2   md:mt-0 md:ml-[350px] w-[100%] md:w-[600px] border-4 border-red-700  aspect-video "
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
          <li className="p-2 ">
            <span className="text-red-600">Title: </span>
            {name}
          </li>
          <li className="p-2 ">
            <span className="text-red-600">Overview:</span> {overview}
          </li>
          <li className="p-2 ">
            <span className="text-red-600">Cast: </span>
            {actorsName}
          </li>
          <li className="p-2 ">
            <span className="text-red-600">Total Seasons:</span>{" "}
            {number_of_seasons}
          </li>
          <li className="p-2 ">
            <span className="text-red-600">Total Episodes:</span>{" "}
            {number_of_episodes}
          </li>

          <li className="p-2">
            <span className="text-red-600">Episode Runtime:</span>{" "}
            {episode_run_time?.map((e) => e)} minutes
          </li>

          <li className="p-2">
            <span className="text-red-600">Geners:</span>{" "}
            {genres?.map((mov) => mov.name).join(",")}
          </li>
          {homepage && (
            <li className="p-2">
              <span className="text-red-600">Tv Show Site:</span>{" "}
              <a href={homepage}>{homepage}</a>
            </li>
          )}
          <li className="p-2">
            <span className="text-red-600">Production Companies: </span>
            {networks?.map((e) => e.name).join(",")}
          </li>
          {production_countries && (
            <li className="p-2">
              <span className="text-red-600">Production Countries: </span>
              {production_countries?.map((e) => e.name).join(",")}
            </li>
          )}
          <li className="p-2">
            <span className="text-red-600">Release Date: </span>
            {first_air_date}
          </li>
          <li className="p-2">
            <span className="text-red-600">Spoken Languages: </span>
            {spoken_languages?.map((e) => e.english_name).join(",")}
          </li>
          {tagline && (
            <li className="p-2">
              <span className="text-red-600">Tagline: </span>
              {tagline}
            </li>
          )}
          <li className="p-2">
            <span className="text-red-600">Rating:</span> {vote_average}⭐ out
            of 10
          </li>
          {review?.length
            ? review?.map((review) => (
                <div>
                  <li className="p-2">
                    {" "}
                    {review?.author ? (
                      <h1 className="text-white">
                        <span className="text-red-600">Review-Author: </span>{" "}
                        {review?.author}
                      </h1>
                    ) : null}
                  </li>
                  <li className="p-2">
                    {" "}
                    {review?.content ? (
                      <h1 className="text-white">
                        <span className="text-red-600">Review: </span>
                        {review?.content}
                      </h1>
                    ) : null}
                  </li>
                </div>
              ))
            : null}
        </ul>
      </div>

      <h1 className="text-red-600 ml-3 mt-4 text-2xl">Cast</h1>
      <div className="flex  overflow-x-scroll no-scrollbar ">
        {actors?.map(
          (actor) =>
            actor.profile_path &&
            actor.character.length && (
              <div className="m-2    ">
                <MovieCard posterId={actor?.profile_path} />
                {/* <img
                  className="w-32"
                  src={ImgCDN + actor.profile_path}
                  alt="actor-profile"
                /> */}
                <h1 className="text-white  text-center">{actor.name}</h1>

                <h1 className="text-white text-center">As</h1>
                <h1 className="text-red-700 text-center">
                  "{actor.character}"
                </h1>
              </div>
            )
        )}
      </div>

      {/* <MovieList movList={infoSimilarMovies} title="Similar Movies" /> */}
      <div className=" ">
        <h1 className="text-red-600 ml-3 mt-4 text-2xl">Similar Tv Shows</h1>
        <div className="flex  overflow-x-scroll no-scrollbar ">
          {infoSimilarMovies?.map((mov) => (
            <Link to={"/browse/moreinfotvtwin/" + mov.id}>
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
      <div className="bg-red-800 text-white p-2 rounded-lg">
        <p className="text-center">
          ⬇Coudnt find anything interesting 😥Get recommendations according to
          your taste using our movie recommendation system powered by Chat-Gpt
          3.5 turbo🚀⬇
          <Link to="/browse/gptsearch">
            <button className="bg-violet-700 mt-1 text-center px-2 items-center mx-auto z-10 font-semibold hover:bg-violet-600 hover:border-2 block text-white  rounded-lg ">
              Goto Gpt-Movies-Search
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MoreInfoTv;
