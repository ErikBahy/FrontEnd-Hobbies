import { Box, Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getMongoIdFromCognitoId } from "../apiCalls";

const url = "https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com";

function Feed({ cognitoId }) {
  const userContext = useContext(UserContext);

  const [userPosts, setUserPosts] = useState([]);
  const getUserPosts = async (mongoId) => {
    const res = await axios.get(`${url}/dev/posts/user/${mongoId}`);
    const data = res.data;
    console.log(data, "user post data from mongo id");
    setUserPosts(data);
  };
  useEffect(() => {
    getMongoIdFromCognitoId(cognitoId).then((id) => getUserPosts(id));
  }, []);

  return (
    <Stack flex={8}>
      {userPosts.map((el) => {
        return <Post called="userProfile" post={el} />;
      })}
    </Stack>
  );
}

export default Feed;
