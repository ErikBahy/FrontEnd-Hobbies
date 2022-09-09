import { Box, Stack,Button } from "@mui/material";
import React from "react";
import Post from "../Components/Post";

function Feed() {

  return (
    <>
      <Stack flexDirection="row">
        <Box flex={2} sx={{ display: { xs: "none", sm: "block" } }}></Box>
        <Box flex={4}>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </Box>
        <Box flex={2} sx={{ display: { xs: "none", sm: "block" } }}></Box>
      </Stack>
    </>
  );
}

export default Feed;
