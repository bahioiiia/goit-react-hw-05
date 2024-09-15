import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovieReviews } from "../../fetchTMDB";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getReviews = async () => {
      try {
        setLoading(true);
        setError(false);
        const movieReviews = await fetchMovieReviews(movieId, { signal });
        setReviews(movieReviews);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    getReviews();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      {reviews.length > 0 ? (
        <ul className={css.container}>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>
                <strong className={css.text}>{review.author}</strong>
              </p>
              <p className={css.text}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.error}>We don't have any reviews for this movie!</p>
      )}
    </div>
  );
};

export default MovieReviews;
