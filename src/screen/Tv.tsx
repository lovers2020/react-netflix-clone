import { useQuery } from "react-query";
import {
	getTvAiringToday,
	getTvOnTheAir,
	getTvPopular,
	getTvTopRated,
	IMovieResult,
} from "../api";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import MainDisplay from "./MainDisplay";
import Slide from "../components/Slide";
import MovieDetail from "../components/MovieDetail";
import { Loader, SlideContainer, Wrapper } from "./Home";

export default function Tv() {
	const bigTvMatch = useMatch("/tv/:tvId");
	const { data: airingToday, isLoading: airingTodayLoading } =
		useQuery<IMovieResult>("airing", getTvAiringToday);
	const { data: onTheAir, isLoading: onTheAirLoading } =
		useQuery<IMovieResult>("onTheAir", getTvOnTheAir);
	const { data: popular, isLoading: popularLoading } = useQuery<IMovieResult>(
		"popular",
		getTvPopular
	);
	const { data: topRated, isLoading: topRatedLoading } =
		useQuery<IMovieResult>("topRated", getTvTopRated);

	let clickedMovie = "";
	function isClickedMovie() {
		if (bigTvMatch?.params.tvId) {
			const category = bigTvMatch?.params.tvId.slice(0, 3);
			let movies: any = "";
			if (category === "air") movies = airingToday;
			else if (category === "pop") movies = popular;
			else if (category === "top") movies = topRated;
			else movies = onTheAir;
			clickedMovie = movies?.results.find(
				(movie: any) =>
					movie.id + "" === bigTvMatch?.params?.tvId?.slice(3)
			);
		}
	}
	isClickedMovie();

	return (
		<Wrapper>
			{airingTodayLoading ||
			popularLoading ||
			topRatedLoading ||
			onTheAirLoading ? (
				<Loader>Loading....</Loader>
			) : (
				<>
					<MainDisplay data={topRated}></MainDisplay>

					<SlideContainer>
						<Slide
							data={airingToday}
							title="Airing Today"
							category="air"
						></Slide>
					</SlideContainer>
					<SlideContainer>
						<Slide
							data={onTheAir}
							title="On The Air"
							category="ont"
						></Slide>
					</SlideContainer>
					<SlideContainer>
						<Slide
							data={popular}
							title="Popular"
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

					<AnimatePresence>
						{bigTvMatch ? (
							<>
								<MovieDetail
									bigMatch={bigTvMatch}
									clickedBox={clickedMovie}
								></MovieDetail>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}
