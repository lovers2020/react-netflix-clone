import { useQuery } from "react-query";
import { getMovieDetail, getMovieVideo } from "../api";
import {
	DetailContiainter,
	DetailContiainterLeft,
	DetailContiainterRight,
	DetailCover,
	DetailMatch,
	DetailMovie,
	DetailOverView,
	DetailTitle,
	InfoDetail,
	InfoTitle,
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
interface IVideoDetails {
	results: [{ type: string; key: string }];
}
export default function MovieDetail({ bigMovieMatch, clickedMovie }: any) {
	const id = clickedMovie?.id;
	const { data: genre, isLoading: genreIsLoading } = useQuery<IMovieDetails>(
		"genres",
		() => getMovieDetail(id)
	);
	const { data: video, isLoading: getVideoIsLoading } =
		useQuery<IVideoDetails>("videoUrl", () => getMovieVideo(id));

	function getVideoUrl() {
		const videoId = video?.results.find(
			(current) => current.type === "Teaser"
		);
		return videoId ? videoId.key : video?.results[0].key;
	}
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
						<DetailContiainter>
							<DetailContiainterLeft>
								<DetailMatch>
									{Math.round(clickedMovie.vote_average * 10)}
									% Match
								</DetailMatch>
								<DetailOverView>
									{clickedMovie.overview}
								</DetailOverView>
							</DetailContiainterLeft>
							<DetailContiainterRight>
								<InfoTitle>
									Genres:
									<InfoDetail>
										{genreIsLoading
											? "Loading..."
											: getMovieGenres(genre)}
									</InfoDetail>
								</InfoTitle>
								<InfoTitle>
									release_date:
									<InfoDetail>
										{genre?.release_date}
									</InfoDetail>
								</InfoTitle>
								<InfoTitle>
									Runtime:
									<InfoDetail>
										{genre?.runtime} minutes
									</InfoDetail>
								</InfoTitle>
								<InfoTitle>
									Homepage:
									<a
										href={genre?.homepage}
										target="blank"
										style={{
											color: "white",
											fontWeight: "500",
											marginLeft: "5px",
										}}
									>
										{genre?.homepage}
									</a>
								</InfoTitle>
							</DetailContiainterRight>
						</DetailContiainter>
					</>
				)}
			</DetailMovie>
		</>
	);
}
