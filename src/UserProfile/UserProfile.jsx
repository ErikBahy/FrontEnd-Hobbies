import { Stack } from "@mui/system";
import React from "react";
import Feed from "../Components/UserProfileFeed";
import LeftBar from "../Components/LeftBar";
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";
import RightBar from "../Components/RightBar";
import UserDetails from "../Components/UserDetails";
import { Box } from "@mui/material";

function UserProfile() {
  return (
    <>
      <Navbar />
      <Stack flexDirection="row" justifyContent="space-between">
        <Box
          flex={1}
          sx={{ backgroundColor: "red", display: { xs: "none", md: "block" } }}
        >
          bahy
        </Box>
        <Stack
          flex={4}
          flexDirection="row"
          sx={{ backgroundColor: "", flexWrap: "wrap" }}
        >
          <UserDetails />
        </Stack>
        <Box
          flex={1}
          sx={{ backgroundColor: "gray", display: { xs: "none", md: "block" } }}
        >
          bahy
        </Box>
      </Stack>
    </>
  );
}

export default UserProfile
