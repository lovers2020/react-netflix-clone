import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Tv from "../screen/Tv";
import Search from "../screen/Search";
import Home from "../screen/Home";

export const router = createBrowserRouter([
	{
		path: "",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/movies/:movieId",
				element: <Home />,
			},
			{
				path: "/tv",
				element: <Tv />,
			},
			{
				path: "/tv/:tvId",
				element: <Tv />,
			},
			{
				path: "/search",
				element: <Search />,
			},
		],
	},
]);
