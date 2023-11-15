import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: "<App />",
  },
  {
    path: "/tv",
    element: "<Tv />",
  },
  {
    path: "/search",
    element: "<Search />",
  },
]);
