import { Suspense, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getDetailsMovie } from "../../components/Api/DetailsMovie";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getDetailsMovie(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      <Link to={backLinkRef.current}>Go back</Link>
      {movie && (
        <div className={css.container}>
          <div className={css.imgwrap}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              width="300px"
            />
          </div>
          <div className={css.textwrap}>
            <h1>{movie.title}</h1>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
            <h2>Genres</h2>
            <ul className={css.list}>
              {movie.genres.map((genre) => (
                <li key={genre.id}>
                  <p>{genre.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <h2>Additional information</h2>
          <ul className={css.list}>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
}
