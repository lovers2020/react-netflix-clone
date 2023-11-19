import { AnimatePresence } from "framer-motion";
import {
	Box,
	Info,
	PrevNextBtn,
	Row,
	Slider,
	SliderTitle,
	boxVariants,
	infoVariants,
	offset,
} from "../styles/SlideStyle";
import { makeImagePath, useWindowDimensions } from "../utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Slide({ data, title, category }: any) {
	const navigate = useNavigate();
	const width = useWindowDimensions();
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
	const onBoxClicked = (movieId: string) => {
		navigate(`/movies/${movieId}`);
	};
	return (
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
			<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
				<SliderTitle>{title}</SliderTitle>
				<Row
					key={index}
					initial={{ x: width * slideDir + 5 }}
					animate={{ x: 0 }}
					exit={{ x: -width * slideDir - 5 }}
					transition={{ type: "tween", duration: 0.6 }}
				>
					{data?.results
						.slice(1)
						.slice(offset * index, offset * index + offset)
						.map((movie: any) => (
							<Box
								layoutId={category + movie.id}
								key={category + movie.id}
								variants={boxVariants}
								initial="normal"
								whileHover="hover"
								transition={{ type: "tween" }}
								onClick={() =>
									onBoxClicked(category + movie.id)
								}
								bgphoto={makeImagePath(
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
	);
}
