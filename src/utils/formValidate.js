import React from "react";

const formValidate = (email, password, name) => {
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isNameValid = /^[a-zA-Z ]{4,30}$/.test(name);

  if (!isEmailValid) return "Email is not valid";

  if (!isPasswordValid)
    return "Password is not valid(should contain an uppercase and atleast have 8 characters)";

  if (!isNameValid)
    return "Please enter your name correctly!!(Should have atleast 4 characters)";

  return null;
};

export default formValidate;
