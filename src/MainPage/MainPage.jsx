import React, { useState } from "react";
import NewPostModal from "../Components/NewPostModal";
import Feed from "../Components/Feed";
import Tags from "../Components/Tags";

function MainPage() {
  const [tag, setTag] = useState([]);
  console.log(tag, "from main page");
  return (
    <>
      <Tags called="main" tag={tag} setTag={setTag} />
      <Feed called="main" />
      <NewPostModal />
    </>
  );
}

export default MainPage;
