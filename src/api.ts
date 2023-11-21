const API_KEY =
	"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGQ0ZDc1MGMwMTQ2YjZjOTU1MDEwNGQxMGU2YTJlOCIsInN1YiI6IjY1NTVjZWE4ZDRmZTA0MDBhYzM2OTM4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7o0il6EgNl1qdkmO3p7a0FDxEVhrvlr14YysmVhn0oI";

interface IMovie {
	backdrop_path: string;
	poster_path: string;
	title: string;
	name: string;
	overview: string;
	release_date: string;
	id: number;
	vote_average: number;
	genre_ids: number[];
}

export interface IMovieResult {
	dates: {
		maximum: string;
		minimum: string;
	};
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
export function getMovies() {
	return fetch(
		"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
		options
	).then((response) => response.json());
}
export function getPopular() {
	return fetch(
		"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
		options
	).then((response) => response.json());
}
export async function getUpComing() {
	const response = await fetch(
		"https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
		options
	);
	const jsonParse = await response.json();
	return jsonParse;
}
export async function getTopRated() {
	const response = await fetch(
		"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
		options
	);
	const jsonParse = await response.json();
	return jsonParse;
}
export async function getMovieDetail(id: number) {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?language=en-US`,
		options
	);
	const jsonParse = await response.json();
	return jsonParse;
}
export async function getMovieVideo(id: number) {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
		options
	);
	const jsonParse = await response.json();
	return jsonParse;
}

export async function getTvAiringToday() {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/airing_today?/videos?language=en-US&page=1`,
		options
	);
	const jsonParse = await response.json();
	return jsonParse;
}
export async function getTvOnTheAir() {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/on_the_air?/videos?language=en-US&page=2`,
		options
	);
	const jsonParse = await response.json();
	return jsonParse;
}
export async function getTvPopular() {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/popular?/videos?language=en-US&page=1`,
		options
	);
	const jsonParse = await response.json();
	return jsonParse;
}
export async function getTvTopRated() {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/top_rated?/videos?language=en-US&page=1`,
		options
	);
	const jsonParse = await response.json();
	return jsonParse;
}
export async function getTvVideo(id: number) {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
		options
	);
	const jsonParse = await response.json();
	return jsonParse;
}

export async function getTvDetail(id: number) {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${id}?language=en-US`,
		options
	);
	const jsonParse = await response.json();
	return jsonParse;
}
