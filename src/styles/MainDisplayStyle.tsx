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
