import React from "react";
import Navbar from "../Components/Navbar";
import NewPostModal from "../Components/NewPostModal";
import Feed from "./Feed";
import Tags from "./Tags";

function MainPage() {
  return (
    <>
      <Navbar />
      <Tags />
      <Feed />
      <NewPostModal />
    </>
  );
}

export default MainPage;
