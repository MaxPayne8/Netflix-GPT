import React from "react";

import { useSelector } from "react-redux";

import useGetTrailer from "../hooks/useGetTrailer";

const BackgroundVideo = ({ id }) => {
  useGetTrailer(id);

  const TrailerVideo = useSelector((store) => store.movie.trailerVideo);

  return (
    <div className=" ">
      <iframe
        className=" aspect-video -mt-16 md:-mt-40 w-[100%] pointer-events-none  "
        src={
          "https://www.youtube.com/embed/" +
          TrailerVideo?.key +
          "?autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default BackgroundVideo;
