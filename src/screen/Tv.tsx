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
		useQuery<IMovieResult>("Airing", () => getTvAiringToday());
	const { data: onTheAir, isLoading: onTheAirLoading } =
		useQuery<IMovieResult>("onTheAir", () => getTvOnTheAir());
	const { data: popular, isLoading: popularLoading } = useQuery<IMovieResult>(
		"TvPopular",
		() => getTvPopular()
	);
	const { data: topRated, isLoading: topRatedLoading } =
		useQuery<IMovieResult>("TvTopRated", () => getTvTopRated());
	console.log(topRated);

	let clickedMovie = "";
	function isClickedTv() {
		if (bigTvMatch?.params.tvId) {
			const category = bigTvMatch?.params.tvId.slice(3, 6);
			let tvs: any = "";
			if (category === "air") tvs = airingToday;
			else if (category === "pop") tvs = popular;
			else if (category === "top") tvs = topRated;
			else tvs = onTheAir;

			clickedMovie = tvs?.results.find((movie: any) => {
				return movie.id + "" === bigTvMatch?.params?.tvId?.slice(6);
			});
		}
	}
	isClickedTv();
	console.log(topRated);

	return (
		<Wrapper>
			{airingTodayLoading ||
			popularLoading ||
			topRatedLoading ||
			onTheAirLoading ? (
				<Loader>Loading....</Loader>
			) : (
				<>
					<MainDisplay
						id={topRated?.results[0].id + ""}
						category="tv_top"
						name={topRated?.results[0].name}
						overview={topRated?.results[0].overview}
						bgIamgePath={topRated?.results[0].backdrop_path}
					></MainDisplay>

					<SlideContainer>
						<Slide
							data={airingToday}
							title="Airing Today"
							category="tv_air"
						></Slide>
					</SlideContainer>
					<SlideContainer>
						<Slide
							data={onTheAir}
							title="On The Air"
							category="tv_ont"
						></Slide>
					</SlideContainer>
					<SlideContainer>
						<Slide
							data={popular}
							title="Popular"
							category="tv_pop"
						></Slide>
					</SlideContainer>
					<SlideContainer>
						<Slide
							data={topRated}
							title="Top Rated"
							category="tv_top"
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
