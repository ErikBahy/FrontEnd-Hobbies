import { Skeleton, Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getMongoIdFromCognitoId } from "../apiCalls";
import { Auth } from "aws-amplify";

const url = "https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com";

function Feed({ cognitoId, seteffectRun, effectRun, tabValue, settabValue }) {
  const userContext = useContext(UserContext);
  const { posts } = userContext.user;
  const [userProfileFeedEffect, setuserProfileFeedEffect] = useState(false);
  const [loading, setloading] = useState(true);

  const [userPosts, setUserPosts] = useState([]);
  const getUserPosts = async (mongoId) => {
    const userAuth = await Auth.currentAuthenticatedUser();
    const token = userAuth.signInUserSession.idToken.jwtToken;
    const requestInfo = {
      headers: {
        Authorization: token,
      },
    };

    setloading(true);
    const endpoint =
      tabValue === "MyPosts"
        ? `${url}/dev/posts/user/${mongoId}`
        : `${url}/dev/postsJoined/${mongoId}`;
    try {
      const res = await axios.get(endpoint, requestInfo);
      const data = res.data;

      setUserPosts(data);
      setloading(false);
    } catch (error) {}
  };
  const renderPosts = userPosts
    .slice(0)
    .reverse()
    .map((el) => {
      return (
        <Post
          settabValue={settabValue}
          userProfileFeedEffect={userProfileFeedEffect}
          setuserProfileFeedEffect={setuserProfileFeedEffect}
          seteffectRun={seteffectRun}
          effectRun={effectRun}
          called="userProfile"
          post={el}
        />
      );
    });
  useEffect(() => {
    getMongoIdFromCognitoId(cognitoId).then((id) => getUserPosts(id));
  }, [effectRun, userProfileFeedEffect, tabValue]);

  return (
    <Stack flex={8} marginBottom={userPosts?.length > 3 ? 12 : 0}>
      {loading ? (
        <Stack
          sx={{ height: "100vh" }}
          my={1}
          marginX={1}
          padding={1}
          spacing={1}
        >
          <Skeleton variant="rectangular" height={300} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        renderPosts
      )}
    </Stack>
  );
}

export default Feed;
