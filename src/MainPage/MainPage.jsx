import React from "react";
import Navbar from "../Components/Navbar";
import NewPostModal from "../Components/NewPostModal";
import Feed from "../Components/Feed";
import Tags from "../Components/Tags";

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
