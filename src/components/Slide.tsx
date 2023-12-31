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
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NO_IMAGE = "https://demofree.sirv.com/nope-not-here.jpg";

export default function Slide({ data, title, category }: any) {
	const location = useLocation();
	const navigate = useNavigate();
	const [leaving, setLeaving] = useState(false);
	const [index, setIndex] = useState(0);
	const [slideDir, setSlideDir] = useState(1);
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			const totalMovies = data?.results.length;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
			setLeaving(true);
			setSlideDir(1);
		}
	};
	const decreaseIndex = () => {
		if (data) {
			if (leaving) return;
			const totalMovies = data?.results.length;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
			setLeaving(true);
			setSlideDir(-1);
		}
	};

	let navigateId = "";
	const onBoxClicked = (Id: string) => {
		if (location.pathname.slice(1, 3) !== "se") {
			if (location.pathname.slice(1, 3) === "tv") navigateId = "tv";
			else navigateId = "movies";
			navigate(`/${navigateId}/${Id}`);
		}
	};
	console.log(location.pathname.slice(1, 3));
	return (
		<Slider>
			<SliderTitle>{title}</SliderTitle>
			<PrevNextBtn
				id="slideBtn"
				style={{
					top: "60px",
					left: "15px",
				}}
				onClick={decreaseIndex}
			>
				&larr;
			</PrevNextBtn>
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
				custom={slideDir}
			>
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
								key={category + current.id}
								initial="normal"
								whileHover="hover"
								transition={{ type: "tween" }}
								onClick={() =>
									onBoxClicked(category + current.id)
								}
								bgphoto={
									current.backdrop_path || current.poster_path
										? makeImagePath(
												current.backdrop_path
													? current.backdrop_path
													: current.poster_path,
												"w500"
										  )
										: NO_IMAGE
								}
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
