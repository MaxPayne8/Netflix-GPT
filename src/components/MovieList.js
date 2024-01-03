import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const MovieList = ({ movList, title }) => {
  useEffect(() => {
    Aos.init();
  }, []);

  var movies = 6;
  if (movList?.length === 5) movies = 5;
  else if (movList?.length === 4) movies = 4;
  else if (movList?.length === 3) movies = 3;
  else if (movList?.length === 2) movies = 2;
  else if (movList?.length === 1) movies = 1;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: movies,
    slidesToScroll: movies / 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-4" data-aos="fade-down">
      <h1 className="text-white text-center  text-base md:text-3xl">{title}</h1>
      <Slider {...settings} className="w-[85%] sm:w-[90%] mx-auto">
        {movList?.map((mov) =>
          mov?.media_type === "movie" ? (
            <Link to={"/browse/moreinfo/" + mov?.id}>
              <MovieCard posterId={mov?.poster_path} />
            </Link>
          ) : (
            <Link to={"/browse/moreinfotv/" + mov?.id}>
              <MovieCard posterId={mov?.poster_path} />
            </Link>
          )
        )}
      </Slider>
    </div>
  );
};

export default MovieList;
