import { motion } from "framer-motion";
import styled from "styled-components";

export const Nav = styled(motion.nav)`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	background-color: black;
	font-size: 16px;
	font-weight: 400;
	padding: 20px 60px;
	color: white;
`;
export const Col = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const Logo = styled(motion.svg)`
	margin-right: 50px;
	width: 95px;
	height: 25px;
	fill: ${(props) => props.theme.red};
	cursor: pointer;
`;
export const Items = styled.ul`
	display: flex;
	align-items: center;
`;
export const Item = styled.li`
	margin-right: 20px;
	color: ${(props) => props.theme.white.dakrer};
	transition: color 0.2s ease-in-out;
	position: relative;
	display: flex;
	justify-content: center;
	flex-direction: column;

	&:hover {
		color: ${(props) => props.theme.white.lighter};
	}
`;
export const Circle = styled(motion.span)`
	position: absolute;
	bottom: -10px;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: ${(props) => props.theme.red};
`;
export const Search = styled(motion.form)`
	position: relative;
	display: flex;
	align-items: center;
	color: white;
	svg {
		height: 20px;
	}
`;
export const Input = styled(motion.input)`
	transform-origin: right center;
	position: absolute;
	right: 0px;
	padding: 5px 10px;
	padding-left: 40px;
	z-index: -1;
	color: white;
	font-size: 16px;
	background-color: transparent;
	border: 1px solid ${(props) => props.theme.white.lighter};
	border-radius: 5px;
	background-color: rgba(0, 0, 0, 0.4);
`;
export const navVariants = {
	top: { backgroundColor: "rgba(0,0,0,0)" },
	scroll: { backgroundColor: "#141414" },
};
export interface IForm {
	keyword: string;
}
