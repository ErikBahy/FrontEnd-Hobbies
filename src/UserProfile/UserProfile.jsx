import { Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import Feed from "../Components/UserProfileFeed";
import UserDetails from "../Components/UserDetails";
import { Box, Divider, Chip } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import {
  checkFollow,
  getCurrentUserId,
  getMongoIdFromCognitoId,
} from "../apiCalls";
import Navbar from "../Components/Navbar";

function UserProfile() {
  const { cognitoId } = useParams();
  const userContext = useContext(UserContext);
  const { posts } = userContext.user;
  const {
    setuserMongoId,
    setcurrentUserMongoId,
    currentUserMongoId,
    userMongoId,
    setisFollowed,
    isFollowed,
  } = userContext;

  useEffect(() => {
    userContext.getUserFromDatabase(cognitoId);
    getMongoIdFromCognitoId(cognitoId).then((id) => setuserMongoId(id));
    getCurrentUserId().then((id) =>
      getMongoIdFromCognitoId(id).then((mongoId) =>
        setcurrentUserMongoId(mongoId)
      )
    );
    checkFollow(currentUserMongoId, userMongoId).then((bool) =>
      setisFollowed(bool)
    );
  }, [cognitoId]);

  return (
    <>
      <div>
        <Navbar called="userProfile" />
      </div>
      <div>
        <Stack mt={2} flexDirection="row" justifyContent="space-between">
          <Box flex={1} sx={{ display: { xs: "none", md: "block" } }}></Box>
          <Stack
            flex={4}
            flexDirection="row"
            sx={{ backgroundColor: "", flexWrap: "wrap", alignItems: "center" }}
          >
            <UserDetails userId={cognitoId} />
            <Divider sx={{ width: 1, marginTop: 3, fontWeight: 200 }}>
              {" "}
              <Chip label={posts?.length + " " + " POSTS"} />
            </Divider>
            <Stack>
              {" "}
              <Feed called="UserProfile" cognitoId={cognitoId} />
            </Stack>
          </Stack>
          <Box flex={1} sx={{ display: { xs: "none", md: "block" } }}></Box>
        </Stack>
      </div>
    </>
  );
}

export default UserProfile;
