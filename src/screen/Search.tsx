import { useLocation, useSearchParams } from "react-router-dom";

export default function Search() {
	const location = useLocation();
	const [searchParams, _] = useSearchParams();
	const keyword = searchParams.get("keyword");
	console.log(location);
	console.log(keyword);
	return null;
}
