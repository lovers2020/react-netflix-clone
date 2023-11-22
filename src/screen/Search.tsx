import { useQueries } from "react-query";
import { useMatch, useSearchParams } from "react-router-dom";
import { getSearch } from "../api";
import Slide from "../components/Slide";
import { useEffect } from "react";
import styled from "styled-components";
import { SlideContainer } from "../styles/HomeStyle";
import { AnimatePresence } from "framer-motion";
import MovieDetail from "../components/MovieDetail";

const SearchWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 110vh;
	background-color: transparent;
`;
const InnerWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 30vh;
	background-color: transparent;
`;
const NoresultContainer = styled.div`
	height: 100px;
	font-size: 36px;
	font-weight: 700;
	position: absolute;
	top: 11rem;
	left: 2rem;
`;

export default function Search() {
	const [searchParams] = useSearchParams();
	const keyword = searchParams.get("keyword");
	const searchData = useQueries(
		[1, 2, 3, 4].map((page) => ({
			queryKey: ["data", page],
			queryFn: () => getSearch(keyword + "", page),
		}))
	);
	const isLoading = [0, 1, 2, 3]
		.map((current) => searchData[current].isFetched)
		.find((current) => (current ? true : false));
	const isData = [0, 1, 2, 3]
		.map((current) => searchData[current].data?.total_results)
		.find((current) => (current === 0 ? false : true));

	useEffect(() => {
		[0, 1, 2, 3].map((i) => searchData[i].refetch());
		searchData[0].refetch();
	}, [keyword]);

	return (
		<>
			<SearchWrapper>
				<InnerWrapper></InnerWrapper>
				{!isLoading ? (
					"Loading...."
				) : !isData ? (
					<NoresultContainer>
						"{keyword}" has no result......
					</NoresultContainer>
				) : (
					<>
						<SlideContainer>
							<Slide
								data={searchData[0].data}
								title={`"${keyword}" Search Result`}
								category="search"
							></Slide>
						</SlideContainer>
						<SlideContainer>
							<Slide
								data={searchData[1].data}
								title={""}
								category="search"
							></Slide>
						</SlideContainer>
						<SlideContainer>
							<Slide
								data={searchData[2].data}
								title={""}
								category="search"
							></Slide>
						</SlideContainer>
						<SlideContainer>
							<Slide
								data={searchData[3].data}
								title={""}
								category="search"
							></Slide>
						</SlideContainer>
					</>
				)}
			</SearchWrapper>
		</>
	);
}
