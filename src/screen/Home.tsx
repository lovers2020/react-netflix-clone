import { useQuery } from "react-query";
import { getMovies, IMovieResult } from "../api";
import styled from "styled-components";
import { makeImagePath, useWindowDimensions } from "./../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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
	background-color: red;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgPhoto});
	background-size: cover;
`;
const Title = styled.h2`
	font-size: 68px;
	margin-bottom: 1rem;
`;
const Overview = styled.p`
	font-size: 36px;
	width: 50%;
`;

const Slider = styled.div`
	position: relative;
	top: -100px;
`;
const Row = styled(motion.div)`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(6, 1fr);
	position: absolute;
	width: 100%;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
	background-color: red;
	height: 200px;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: center center;
`;
const offset = 6;

export default function Home() {
	const width = useWindowDimensions();
	const { data, isLoading } = useQuery<IMovieResult>(
		["movies", "now_playing"],
		getMovies
	);
	const [leaving, setLeaving] = useState(false);
	const [index, setIndex] = useState(0);
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			const totlaMovies = data?.results.length - 1;
			const maxIndex = Math.floor(totlaMovies / offset) - 1;
			setLeaving(true);
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading....</Loader>
			) : (
				<>
					<Banner
						onClick={increaseIndex}
						bgPhoto={makeImagePath(
							data?.results[0].backdrop_path || ""
						)}
					>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
					<Slider>
						<AnimatePresence
							initial={false}
							onExitComplete={toggleLeaving}
						>
							<Row
								key={index}
								initial={{ x: width + 5 }}
								animate={{ x: 0 }}
								exit={{ x: -width - 5 }}
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
											key={movie.id}
											bgPhoto={makeImagePath(
												movie?.backdrop_path,
												"w500"
											)}
										/>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
				</>
			)}
		</Wrapper>
	);
}
