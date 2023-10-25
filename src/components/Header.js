import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { NetflixLogo } from "../utils/constants";

const Header = () => {
  const [stay, setStay] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setStay(true);
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );

        // ...
      } else {
        // User is signed out
        // ...
        setStay(false);
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  return stay ? (
    <Link to="/browse">
      <div className="absolute  bg-gradient-to-b from-black w-screen z-10 top-0">
        <img className="w-56" src={NetflixLogo} alt="netflix-logo" />
      </div>
    </Link>
  ) : (
    <Link to="/">
      <div className="absolute  bg-gradient-to-b from-black w-screen z-10 top-0">
        <img className="w-56" src={NetflixLogo} alt="netflix-logo" />
      </div>
    </Link>
  );
};

export default Header;
