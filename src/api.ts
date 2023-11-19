const API_KEY =
	"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGQ0ZDc1MGMwMTQ2YjZjOTU1MDEwNGQxMGU2YTJlOCIsInN1YiI6IjY1NTVjZWE4ZDRmZTA0MDBhYzM2OTM4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7o0il6EgNl1qdkmO3p7a0FDxEVhrvlr14YysmVhn0oI";

interface IMovie {
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
	release_date: string;
	id: number;
	vote_average: number;
	genre_ids: number[];
}

export interface IMovieResult {
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}
const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: API_KEY,
	},
};

export async function getMovies() {
	const response = await fetch(
		"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
		options
	);
	const jsonParse = await response.json().catch((err) => console.error(err));
	return jsonParse;
}
export async function getPopular() {
	const response = await fetch(
		"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
		options
	);
	const jsonParse = await response.json().catch((err) => console.error(err));
	return jsonParse;
}
export async function getUpComing() {
	const response = await fetch(
		"https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
		options
	);
	const jsonParse = await response.json().catch((err) => console.error(err));
	return jsonParse;
}
export async function getTopRated() {
	const response = await fetch(
		"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
		options
	);
	const jsonParse = await response.json().catch((err) => console.error(err));
	return jsonParse;
}
export async function getMovieDetail(id: string) {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?language=en-US`,
		options
	);
	const jsonParse = await response.json().catch((err) => console.error(err));
	return jsonParse;
}
