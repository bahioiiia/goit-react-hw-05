import { useEffect, useState } from "react";
import { getTrendMovies } from "../../components/Api/TrendMovies";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getTrendMovies();
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>Tranding today</h1>
      {loading && <Loader />}
      {error && <Error />}
      <MovieList movies={movies} />
    </>
  );
}
