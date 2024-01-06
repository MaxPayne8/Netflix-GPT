import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const PureTvList = ({ movList, title }) => {
  useEffect(() => {
    Aos.init();
  }, []);
  const newMovList = movList?.filter((mov) => mov?.poster_path);

  var movies = 6,
    movTab = 4,
    movMob = 2;
  if (newMovList?.length === 5) movies = 5;
  else if (newMovList?.length === 4) movies = 4;
  else if (newMovList?.length === 3) {
    movies = 3;
    movTab = 3;
  } else if (newMovList?.length === 2) {
    movies = 2;
    movTab = 2;
  } else if (newMovList?.length === 1) {
    movies = 1;
    movTab = 1;
    movMob = 1;
  }

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: movies,
    slidesToScroll: movies / 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: movTab,
          slidesToScroll: movTab / 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: movMob,
          slidesToScroll: movMob / 2,
        },
      },
    ],
  };
  return (
    <div className="my-4" data-aos="zoom-in">
      <h1 className="text-white text-center  text-base md:text-3xl">{title}</h1>
      <Slider {...settings} className="w-[85%] sm:w-[90%] mx-auto">
        {newMovList?.map((mov) => (
          <Link to={"/browse/moreinfoTv/" + mov?.id}>
            <MovieCard
              posterId={mov?.poster_path}
              title={mov.original_title || mov.name}
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default PureTvList;
