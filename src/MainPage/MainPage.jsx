import React, { useState } from "react";
import NewPostModal from "../Components/NewPostModal";
import Feed from "../Components/Feed";
import Tags from "../Components/Tags";
import Navbar from "../Components/Navbar";
import { Box } from "@mui/material";

function MainPage() {
  const [tag, setTag] = useState([]);
<<<<<<< HEAD
  const [navbarsearch, setnavbarsearch] = useState();
=======
  //const [navbarsearch, setnavbarsearch] = useState(second);
>>>>>>> 6b2f6aca3554a1eb37523d453ef8cc4dcca3979b
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
