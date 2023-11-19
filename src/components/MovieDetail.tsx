import { useQuery } from "react-query";
import { getMovieDetail, getMovies } from "../api";
import {
	DetailCover,
	DetailMatch,
	DetailMovie,
	DetailOverView,
	DetailTitle,
	Overlay,
} from "../styles/MovieDetailStyle";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
interface IMovieDetails {
	genres: [{ id: number; name: string }];
	homepage: string;
	release_date: string;
	runtime: number;
	vote_average: number;
}
export default function MovieClicked({ bigMovieMatch, clickedMovie }: any) {
	const id = clickedMovie?.id;
	const { data: genre, isLoading: genreisLoading } = useQuery<IMovieDetails>(
		"genres",
		() => getMovieDetail(id)
	);
	function getMovieGenres(data: any) {
		return data.genres.map((genre: any) => genre.name).join(", ");
	}
	const navigate = useNavigate();
	const onOverlayClick = () => navigate("/");
	return (
		<>
			<Overlay
				onClick={onOverlayClick}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			></Overlay>
			<DetailMovie layoutId={bigMovieMatch.params.movieId}>
				{clickedMovie && (
					<>
						<DetailCover
							style={{
								objectFit: "cover",
								backgroundImage: `linear-gradient(rgba(0,0,0,0),#141414),
                                     url(${makeImagePath(
											clickedMovie.poster_path,
											"w500"
										)})`,
							}}
						></DetailCover>
						<DetailTitle>{clickedMovie.title}</DetailTitle>
						<div style={{ display: "flex" }}>
							<div style={{ width: "60%" }}>
								<DetailMatch>
									{Math.round(clickedMovie.vote_average * 10)}
									% Match
								</DetailMatch>

								<DetailOverView>
									{clickedMovie.overview}
								</DetailOverView>
							</div>
							<div
								style={{
									paddingLeft: "2rem",
									display: "flex",
								}}
							>
								<span
									style={{
										color: "rgba(255,255,255,0.5)",
									}}
								>
									Genres:
								</span>
								<span>
									{genreisLoading
										? "Loading..."
										: getMovieGenres(genre)}
								</span>
							</div>
						</div>
					</>
				)}
			</DetailMovie>
		</>
	);
}
