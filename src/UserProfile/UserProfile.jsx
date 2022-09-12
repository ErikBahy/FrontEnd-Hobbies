import { Stack } from "@mui/system";
import React, { useContext } from "react";
import Feed from "../Components/UserProfileFeed";
import LeftBar from "../Components/LeftBar";
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";
import RightBar from "../Components/RightBar";
import UserDetails from "../Components/UserDetails";
import { Box, Divider, Chip } from "@mui/material";
import { UserContext } from "../contexts/UserContext";

function UserProfile() {
  const userContext = useContext(UserContext);
  const { posts } = userContext.user;
  return (
    <>
      <Stack flexDirection="row" justifyContent="space-between">
        <Box flex={1} sx={{ display: { xs: "none", md: "block" } }}></Box>
        <Stack
          flex={4}
          flexDirection="row"
          sx={{ backgroundColor: "", flexWrap: "wrap", alignItems: "center" }}
        >
          <UserDetails />
          <Divider sx={{ width: 1, marginTop: 3, fontWeight: 200 }}>
            {" "}
            <Chip label={posts + " " + " POSTS"} />
          </Divider>
          <Stack>
            {" "}
            <Feed />
          </Stack>
        </Stack>
        <Box flex={1} sx={{ display: { xs: "none", md: "block" } }}></Box>
      </Stack>
    </>
  );
}

export default UserProfile;
