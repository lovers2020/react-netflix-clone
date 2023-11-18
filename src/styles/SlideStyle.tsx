import { motion } from "framer-motion";
import styled from "styled-components";

export const Slider = styled.div`
	position: relative;
	top: -100px;

	&:hover {
		#slideBtn {
			opacity: 1;
			transition: opacity 0.3s linear;
		}
	}
`;
export const PrevNextBtn = styled.div`
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
export const SliderTitle = styled.span`
	position: absolute;
	top: -50px;
	left: 35px;
	font-size: 26px;
	font-weight: 600;
`;
export const Row = styled(motion.div)`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(6, 1fr);
	position: absolute;
	width: 100%;
	padding: 0 2rem;
`;
export const Box = styled(motion.div)<{ bgPhoto: string }>`
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
export const Info = styled(motion.div)`
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
export const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	opacity: 0;
`;
export const BigMovie = styled(motion.div)`
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
export const BigCover = styled.div`
	width: 100%;
	height: 400px;
	background-size: cover;
	background-position: center center;
`;
export const BigTitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
	padding: 10px;
	font-size: 46px;
	position: relative;
	top: -80px;
`;
export const BigOverView = styled.p`
	padding: 20px;
	color: ${(props) => props.theme.white.lighter};
	position: relative;
	top: -80px;
`;
export const boxVariants = {
	normal: { scale: 1, y: 0 },
	hover: {
		scale: 1.2,
		y: -50,
		transition: { delay: 0.3, duration: 0.3, type: "tween" },
	},
};
export const infoVariants = {
	hover: {
		zindex: 99,
		opacity: 1,
		transition: { delay: 0.3, duration: 0.3, type: "tween" },
	},
};
export const offset = 6;
