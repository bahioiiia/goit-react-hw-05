import { useParams } from "react-router-dom";
import { getCastMovie } from "../../components/Api/CastMovie";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getCastMovie(movieId);
        setCasts(response);
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
      <ul className={css.list}>
        {casts.map((cast) => (
          <li key={cast.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
              alt={cast.name}
              width="250px"
            />
            <p>{cast.name}</p>
            <p>Character: {cast.character}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
