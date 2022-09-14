import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import { useState } from "react";

const url = "https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com";

function Feed() {
  const [userPosts, setUserPosts] = useState([]);
  const getUserPosts = async () => {
    const res = await axios.get(
      `${url}/dev/posts/user/630f428ddf5233796ac5cde1`
    );
    const data = res.data;
    setUserPosts(data);
  };
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <Stack flex={8}>
      {userPosts.map((el) => {
        return <Post post={el} />;
      })}
    </Stack>
  );
}

export default Feed;
