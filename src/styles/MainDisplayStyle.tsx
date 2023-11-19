import { motion } from "framer-motion";
import styled from "styled-components";

export const Banner = styled.div<{ bgphoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), #141414),
		url(${(props) => props.bgphoto});
	background-size: cover;
`;
export const Title = styled.h2`
	font-size: 68px;
	margin-bottom: 1rem;
`;
export const Overview = styled.p`
	font-size: 20px;
	width: 35%;
`;

export const Buttons = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 400px;
	height: 100px;
	gap: 15px;
	font-weight: bold;
	font-size: 22px;
`;

export const PlayButton = styled(motion.div)`
	width: 150px;
	height: 60px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.white.dakrer};
	color: ${(props) => props.theme.black.darker};
	display: flex;
	align-items: center;
	justify-content: center;

	span {
		margin-left: 10px;
	}
`;

export const MoreInfoButton = styled(motion.div)`
	width: 200px;
	height: 60px;
	border-radius: 5px;
	background-color: #141414;
	color: ${(props) => props.theme.white.dakrer};
	display: flex;
	align-items: center;
	justify-content: center;

	span {
		margin-left: 10px;
	}
`;
