import React, { useState } from "react";
import NewPostModal from "../Components/NewPostModal";
import Feed from "../Components/Feed";
import Tags from "../Components/Tags";
import Navbar from "../Components/Navbar";

function MainPage() {
  const [tag, setTag] = useState([]);
  console.log(tag, "from main page");
  return (
    <>
      <div>
        <Navbar called="main" />
      </div>
      <div>
        <Tags called="main" tag={tag} setTag={setTag} />
        <Feed called="main" />
        <NewPostModal />
      </div>
    </>
  );
}

export default MainPage;
