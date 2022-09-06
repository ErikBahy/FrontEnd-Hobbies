import { Stack } from "@mui/system";
import React from "react";
import Feed from "./Components/Feed";
import LeftBar from "./Components/LeftBar";
import Navbar from "./Components/Navbar";
import Post from "./Components/Post";
import RightBar from "./Components/RightBar";

function UserProfile() {
  return (
    <>
      <Navbar />
      <LeftBar />
      <Stack
        direction="row"
        spacing={2}
        sx={{ position: "relative" }}
        justifyContent="space-between"
      >
        <Feed />
      </Stack>
    </>
  );
}

export default UserProfile;
