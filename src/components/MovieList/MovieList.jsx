import { Link, useLocation } from "react-router-dom";
import { BiSolidCameraMovie } from "react-icons/bi";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.container}>
      {movies.map(({ id, backdrop_path, title }) => {
        return (
          <li key={id} className={css.wrapper}>
            <Link to={`/movies/${id}`} state={location} className={css.item}>
              {backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${backdrop_path}`}
                  alt={title}
                  className={css.img}
                  height={300}
                />
              ) : (
                <div className={css.empty}>
                  <BiSolidCameraMovie className={css.icon} />
                </div>
              )}
              <h3 className={css.title}>{title}</h3>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
