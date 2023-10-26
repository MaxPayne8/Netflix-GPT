import React from "react";
import { Link } from "react-router-dom";
import langConst from "../utils/langConst";
import { supportedLang } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../utils/langSlice";

const GptSearchPage = () => {
  const dispatch = useDispatch();
  const getCurrentLang = (e) => {
    dispatch(changeLang(e.target.value));
  };
  const currLang = useSelector((store) => store.language.lang);
  console.log(currLang);
  return (
    <div className="w-screen">
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
        ></input>
        <button className="bg-red-700 rounded-lg font-semibold hover:bg-red-600 w-24 p-2 ml-4">
          {langConst[currLang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchPage;
