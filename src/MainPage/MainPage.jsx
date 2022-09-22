import React, { useState } from "react";
import NewPostModal from "../Components/NewPostModal";
import Feed from "../Components/Feed";
import Tags from "../Components/Tags";
import Navbar from "../Components/Navbar";
import { Box, Skeleton, Stack } from "@mui/material";
import { DotLoader } from "react-spinners";

function MainPage() {
  const [tag, setTag] = useState([]);
  const [loading, setloading] = useState(true);
  const [effectRunFromModal, seteffectRunFromModal] = useState(false);

  const [navbarsearch, setnavbarsearch] = useState("");
  setTimeout(() => {
    setloading(false);
  }, [3000]);

  console.log(tag, "from main page");
  return (
    <>
      <Box sx={{ backgroundColor: "background.myBackground" }}>
        <Navbar called="main" />
        <Tags called="main" tag={tag} setTag={setTag} />

        {loading ? (
          <Stack sx={{ height: "100vh" }} spacing={1}>
            <Skeleton variant="text" height={100} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="rectangular" height={300} />
          </Stack>
        ) : (
          <>
            <Feed
              called="main"
              effectRunFromModal={effectRunFromModal}
              seteffectRunFromModal={seteffectRunFromModal}
              tag={tag}
              setTag={setTag}
            />
            <NewPostModal
              effectRunFromModal={effectRunFromModal}
              seteffectRunFromModal={seteffectRunFromModal}
            />
          </>
        )}
      </Box>
    </>
  );
}

export default MainPage;
