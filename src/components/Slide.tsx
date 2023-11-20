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
	rowVariants,
} from "../styles/SlideStyle";
import { makeImagePath, useWindowDimensions } from "../utils";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Slide({ data, title, category }: any) {
	const location = useLocation();
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
	let navigateId = "";
	const onBoxClicked = (movieId: string) => {
		if (location.pathname.slice(1, 3) === "tv") navigateId = "tv";
		else navigateId = "movies";
		navigate(`/${navigateId}/${movieId}`);
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

			<SliderTitle>{title}</SliderTitle>
			<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
				<Row
					key={index}
					custom={slideDir}
					variants={rowVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					transition={{ type: "tween", duration: 0.6 }}
				>
					{data?.results
						.slice(1)
						.slice(offset * index, offset * index + offset)
						.map((current: any) => (
							<Box
								variants={boxVariants}
								layoutId={category + current.id + ""}
								key={category + current.id + ""}
								initial="normal"
								whileHover="hover"
								transition={{ type: "tween" }}
								onClick={() =>
									onBoxClicked(category + current.id)
								}
								bgphoto={makeImagePath(
									current.backdrop_path
										? current.backdrop_path
										: current.poster_path,
									"w500"
								)}
							>
								<Info variants={infoVariants}>
									<h4>
										{current.title
											? current.title
											: current.name}
									</h4>
								</Info>
							</Box>
						))}
				</Row>
			</AnimatePresence>
		</Slider>
	);
}
