import React from "react";
import NewPostModal from "../Components/NewPostModal";
import Feed from "../Components/Feed";
import Tags from "../Components/Tags";

function MainPage() {
  return (
    <>
      <Tags called="main" />
      <Feed />
      <NewPostModal />
    </>
  );
}

export default MainPage;
