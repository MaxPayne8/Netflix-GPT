import { useEffect } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const PureMovieList = ({ movList, title }) => {
  useEffect(() => {
    Aos.init();
  });

  return (
    <div className="my-4" data-aos="fade-down">
      <h1 className="text-white ml-3 text-3xl">{title}</h1>
      <div className="flex  overflow-x-scroll no-scrollbar ">
        {movList?.map((mov) => (
          <Link to={"/browse/moreinfo/" + mov?.id}>
            <MovieCard posterId={mov?.poster_path} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PureMovieList;
