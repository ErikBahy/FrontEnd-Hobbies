import { Box, Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getMongoIdFromCognitoId } from "../apiCalls";

const url = "https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com";

function Feed({ cognitoId, seteffectRun, effectRun }) {
  const userContext = useContext(UserContext);
  const { posts } = userContext.user;
  const [userProfileFeedEffect, setuserProfileFeedEffect] = useState(false);

  const [userPosts, setUserPosts] = useState([]);
  const getUserPosts = async (mongoId) => {
    const res = await axios.get(`${url}/dev/posts/user/${mongoId}`);
    const data = res.data;
    console.log(data, "user post data from mongo id");
    setUserPosts(data);
  };
  useEffect(() => {
    getMongoIdFromCognitoId(cognitoId).then((id) => getUserPosts(id));
  }, [effectRun, userProfileFeedEffect]);

  return (
    <Stack flex={8}>
      {userPosts.map((el) => {
        return (
          <Post
            userProfileFeedEffect={userProfileFeedEffect}
            setuserProfileFeedEffect={setuserProfileFeedEffect}
            seteffectRun={seteffectRun}
            effectRun={effectRun}
            called="userProfile"
            post={el}
          />
        );
      })}
    </Stack>
  );
}

export default Feed;
