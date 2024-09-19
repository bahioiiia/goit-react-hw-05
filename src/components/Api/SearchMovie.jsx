import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmEzYzYyMGY4OGE1OWUwMjFhOGUyZDAwYTE1NjIzOSIsIm5iZiI6MTcyNjQyNTM3Ni43NjE3OTYsInN1YiI6IjY2ZDhlNmRjMmNlMjYwMDMzNThmMGRmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NHGQ23pOJogoXDRH1y0df9NV_QcpH0NdmUv0_eGCcYk",
  },
};

export const getSearchMovie = async (query) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
    options
  );
  //   console.log(response.data);

  return response.data.results;
};
