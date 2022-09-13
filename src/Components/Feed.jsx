import { LineAxisOutlined } from "@mui/icons-material";
import { Box, Stack, Button } from "@mui/material";
import React, { useState } from "react";
import Post from "./Post";
import axios from "axios";

const url = "https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com";

function Feed() {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const res = await axios.get();
  };

  // let a = [];
  // for (let i = 0; i < 100; i++) {
  //   a.push(i);
  // }
  return (
    <>
      <Stack flexDirection="row">
        <Box flex={2} sx={{ display: { xs: "none", sm: "block" } }}></Box>
        <Box flex={4}>
          {a.map((el) => {
            return <Post />;
          })}
        </Box>
        <Box flex={2} sx={{ display: { xs: "none", sm: "block" } }}></Box>
      </Stack>
    </>
  );
}

export default Feed;
