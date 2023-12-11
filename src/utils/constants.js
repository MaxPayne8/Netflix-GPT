export const NetflixLogo =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

//constants

export const UserLogo =
  "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg";

export const ImgCDN = "https://www.themoviedb.org/t/p/w220_and_h330_face";
export const API_TMDB_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2NjMTc1NGEyMGEzMDIzOTBjMDE4Y2Y2NDc5MDQzNSIsInN1YiI6IjY1MzYxNWQxOGNmY2M3MDEyYjQwNzc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9dklW0y483yxn5Khly5LOxKSZkILT6Ug_7fmUTBTQZE",
  },
};

export const supportedLang = [
  { identifier: "english", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "kannada", name: "Kannada" },
  { identifier: "french", name: "French" },
  { identifier: "spanish", name: "Spanish" },
];

export const GPT_API_KEY = process.env.REACT_APP_GPT_API;
