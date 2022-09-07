import { Stack } from "@mui/material";
import React from "react";
import Navbar from "../Components/Navbar";
import Feed from "./Feed";
import Tags from "./Tags";

function MainPage() {
  return (
    <>
      <Navbar />
      <Tags />
      <Feed />
    </>
  );
}

export default MainPage;
