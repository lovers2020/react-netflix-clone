import { useQuery } from "react-query";
import { getMovies, IMovieResult } from "../api";
import styled from "styled-components";

const Wrapper = styled.div`
	background-color: black;
`;
const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Banner = styled.div`
	height: 100vh;
	background-color: red;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
`;
const Title = styled.h2`
	font-size: 68px;
	margin-bottom: 1rem;
`;
const Overview = styled.p`
	font-size: 36px;
	width: 50%;
`;
export default function Home() {
	const { data, isLoading } = useQuery<IMovieResult>(
		["movies", "now_playing"],
		getMovies
	);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading....</Loader>
			) : (
				<>
					<Banner>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
				</>
			)}
		</Wrapper>
	);
}
