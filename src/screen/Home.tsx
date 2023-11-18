import { useQuery } from "react-query";
import { getMovies, IMovieResult } from "../api";
import styled from "styled-components";
import { makeImagePath, useWindowDimensions } from "./../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
	background-color: black;
`;
const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), #141414),
		url(${(props) => props.bgPhoto});
	background-size: cover;
`;
const Title = styled.h2`
	font-size: 68px;
	margin-bottom: 1rem;
`;
const Overview = styled.p`
	font-size: 20px;
	width: 50%;
`;
const Slider = styled.div`
	position: relative;
	top: -100px;

	&:hover {
		#slideBtn {
			opacity: 1;
			transition: opacity 0.3s linear;
		}
	}
`;
const PrevNextBtn = styled.div`
	width: 50px;
	height: 50px;
	font-size: 36px;
	text-align: center;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 25px;
	position: absolute;
	z-index: 100;
	cursor: pointer;
	opacity: 0;
	&:hover {
		scale: 1.1;
		background-color: white;
		color: black;
	}
`;
const SliderTitle = styled.span`
	position: absolute;
	top: -50px;
	left: 35px;
	font-size: 26px;
	font-weight: 600;
`;
const Row = styled(motion.div)`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(6, 1fr);
	position: absolute;
	width: 100%;
	padding: 0 2rem;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
	background-color: red;
	height: 180px;
	border-radius: 5px;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: center center;
	cursor: pointer;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;
const Info = styled(motion.div)`
	padding: 10px;
	background-color: ${(props) => props.theme.black.lighter};
	opacity: 0;
	position: absolute;
	width: 100%;
	bottom: 0;
	border-radius: 5px;

	h4 {
		text-align: center;
		font-size: 16px;
	}
`;
const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	opacity: 0;
`;
const BigMovie = styled(motion.div)`
	position: fixed;
	width: 40vw;
	height: 80vh;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	border-radius: 15px;
	overflow: hidden;
	background-color: ${(props) => props.theme.black.lighter};
`;
const BigCover = styled.div`
	width: 100%;
	height: 400px;
	background-size: cover;
	background-position: center center;
`;
const BigTitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
	padding: 10px;
	font-size: 46px;
	position: relative;
	top: -80px;
`;
const BigOverView = styled.p`
	padding: 20px;
	color: ${(props) => props.theme.white.lighter};
	position: relative;
	top: -80px;
`;
const boxVariants = {
	normal: { scale: 1, y: 0 },
	hover: {
		scale: 1.2,
		y: -50,
		transition: { delay: 0.3, duration: 0.3, type: "tween" },
	},
};
const infoVariants = {
	hover: {
		zindex: 99,
		opacity: 1,
		transition: { delay: 0.3, duration: 0.3, type: "tween" },
	},
};
const offset = 6;

export default function Home() {
	const navigate = useNavigate();
	const bigMovieMatch = useMatch("/movies/:movieId");
	const width = useWindowDimensions();
	const { data, isLoading } = useQuery<IMovieResult>(
		["movies", "now_playing"],
		getMovies
	);
	const [leaving, setLeaving] = useState(false);
	const [index, setIndex] = useState(0);
	const [slideDir, setSlideDir] = useState(1);
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			const totlaMovies = data?.results.length - 1;
			const maxIndex = Math.floor(totlaMovies / offset) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
			setLeaving(true);
			setSlideDir(1);
		}
	};
	const decreaseIndex = () => {
		if (data) {
			if (leaving) return;
			setIndex((prev) => prev - 1);
			setLeaving(true);
			setSlideDir(-1);
		}
	};
	const onBoxClicked = (movieId: number) => {
		navigate(`/movies/${movieId}`);
	};
	const onOverlayClick = () => navigate("/");
	const clickedMovie =
		bigMovieMatch?.params.movieId &&
		data?.results.find(
			(movie) => movie.id + "" === bigMovieMatch.params.movieId
		);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading....</Loader>
			) : (
				<>
					<Banner
						bgPhoto={makeImagePath(
							data?.results[0].backdrop_path || ""
						)}
					>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
					<Slider>
						{index !== 0 ? (
							<PrevNextBtn
								id="slideBtn"
								onClick={decreaseIndex}
								style={{
									top: "60px",
									left: "15px",
								}}
							>
								&larr;
							</PrevNextBtn>
						) : null}
						<PrevNextBtn
							id="slideBtn"
							onClick={increaseIndex}
							style={{
								top: "60px",
								right: "15px",
							}}
						>
							&rarr;
						</PrevNextBtn>
						<AnimatePresence
							initial={false}
							onExitComplete={toggleLeaving}
						>
							<SliderTitle>Trending Now</SliderTitle>
							<Row
								key={index}
								initial={{ x: width * slideDir + 5 }}
								animate={{ x: 0 }}
								exit={{ x: -width * slideDir - 5 }}
								transition={{ type: "tween", duration: 0.6 }}
							>
								{data?.results
									.slice(1)
									.slice(
										offset * index,
										offset * index + offset
									)
									.map((movie) => (
										<Box
											layoutId={movie.id + ""}
											key={movie.id}
											variants={boxVariants}
											initial="normal"
											whileHover="hover"
											transition={{ type: "tween" }}
											onClick={() =>
												onBoxClicked(movie.id)
											}
											bgPhoto={makeImagePath(
												movie?.backdrop_path,
												"w500"
											)}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
					<AnimatePresence>
						{bigMovieMatch ? (
							<>
								<Overlay
									onClick={onOverlayClick}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								></Overlay>
								<BigMovie
									layoutId={bigMovieMatch.params.movieId}
								>
									{clickedMovie && (
										<>
											<BigCover
												style={{
													backgroundImage: `linear-gradient(black,transparent), url(${makeImagePath(
														clickedMovie.backdrop_path,
														"w500"
													)})`,
												}}
											></BigCover>
											<BigTitle>
												{clickedMovie.title}
											</BigTitle>
											<BigOverView>
												{clickedMovie.overview}
											</BigOverView>
										</>
									)}
								</BigMovie>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}
