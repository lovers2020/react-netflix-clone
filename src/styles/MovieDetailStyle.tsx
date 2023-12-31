import { motion } from "framer-motion";
import styled from "styled-components";

export const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	opacity: 0;
	z-index: 2;
`;
export const DetailMovie = styled(motion.div)`
	width: 100%;
	position: fixed;
	width: 50vw;
	height: 90vh;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	border-radius: 15px;
	overflow: hidden;
	z-index: 3;
	background-color: #141414;
`;
export const DetailCover = styled.div`
	width: 100%;
	height: 45%;
	background-size: cover;
	background-position: center center;
`;
export const DetailTitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
	padding: 20px 20px 20px 40px;
	font-size: 38px;
	font-weight: 400;
`;
export const DetailOverView = styled.p`
	font-size: 20px;
	padding: 20px;
	color: ${(props) => props.theme.white.lighter};
`;
export const DetailMatch = styled.span`
	padding: 0 20px;
	color: #3db45b;
	font-weight: 700;
`;
export const DetailContiainter = styled.div`
	display: flex;
	padding: 0 20px;
`;
export const DetailContiainterLeft = styled.div`
	width: 60%;
`;
export const DetailContiainterRight = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 2rem;
`;
export const InfoTitle = styled.span`
	color: rgba(255, 255, 255, 0.5);
	margin: 10px 0;
`;
export const InfoDetail = styled.span`
	color: white;
	margin-left: 5px;
`;
