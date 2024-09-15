import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmEzYzYyMGY4OGE1OWUwMjFhOGUyZDAwYTE1NjIzOSIsIm5iZiI6MTcyNjQyNTM3Ni43NjE3OTYsInN1YiI6IjY2ZDhlNmRjMmNlMjYwMDMzNThmMGRmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NHGQ23pOJogoXDRH1y0df9NV_QcpH0NdmUv0_eGCcYk",
  },
});

const fetchTrendingMovies = async () => {
  const response = await instance.get("/trending/movie/day");

  return response.data.results;
};

const searchMovies = async (query, { signal, page = 1 }) => {
  const response = await instance.get("/search/movie", {
    params: {
      query,
      page,
      page_size: 20,
    },
    signal,
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
};

const fetchMovieDetails = async (movie_id) => {
  const response = await instance.get(`/movie/${movie_id}`);

  return {
    poster_path: response.data.poster_path,
    title: response.data.title,
    release_date: response.data.release_date,
    vote_average: response.data.vote_average,
    overview: response.data.overview,
    genres: response.data.genres,
  };
};

const fetchMovieCast = async (movie_id) => {
  const response = await instance.get(`/movie/${movie_id}/credits`, {
    params: {
      movie_id,
    },
  });
  return response.data.cast;
};
const fetchMovieReviews = async (movie_id) => {
  const response = await instance.get(`/movie/${movie_id}/reviews`, {
    params: {
      movie_id,
    },
  });

  return response.data.results;
};

export {
  fetchTrendingMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
};
