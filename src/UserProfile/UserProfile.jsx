import { Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import Feed from "../Components/UserProfileFeed";
import UserDetails from "../Components/UserDetails";
import { Box, Divider, Chip, Skeleton } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import {
  checkFollow,
  getCurrentUserId,
  getMongoIdFromCognitoId,
} from "../apiCalls";
import Navbar from "../Components/Navbar";
import { useState } from "react";

function UserProfile() {
  const { cognitoId } = useParams();
  const userContext = useContext(UserContext);
  const { posts, bio, location } = userContext.user;
  const [effectRun, seteffectRun] = useState(false);
  const [dividerLoading, setdividerLoading] = useState(true);

  return (
    <>
      <Box sx={{ height: "100vh", backgroundColor: "background.myBackground" }}>
        <div>
          <Navbar called="userProfile" userId={cognitoId} />
        </div>

        <Stack pt={2} flexDirection="row" alignItems="center">
          <Box flex={1} sx={{ display: { xs: "none", md: "block" } }}></Box>
          <Stack flex={4} flexDirection="column" sx={{ backgroundColor: "" }}>
            <UserDetails
              setdividerLoading={setdividerLoading}
              seteffectRun={seteffectRun}
              effectRun={effectRun}
              userId={cognitoId}
              bio={bio}
              location={location}
            />

            {dividerLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: 1, marginTop: 3 }}
              />
            ) : (
              <Divider sx={{ width: 1, marginTop: 3, fontWeight: 200 }}>
                {" "}
                <Chip label={posts?.length + " " + " POSTS"} />
              </Divider>
            )}
            <Stack>
              {" "}
              <Feed
                seteffectRun={seteffectRun}
                effectRun={effectRun}
                called="UserProfile"
                cognitoId={cognitoId}
              />
            </Stack>
          </Stack>
          <Box flex={1} sx={{ display: { xs: "none", md: "block" } }}></Box>
        </Stack>
      </Box>
    </>
  );
}

export default UserProfile;
