import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { QueryClient, QueryClientProvider } from "react-query";

const GlobalStyle = createGlobalStyle`
    ${reset} 
    body {       
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 16px; 
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-weight: 300;
        line-height: 1.2;
        background-color: #141414;
        color: ${(props) => props.theme.white.dakrer};
        height: 200vh;
        overflow-x: hidden;     
    }
    * {
        box-sizing:border-box;
    }
    a {
        text-decoration:none;
        color:inherit;
    }
`;
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<RecoilRoot>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<RouterProvider router={router}></RouterProvider>
			</ThemeProvider>
		</QueryClientProvider>
	</RecoilRoot>
);
