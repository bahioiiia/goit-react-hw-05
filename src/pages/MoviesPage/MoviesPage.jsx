import { useEffect, useState } from "react";
import { getSearchMovie } from "../../components/Api/SearchMovie";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useLocation, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params] = useSearchParams();
  const query = params.get("query");

  const location = useLocation();

  useEffect(() => {
    if (!query) {
      return;
    }
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getSearchMovie(query);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query]);

  return (
    <>
      <SearchForm />
      {loading && <Loader />}
      {error && <Error />}
      {movie && <MovieList movies={movie} />}
    </>
  );
}
