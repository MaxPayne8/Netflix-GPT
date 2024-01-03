import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_TMDB_OPTIONS, ImgCDN } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addActorDetails,
  addActorMovies,
  addActorTv,
} from "../utils/moviesSlice";
import { useNavigate } from "react-router-dom";

import PureTvList from "./PureTvList";
import PureMovieList from "./PureMovieList";
import Spinner from "./Spinner";
import Aos from "aos";
import "aos/dist/aos.css";

const ActorDetails = () => {
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    Aos.init();
  }, []);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { actorId } = useParams();
  console.log(actorId);
  const getActor = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/person/" + actorId + "?language=en-US",
      API_TMDB_OPTIONS
    );
    const json = await data?.json();
    console.log(json);

    dispatch(addActorDetails(json));
  };
  const getActorMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/person/" +
        actorId +
        "/movie_credits?language=en-US",
      API_TMDB_OPTIONS
    );
    const json = await data?.json();
    console.log(json);

    dispatch(addActorMovies(json.cast));
  };
  const getActorTv = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/person/" +
        actorId +
        "/tv_credits?language=en-US",
      API_TMDB_OPTIONS
    );
    const json = await data?.json();
    console.log(json);

    dispatch(addActorTv(json.cast));
  };

  const details = useSelector((store) => store.movie?.actorDetails);
  const actorMov = useSelector((store) => store.movie?.actorMovies);
  const actorTv = useSelector((store) => store.movie?.actorTv);
  console.log(details);
  console.log(actorMov);
  console.log(actorTv);
  useEffect(() => {
    getActor();
    getActorMovies();
    getActorTv();
    setTimeout(() => {
      setSpinner(false);
    }, 300);
  }, []);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!details) return;
  if (!actorMov) return;
  if (!actorTv) return;

  const {
    also_known_as,
    biography,
    birthday,
    deathday,
    homepage,
    imdb_id,
    known_for_department,
    name,
    place_of_birth,
    popularity,
    profile_path,
  } = details;

  return (
    <div className="bg-black " data-aos="zoom-in">
      {spinner ? (
        <Spinner />
      ) : (
        <div className="z-10   w-full bg-black  p-6 ">
          <div>
            <ul className="text-gray-300 ">
              <li className="p-2 bg-violet-700 rounded-lg w-20 mx-auto font-semibold hover:bg-violet-500">
                <button onClick={() => navigate(-1)}>Go back</button>
              </li>
              <Link to="/browse">
                <li className="p-2 bg-violet-700 rounded-lg w-40 mt-2 text-center mx-auto font-semibold hover:bg-violet-500 ">
                  <button>Back to Browse</button>
                </li>
              </Link>

              <li className="p-2 text-red-600 text-center text-5xl">{name}</li>
              <li className="p-2 flex justify-center ">
                <img
                  className="border-4 border-white"
                  src={ImgCDN + profile_path}
                  alt="profile-img"
                />
              </li>
              {!also_known_as.length ? null : (
                <li className="p-2">
                  <span className="text-red-600">Also known as:</span>{" "}
                  {also_known_as?.map((mov) => mov).join(" , ")}
                </li>
              )}
              <li className="p-2 ">
                <span className="text-red-600">BirthDay: </span>
                {birthday}
              </li>
              <li className="p-2 ">
                <span className="text-red-600">Place of Birth: </span>
                {place_of_birth}
              </li>
              <li className="p-2 ">
                <span className="text-red-600">Biography: </span>
                {biography}
              </li>
              <li className="p-2 ">
                <span className="text-red-600">Known for: </span>
                {known_for_department}
              </li>
              {deathday && (
                <li className="p-2 ">
                  <span className="text-red-600">Death Anniversary: </span>
                  {deathday}
                </li>
              )}
              <li className="p-2 ">
                <span className="text-red-600">IMDB-ID: </span>
                {imdb_id}
              </li>
              {homepage && (
                <li className="p-2 ">
                  <span className="text-red-600">Homepage: </span>
                  {homepage}
                </li>
              )}

              <li className="p-2 ">
                <span className="text-red-600">Popularity: </span>
                {popularity}
              </li>
            </ul>

            {actorMov?.length ? (
              <PureMovieList movList={actorMov} title="Movies" />
            ) : null}
            {actorTv?.length ? (
              <PureTvList movList={actorTv} title="Tv Shows" />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActorDetails;
