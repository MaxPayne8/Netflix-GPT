import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MovieList from "./MovieList";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { Link } from "react-router-dom";
import { API_TMDB_OPTIONS, NetflixLogo } from "../utils/constants";
import { addMovie } from "../utils/moviesSlice";
import MovieCard from "./MovieCard";
import MovieCard1 from "./MovieCard1";

const Browse = () => {
  function disableBackButton() {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }
  useEffect(() => {
    disableBackButton();
  });

  const dispatch = useDispatch();
  useNowPlayingMovies();
  const user = useSelector((store) => store.user);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const [showSecCont, setShowSecCont] = useState(true);

  const searchTxt = useRef(null);

  const tmdbResults = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/multi?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_TMDB_OPTIONS
    );
    const json = await data.json();
    const json1 = json.results;
    console.log(json1);

    dispatch(addMovie(json1));
  };

  const data = useSelector((store) => store.movie.movies);
  console.log(data);

  const handleSubmit = (e) => {
    tmdbResults(searchTxt.current.value);
    e.preventDefault();
    setShowSecCont(false);
    searchTxt.current.value = "";
  };

  const handleClick = () => {
    setShowSecCont(true);
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className="bg-black w-full  ">
      <div
        onClick={() => setShowSecCont(true)}
        className="absolute bg-gradient-to-b from-black z-20 top-0 hover:cursor-pointer "
      >
        <img className="w-32 lg:w-56" src={NetflixLogo} alt="netflix-logo" />
      </div>
      {!showSecCont && (
        <button
          className="relative ml-36 md:ml-80 z-20 mt-4  bg-violet-600 hover:bg-red-600 text-white p-2 rounded-lg "
          onClick={() => {
            handleClick();
          }}
        >
          Back to Browse
        </button>
      )}
      <img
        className="w-16 h-16 p-2  ml-[1300px] z-10 absolute top-1 right-0  hover:cursor-pointer"
        src={user?.photoURL}
        alt="user-logo"
      />
      <div className="flex">
        <h1 className=" p-2 top-48 md:top-3 md:right-[325px] z-10  bg-gradient-to-b from-black  absolute font-semibold text-white ">
          <span className="text-red-800 font-bold text-xl bg:gradient-black from r">
            {user?.displayName?.split(" ")[0]}
          </span>
          , try our all new Movies and TvShows suggestion AI!!
        </h1>
        <Link to="/browse/gptsearch">
          <button className="bg-violet-700 z-10 font-semibold hover:bg-violet-600 hover:border-2 text-white absolute md:right-[100px] top-[255px] right-0 md:ml-0 md:top-4 rounded-lg p-2">
            Go to Gpt-Search
          </button>
        </Link>
      </div>
      <button
        className="absolute right-0 top-[65px] z-10 text-white font-semibold px-1 bg-red-700 rounded-lg hover:bg-red-500"
        onClick={handleSignout}
      >
        Sign Out
      </button>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" rounded-lg p-2 absolute z-20   md:right-20 top-[500px] sm:top-[550px]  md:top-56"
      >
        <input
          ref={searchTxt}
          placeholder="Search Database.."
          className="border-2 p-2 mx-2 rounded-lg border-black w-56"
        ></input>
        {/* <Link to="/browse/results"> */}
        <button className="bg-black hover:bg-red-600 text-white p-2 rounded-lg ">
          Search
        </button>
        {/* </Link> */}
      </form>
      <MainContainer />
      {showSecCont ? (
        <SecondaryContainer />
      ) : (
        <div className=" w-full flex flex-wrap justify-evenly relative mt-[370px]  md:-mt-[200px]  ">
          {data?.length ? (
            data?.map((movie) => (
              <MovieCard1
                posterId={movie.poster_path}
                id={movie.id}
                media={movie.media_type}
              />
            ))
          ) : (
            <div>
              <h1 className="bg-red-700 w-80 bottom-2 p-3 rounded-lg text-center text-white  ">
                No Results😭
              </h1>
            </div>
          )}
        </div>
      )}
      (
      <div className="bg-red-800 z-20 relative text-white p-2">
        {
          <button
            className="bg-violet-700 mt-1 text-center p-2 items-center mx-auto z-10 font-semibold hover:bg-violet-600 block text-white  rounded-lg "
            onClick={() => {
              handleClick();
            }}
          >
            Back to Browse
          </button>
        }
        <p className="text-center">
          ⬇Coudnt find anything interesting 😥Get recommendations according to
          your taste using our AI recommendation system powered by Chat-Gpt 3.5
          turbo🚀⬇
          <Link to="/browse/gptsearch">
            <button className="bg-violet-700 mt-1 text-center p-2 items-center mx-auto z-10 font-semibold hover:bg-violet-600 block text-white  rounded-lg w-56 ">
              Goto Gpt-Search
            </button>
          </Link>
        </p>
      </div>
      )
    </div>
  );
};

export default Browse;
