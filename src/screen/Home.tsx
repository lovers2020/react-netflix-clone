import { useQuery } from "react-query";
import {
	getMovies,
	getPopular,
	getTopRated,
	getUpComing,
	IMovieResult,
} from "../api";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import MainDisplay from "./MainDisplay";
import Slide from "../components/Slide";
import MovieClicked from "../components/MovieDetail";

const Wrapper = styled.div`
	background-color: transparent;
`;
const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const SlideContainer = styled.div`
	width: 100%;
	height: 300px;
`;

export default function Home() {
	const bigMovieMatch = useMatch("/movies/:movieId");
	const { data: trendingNow, isLoading: trendingNowLoading } =
		useQuery<IMovieResult>("trend", getMovies);
	const { data: popular, isLoading: popularLoading } = useQuery<IMovieResult>(
		"popular",
		getPopular
	);
	const { data: topRated, isLoading: topRatedLoading } =
		useQuery<IMovieResult>("topRated", getTopRated);
	const { data: upComing, isLoading: upComingLoading } =
		useQuery<IMovieResult>("upComing", getUpComing);
	// const clickedMovie =
	//     bigMovieMatch?.params.movieId &&
	//     trendingMovies?.results.find(
	//         (movie) => movie.id + "" === bigMovieMatch.params.movieId.slice(3)
	//     );
	let clickedMovie = "";
	function isClickedMovie() {
		if (bigMovieMatch?.params.movieId) {
			const category = bigMovieMatch?.params.movieId.slice(0, 3);
			let movies: any = "";
			if (category === "trd") movies = trendingNow;
			else if (category === "pop") movies = popular;
			else if (category === "top") movies = topRated;
			else movies = upComing;
			clickedMovie = movies?.results.find(
				(movie: any) =>
					movie.id + "" === bigMovieMatch?.params?.movieId?.slice(3)
			);
		}
	}
	isClickedMovie();
	return (
		<Wrapper>
			{trendingNowLoading ||
			popularLoading ||
			topRatedLoading ||
			upComingLoading ? (
				<Loader>Loading....</Loader>
			) : (
				<>
					<MainDisplay data={trendingNow}></MainDisplay>
					<SlideContainer>
						<Slide
							data={trendingNow}
							title="Trending Now"
							category="trd"
						></Slide>
					</SlideContainer>
					<SlideContainer>
						<Slide
							data={popular}
							title="Popular on Netflix"
							category="pop"
						></Slide>
					</SlideContainer>
					<SlideContainer>
						<Slide
							data={topRated}
							title="Top Rated"
							category="top"
						></Slide>
					</SlideContainer>
					<SlideContainer>
						<Slide
							data={upComing}
							title="Upcoming"
							category="upc"
						></Slide>
					</SlideContainer>

					<AnimatePresence>
						{bigMovieMatch ? (
							<>
								<MovieClicked
									bigMovieMatch={bigMovieMatch}
									clickedMovie={clickedMovie}
								></MovieClicked>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}
