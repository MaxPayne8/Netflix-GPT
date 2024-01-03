import { useSelector } from "react-redux";
import MovieTitle from "./MovieTitle";
import BackgroundVideo from "./BackgroundVideo";

const MainContainer = () => {
  const movies = useSelector((store) => store.movie?.nowPlayingMovies);

  if (!movies) return;
  const randomIndex = Math.trunc(Math.random() * 20);
  const trailermovie = movies[randomIndex];

  console.log(trailermovie);
  const { id, title, overview } = trailermovie;

  return (
    <div >
      <MovieTitle title={title} overview={overview} id={id} />
      <BackgroundVideo id={id} />
    </div>
  );
};

export default MainContainer;
