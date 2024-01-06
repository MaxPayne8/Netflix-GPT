import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { addTrailer } from "../utils/moviesSlice";
import { API_TMDB_OPTIONS } from "../utils/constants";

const useGetTrailer = (movId) => {
  //   const movies = useSelector((store) => store.movie?.nowPlayingMovies);
  //   if (!movies) return;
  //   const trailermovie = movies[0];
  //   const { id } = trailermovie;
  const dispatch = useDispatch();
  const getTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movId + "/videos?language=en-US",

      API_TMDB_OPTIONS
    );
    const json = await data.json();
    const dataa = await json?.results;
    const trailerVid = dataa?.filter((vid) => vid?.type === "Trailer");

    const finalTrailer = trailerVid[0] || trailerVid[1] || trailerVid[2];

    dispatch(addTrailer(finalTrailer));
  };
  useEffect(() => {
    getTrailer();
  }, [movId]);
};

export default useGetTrailer;
