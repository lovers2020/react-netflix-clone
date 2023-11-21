import { styled } from "styled-components";

export const FooterContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 35%;
	position: absolute;
	padding: 4rem 8rem;
	background-color: transparent;
`;

export const FooterIcons = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 20px;
`;
export const FooterTitles = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	a {
		width: 100%;
		font-size: 14px;
		margin: 0.5rem 0;
		color: rgba(255, 255, 255, 0.4);
		&:hover {
			color: white;
		}
	}
`;
export const ServiceCode = styled.span`
	width: 100px;
	padding: 5px 0;
	margin: 1rem 0;
	text-align: center;

	font-size: 12px;
	color: rgba(255, 255, 255, 0.4);
	border: 1px solid rgba(255, 255, 255, 0.4);
	cursor: pointer;
	&:hover {
		color: white;
	}
`;
export const SiteInfo = styled.div`
	font-size: 12px;
	color: rgba(255, 255, 255, 0.4);
	p {
		margin: 5px 0;
	}
`;
