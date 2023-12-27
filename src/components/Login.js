import React, { useRef, useState } from "react";
import formValidate from "../utils/formValidate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { NetflixLogo, UserLogo } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [signedUp, setSignedUp] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const showToastMessage = () => {
    toast.success("Please try again with right credentials and format !", {
      position: toast.POSITION.TOP_RIGHT,
      style: { fontSize: "14px", zIndex: "5000" },
    });
  };

  const toggleSignInform = () => {
    setNewUser(!newUser);
    setErrorMsg(null);
  };
  const handleLogIn = () => {
    const message = formValidate(
      email?.current?.value,
      password?.current?.value,
      name?.current?.value
    );
    setErrorMsg(message);
    if (message) setSignedUp(false);
    if (message) return;

    if (newUser) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          setSignedUp(true);
          const user = userCredential.user;

          console.log(user);

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: UserLogo,
          })
            .then(() => {
              //Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...

              setErrorMsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;

          if (errorCode === "auth/email-already-in-use") {
            setErrorMsg("Account already registered with this email!!");
          }
          setSignedUp(false);
          showToastMessage();
          // setErrorMsg(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          showToastMessage();

          const errorCode = error.code;
          console.log(errorCode);

          if (errorCode === "auth/invalid-login-credentials")
            setErrorMsg(
              "Please Sign up First!! or Kindly check your Email and Password."
            );
        });
    }
  };

  return (
    <div className="w-full ">
      <ToastContainer />

      <div className="absolute left-0 bg-gradient-to-b from-black z-20 top-0 ">
        <img className="w-32 lg:w-56" src={NetflixLogo} alt="netflix-logo" />
      </div>
      <img
        className="h-screen w-full md:hidden "
        src="https://gumlet.assettype.com/bloombergquint/2023-02/8bb7387f-335f-4338-88de-1be92538cecf/Netflix_Series.jpg"
        alt="movies-collage"
      ></img>

      <img
        className="h-0 w-0 md:w-full md:h-screen"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="movies-collage"
      ></img>

      <form
        className="absolute bottom-36 w-full md:bottom-24 right-0 left-0 m-auto lg:w-1/3  bg bg-black  opacity-90 rounded-lg p-4 hover:cursor-pointer"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className=" text-white m-2 p-2 text-2xl">
          {newUser ? "Sign Up" : "Sign In"}
        </h1>
        <div className="flex flex-col m-2">
          {newUser ? (
            <input
              className=" rounded-lg m-2 mb-4 p-2 font-semibold text-white bg-gray-800"
              placeholder="Full Name"
              ref={name}
            ></input>
          ) : null}
          <input
            className=" rounded-lg m-2 mb-4 p-2 bg-gray-800 font-semibold text-white"
            placeholder="Email Address"
            ref={email}
          ></input>

          <input
            className="rounded-lg m-2 p-2 bg-gray-800 font-semibold text-white"
            placeholder="Password"
            ref={password}
          ></input>

          <h1 className="text-red-700 ml-4 font-bold">{errorMsg}</h1>
          <button
            className="mt-8 text-white bg-red-800 rounded-lg p-2 text-lg  md:w-auto  md:ml-2  hover:bg-red-600"
            onClick={handleLogIn}
          >
            {newUser ? "Sign Up" : "Sign In"}
          </button>
        </div>
        <h1
          className="text-center text-white mt-10 hover:cursor-pointer hover:text-red-600 hover:font-semibold"
          onClick={() => {
            toggleSignInform();
            setSignedUp(false);
            email.current.value = "";
            password.current.value = "";
          }}
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
