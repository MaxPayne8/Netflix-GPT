import React from "react";

const formValidate = (email, password, name) => {
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isNameValid = /^[a-z ,.'-]+$/i.test(name);

  if (!isEmailValid) return "Email is not valid";

  if (!isPasswordValid)
    return "Password is not valid(should contain an uppercase and special character)";
  if (!isNameValid) return "Please enter your name correctly!!";

  return null;
};

export default formValidate;
