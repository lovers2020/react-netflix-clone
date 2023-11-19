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

export default function MovieClicked({ bigMovieMatch, clickedMovie }: any) {
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
						<DetailMatch>
							Match {Math.round(clickedMovie.vote_average * 10)}%
						</DetailMatch>

						<DetailOverView>{clickedMovie.overview}</DetailOverView>
					</>
				)}
			</DetailMovie>
		</>
	);
}
