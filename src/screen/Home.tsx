import { useQuery } from "react-query";
import { getMovies, IMovieResult } from "../api";
import styled from "styled-components";
import { makeImagePath, useWindowDimensions } from "./../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
	background-color: black;
	overflow-x: hidden;
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
	gap: 15px;
	grid-template-columns: repeat(6, 1fr);
	position: absolute;
	width: 100%;
`;
const Box = styled(motion.div)`
	background-color: red;
	height: 200px;
`;
export default function Home() {
	const width = useWindowDimensions();
	const { data, isLoading } = useQuery<IMovieResult>(
		["movies", "now_playing"],
		getMovies
	);
	const [index, setIndex] = useState(0);
	const increaseIndex = () => setIndex((prev) => prev + 1);

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
						<AnimatePresence>
							<Row
								key={index}
								initial={{ x: width + 10 }}
								animate={{ x: 0 }}
								exit={{ x: -width - 10 }}
								transition={{ type: "tween", duration: 0.6 }}
							>
								{[1, 2, 3, 4, 5, 6].map((i) => (
									<Box key={i}>{i}</Box>
								))}
							</Row>
						</AnimatePresence>
					</Slider>
				</>
			)}
		</Wrapper>
	);
}
