import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./screen/Home";

function App() {
  return (
    <>
      <Header />
      <Home />
      <Outlet />
    </>
  );
}

export default App;
