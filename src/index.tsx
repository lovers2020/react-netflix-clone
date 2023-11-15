import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

const GlobalStyle = createGlobalStyle`
${reset}
body { 
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  font-family: 'Noto Sans'; 
  color: black;
  
  
}
  * {
    box-sizing:border-box;
  }
  a {
    text-decoration:none;
    color:inherit;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}></RouterProvider>?
    </ThemeProvider>
  </RecoilRoot>
);

reportWebVitals();
