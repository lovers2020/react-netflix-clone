import { useQuery } from "react-query";
import { getMovieDetail } from "../api";
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
interface IGenres {
	id: number;
	name: string;
}
export default function MovieClicked({ bigMovieMatch, clickedMovie }: any) {
	const { data, isLoading } = useQuery<IGenres>("genres", () =>
		getMovieDetail(clickedMovie.id)
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
									{getMovieGenres(data)
										? getMovieGenres(data)
										: null}
								</span>
							</div>
						</div>
					</>
				)}
			</DetailMovie>
		</>
	);
}
