import { useQuery } from "react-query";
import { getMovieDetail, getMovieVideo, getTvDetail, getTvVideo } from "../api";
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

import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { makeImagePath } from "../utils";
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

export default function MovieDetail({ bigMatch, clickedBox }: any) {
	const navigate = useNavigate();
	const onOverlayClick = () => navigate(-1);
	const id = clickedBox.id;
	const isMovie = bigMatch.params.movieId ? true : false;
	console.log(isMovie);
	const { data: genre, isLoading: genreIsLoading } = useQuery<IMovieDetails>(
		"genres",
		() => getMovieDetail(id)
	);
	const { data: movieVideo, isLoading: getVideoIsLoading } =
		useQuery<IVideoDetails>("MovieVideoId", () => getMovieVideo(id));
	// const { data: tvDetail, isLoading: getTvVDetailLoading } =
	// 	useQuery<IMovieDetails>("TvVideoId", () => getTvDetail(id));

	function getVideoId(data: any) {
		let getId = data?.results?.find(
			(current: any) => current.data === "Teaser"
		);
		return getId ? getId.key : data?.results[0].key;
	}
	let videoId = "";
	if (isMovie) videoId = getVideoId(movieVideo);

	function getMovieGenres(data: any) {
		return data.genres?.map((genre: any) => genre.name).join(", ");
	}
	return (
		<>
			{getVideoIsLoading ? null : (
				<>
					<Overlay
						onClick={onOverlayClick}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					></Overlay>
					<DetailMovie
						layoutId={
							bigMatch.params.movieId
								? bigMatch.params.movieId
								: bigMatch.params.tvId
						}
					>
						{clickedBox && (
							<>
								{isMovie ? (
									<DetailCover>
										<ReactPlayer
											url={`http://www.youtube.com/watch?v=${videoId}`}
											width={"100%"}
											height={"100%"}
											playing={true}
											muted={true}
											controls
										/>
									</DetailCover>
								) : (
									<DetailCover
										style={{
											objectFit: "cover",
											backgroundImage: `linear-gradient(rgba(0,0,0,0),#141414),
                                 url(${makeImagePath(
										clickedBox.backdrop_path
											? clickedBox.backdrop_path
											: clickedBox.poster_path,
										"w500"
									)})`,
										}}
									></DetailCover>
								)}

								<DetailTitle>
									{clickedBox.title
										? clickedBox.title
										: clickedBox.name}
								</DetailTitle>
								<DetailContiainter>
									<DetailContiainterLeft>
										<DetailMatch>
											{Math.round(
												clickedBox.vote_average * 10
											)}
											% Match
										</DetailMatch>
										<DetailOverView>
											{clickedBox.overview}
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
			)}
		</>
	);
}
