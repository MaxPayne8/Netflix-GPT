import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const handle = () => {
    setNewUser(!newUser);
  };
  return (
    <div>
      <Header />

      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="movies-collage"
      ></img>
      <form
        className="absolute bottom-24 right-0 left-0 m-auto w-1/4  bg bg-black  opacity-80 rounded-lg p-4 hover:cursor-pointer"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className=" text-white m-2 p-2 text-2xl">
          {newUser ? "Sign Up" : "Sign In"}
        </h1>
        <div className="flex flex-col m-2">
          {newUser ? (
            <input
              className=" rounded-lg m-2 mb-4 p-2 bg-gray-800"
              placeholder="Full Name"
            ></input>
          ) : null}
          <input
            className=" rounded-lg m-2 mb-4 p-2 bg-gray-800"
            placeholder="Email Address"
          ></input>
          <input
            className="rounded-lg m-2 p-2 bg-gray-800"
            placeholder="Password"
          ></input>
          <button className="mt-8 text-white bg-red-800 rounded-lg p-2 text-lg w-[270px] ml-3  hover:bg-red-600">
            {newUser ? "Sign Up" : "Sign In"}
          </button>
        </div>
        <h1
          className="text-center text-white mt-10 hover:cursor-pointer hover:text-red-600 hover:font-semibold"
          onClick={handle}
        >
          {!newUser
            ? "New User ? Sign Up Now !"
            : "Already Registerd? Sign In Now!"}
        </h1>
      </form>
    </div>
  );
};

export default Login;
