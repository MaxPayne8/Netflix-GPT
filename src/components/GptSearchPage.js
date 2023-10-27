import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import langConst from "../utils/langConst";
import { API_TMDB_OPTIONS, supportedLang } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../utils/langSlice";
import openai from "../utils/openai";
import { addGptMovies } from "../utils/gptSlice";
import GptMovieSuggestions from "./GptMovieSuggestions";

const GptSearchPage = () => {
  const [shimmer, setShimmer] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showMovies, setShowMovies] = useState(false);
  const dispatch = useDispatch();
  const getCurrentLang = (e) => {
    dispatch(changeLang(e.target.value));
  };
  const currLang = useSelector((store) => store.language.lang);
  console.log(currLang);

  const searchTxt = useRef(null);

  const tmdbResults = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_TMDB_OPTIONS
    );
    const json = await data.json();
    console.log(json);
    const corectMov = json.results.filter((mov) => mov[0]);
    console.log(corectMov);
    return json.results;
  };

  const handleClick = async () => {
    setShimmer(true);
    setShowInfo(false);
    setShowMovies(false);

    const finalSearchQuery =
      searchTxt.current.value +
      " only give me names of 20 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: finalSearchQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!chatCompletion.choices) {
      return null;
    }

    const gptResults = chatCompletion.choices;
    console.log(finalSearchQuery);
    console.log(gptResults);
    const finalMov = gptResults?.[0]?.message?.content;
    const finalMovArray = finalMov.split(",");
    console.log(finalMovArray);
    const promiseArray = finalMovArray.map((mov) => tmdbResults(mov));
    const tmdbMovies = await Promise.all(promiseArray);
    if (tmdbMovies.length === 20) setShimmer(true);
    if (tmdbMovies.length === 20) setShowInfo(true);
    if (tmdbMovies.length === 20) setShowMovies(true);
    const mainTmdbMovies = tmdbMovies.map((list) => list[0]);

    console.log(tmdbMovies);
    console.log(mainTmdbMovies);
    dispatch(
      addGptMovies({
        gptMovies: finalMovArray,
        tmdbMovies: mainTmdbMovies,
      })
    );
  };

  const gptMov = useSelector((store) => store.gptMovies.gMovies);
  const tmdbMov = useSelector((store) => store.gptMovies.tmdbMov);
  console.log(gptMov);
  console.log(tmdbMov);
  return (
    <div className="w-[100%]">
      <img
        className=""
        src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="movies-collage"
      ></img>
      <Link to="/browse">
        <button className="bg-violet-700 absolute right-4 z-20 font-semibold hover:bg-violet-800 hover:border-2 text-white  left-[1050px] top-4 rounded-lg p-2">
          {langConst[currLang].button}
        </button>
      </Link>
      <select
        className="absolute z-20 top-4 p-2 bg-violet-700 rounded-lg  hover:bg-violet-800 hover:cursor-pointer hover:border-2 text-white  left-[900px]"
        onChange={getCurrentLang}
      >
        {supportedLang.map((lang) => (
          <option key={lang.identifier} value={lang.identifier}>
            {lang.name}
          </option>
        ))}
      </select>

      <div className="absolute z-20 top-36 text-white border-2 border-white bg-violet-800 p-4 rounded-2xl mx-auto ml-0 mr-0">
        <p>{langConst[currLang].aboutGpt}</p>
      </div>

      <form
        className="absolute z-20  w-[600px] h-[80px] text-center top-60  ml-[400px] rounded-lg bg-gray-950"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="w-[400px] p-2 h-9 mt-6 rounded-lg font-semibold"
          placeholder={langConst[currLang].gptPlaceholder}
          ref={searchTxt}
        ></input>
        <button
          className="bg-red-700 rounded-lg font-semibold hover:bg-red-600 w-24 p-2 ml-4"
          onClick={handleClick}
        >
          {langConst[currLang].search}
        </button>
      </form>
      <div className="  absolute top-[340px] left-[410px] p-2 text-2xl rounded-lg bg-blue-800  text-white">
        {shimmer ? (
          <div>
            <h1>🚀🚀🚀 FINDING BEST MOVIES FOR YOU...🚀🚀🚀</h1>
          </div>
        ) : null}
      </div>
      <div className="absolute top-[340px] left-[370px] p-2 text-2xl bg-red-800 rounded-lg text-white">
        {showInfo ? (
          <div>
            <h1>Here are some recommended movies according to your query...</h1>
          </div>
        ) : null}
      </div>
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearchPage;
