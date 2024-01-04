import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import langConst from "../utils/langConst";
import {
  API_TMDB_OPTIONS,
  NetflixLogo,
  supportedLang,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../utils/langSlice";
import openai from "../utils/openai";
import { addGptMovies } from "../utils/gptSlice";
import GptMovieSuggestions from "./GptMovieSuggestions";

import Aos from "aos";
import "aos/dist/aos.css";
import Typewriter from "typewriter-effect";

const GptSearchPage = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  const [shimmer, setShimmer] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showMovies, setShowMovies] = useState(false);
  const dispatch = useDispatch();
  const getCurrentLang = (e) => {
    dispatch(changeLang(e.target.value));
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const currLang = useSelector((store) => store.language.lang);
  //console.log(currLang);

  const searchTxt = useRef(null);

  const tmdbResults = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/multi?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_TMDB_OPTIONS
    );
    const json = await data.json();
    //console.log(json);

    return json.results;
  };

  const handleClick = async () => {
    setShimmer(true);
    setShowInfo(false);
    setShowMovies(false);

    const finalSearchQuery =
      "Act as a Movie and tvshow Recommendation system and give 10 movies or tv shows for the query : " +
      searchTxt.current.value +
      "and give me only the names and nothing else of movies or tv shows that should be comma seperated like the example result given ahead. Example Result: Pulp Fiction , The Godfather , Forrest Gump, GoodFellas, The Matrix etc";
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: finalSearchQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!chatCompletion.choices) {
      return null;
    }

    const gptResults = chatCompletion.choices;
    //console.log(finalSearchQuery);
    //console.log(gptResults);
    const finalMov = gptResults?.[0]?.message?.content;
    const finalMovArray = finalMov.split(",");
    //console.log(finalMov);
    //console.log(finalMovArray);
    const promiseArray = finalMovArray?.map((mov) => tmdbResults(mov));
    const tmdbMovies = await Promise.all(promiseArray);
    // const mainTmdbMovies = tmdbMovies.map((list) => list[0]);
    const mainTmdbMovies = tmdbMovies;

    if (!tmdbMovies.length) setShimmer(true);
    if (tmdbMovies.length) setShowInfo(true);
    if (tmdbMovies.length) setShowMovies(true);

    //console.log(tmdbMovies);
    //console.log(mainTmdbMovies);
    dispatch(
      addGptMovies({
        gptMovies: finalMovArray,
        tmdbMovies: mainTmdbMovies,
      })
    );
  };

  const gptMov = useSelector((store) => store.gptMovies.gMovies);
  const tmdbMov = useSelector((store) => store.gptMovies.tmdbMov);
  //console.log(gptMov);
  //console.log(tmdbMov);
  return (
    <div className="bg-black" data-aos="zoom-in" data-aos-delay="100">
      <div className="relative">
        <Link to="/browse">
          <div className="absolute left-0 bg-gradient-to-b from-black z-20 top-0 ">
            <img
              className="w-32 lg:w-56"
              src={NetflixLogo}
              alt="netflix-logo"
            />
          </div>
        </Link>
        <img
          className="h-[1000px] w-screen lg:h-0  lg:w-0 "
          src="https://cdn.wallpapersafari.com/38/56/l4yXvN.jpg"
          alt="gpt-background"
        ></img>
        <img
          className="h-0  lg:w-screen lg:h-[1050px]"
          src="https://xmple.com/wallpaper/black-sunburst-burst-shadow-red-rays-3840x2160-c2-000000-ff0000-k2-50-50-l3-26-0-18-a2-6-225-f-23.svg"
          alt="gpt-background"
        ></img>

        <Link to="/browse">
          <button className="bg-violet-700 absolute  right-1 z-20 font-semibold hover:bg-violet-800 hover:border-2 text-white  md:left-[1050px] md:w-56 w-56 top-[82px] rounded-lg p-2">
            {langConst[currLang].button}
          </button>
        </Link>
        <select
          className="absolute z-20 top-[85px] md:top-4 p-2  bg-violet-700 rounded-lg  hover:bg-violet-800 hover:cursor-pointer hover:border-2 text-white left-6 md:left-[1100px]"
          onChange={getCurrentLang}
        >
          {supportedLang.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>
              {lang.name}
            </option>
          ))}
        </select>

        <div className="absolute z-20  top-52 md:top-36 text-white text-sm md:text-base border-2 border-white bg-violet-800 p-4 rounded-2xl mx-auto ml-0 mr-0">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,

              delay: 50,
              deleteSpeed: 5,
              strings: [
                langConst["english"].aboutGpt,
                langConst["hindi"].aboutGpt,
                langConst["kannada"].aboutGpt,
                langConst["french"].aboutGpt,
                langConst["spanish"].aboutGpt,
              ],
            }}
          />
        </div>

        <form
          className="absolute z-20    md:w-[600px] h-[80px] text-center top-[400px] md:top-60 mx-auto left-0 right-0 rounded-lg bg-gray-950"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className=" w-[355px] md:w-[400px] p-2 h-9 mt-6 text-sm md:text-base rounded-lg font-semibold animate-pulse"
            placeholder={langConst[currLang].gptPlaceholder}
            ref={searchTxt}
          ></input>
          <button
            className="bg-red-700 rounded-lg font-semibold hover:bg-red-600 w-24 p-2 mt-6 md:ml-4"
            onClick={handleClick}
          >
            {langConst[currLang].search}
          </button>
        </form>

        {shimmer && (
          <div className="   absolute top-[550px]  md:top-[340px] left-0 my-auto right-0 mx-auto p-2 text-sm md:text-2xl rounded-lg bg-blue-900 text-white   ">
            <h1 className="text-center animate-bounce">
              🚀🚀🚀 PLEASE WAIT...🚀🚀🚀
            </h1>
          </div>
        )}

        {showInfo && (
          <div className="absolute top-[550px] md:top-[340px] left-0 right-0 mx-auto p-2 text-sm md:text-2xl bg-red-700 text-white rounded-lg ">
            <h1 className="text-center ">
              Here are some recommended results according to your query...
            </h1>
          </div>
        )}

        {setShowMovies && <GptMovieSuggestions />}
      </div>
    </div>
  );
};

export default GptSearchPage;
