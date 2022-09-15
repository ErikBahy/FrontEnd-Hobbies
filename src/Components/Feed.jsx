import { LineAxisOutlined } from "@mui/icons-material";
import { Box, Stack, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

const url = "https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com";

function Feed({ called }) {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const getAllPosts = async () => {
    //const res = await axios.get(`${url}/dev/allposts`);
    const res = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/allposts?page=${pageNumber}`
    );
    const data = res.data;

    let i = [];
    data.post.map((el) => i.push(el));

    setPosts(i);
    console.log(posts, " state from feed");
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // let a = [];
  // for (let i = 0; i < 100; i++) {
  //   a.push(i);
  // }
  return (
    <>
      <Stack flexDirection="row">
        <Box flex={2} sx={{ display: { xs: "none", sm: "block" } }}></Box>
        <Box flex={4}>
          {posts.map((el) => {
            return <Post post={el} />;
          })}
        </Box>
        <Box flex={2} sx={{ display: { xs: "none", sm: "block" } }}></Box>
      </Stack>
    </>
  );
}

export default Feed;
