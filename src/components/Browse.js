import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appStore from "../utils/appStore";

const Browse = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      <img
        className="w-16 h-16 p-2  ml-[1300px] z-10 absolute top-1 right-3  hover:cursor-pointer"
        src={user?.photoURL}
        alt="user-logo"
      />
      <h1 className=" p-2 top-7 right-[75px] z-10 absolute font-semibold ">
        {user?.displayName}, try our all new Movies suggestion AI!!
      </h1>
      <button
        className="absolute ml-[1285px]  top-[65px]  text-white font-semibold px-1 bg-red-700 rounded-lg"
        onClick={handleSignout}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Browse;
