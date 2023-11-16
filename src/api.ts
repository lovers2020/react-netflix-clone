interface IMovie {
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  id: number;
}

export interface IMovieResult {
  dates: {
    maximum: string;
    minumum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export async function getMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGQ0ZDc1MGMwMTQ2YjZjOTU1MDEwNGQxMGU2YTJlOCIsInN1YiI6IjY1NTVjZWE4ZDRmZTA0MDBhYzM2OTM4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7o0il6EgNl1qdkmO3p7a0FDxEVhrvlr14YysmVhn0oI",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  );
  const jsonParse = await response.json().catch((err) => console.error(err));
  return jsonParse;
}
