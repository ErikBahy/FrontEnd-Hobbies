import React, { useState } from "react";
import NewPostModal from "../Components/NewPostModal";
import Feed from "../Components/Feed";
import Tags from "../Components/Tags";
import Navbar from "../Components/Navbar";
import { Box } from "@mui/material";

function MainPage() {
  const [tag, setTag] = useState([]);

  const [navbarsearch, setnavbarsearch] = useState();

  //const [navbarsearch, setnavbarsearch] = useState(second);

  console.log(tag, "from main page");
  return (
    <>
      <Box sx={{ backgroundColor: "background.myBackground" }}>
        <Navbar called="main" setnavbarsearch={setnavbarsearch} />
        <Tags called="main" tag={tag} setTag={setTag} />
        <Feed
          called="main"
          navbarsearch={navbarsearch}
          tag={tag}
          setTag={setTag}
        />
        <NewPostModal />
      </Box>
    </>
  );
}

export default MainPage;
