import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
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
  const { posts, bio, location } = userContext.user;
  const [effectRun, seteffectRun] = useState(false);

  return (
    <>
      <div>
        <Navbar called="userProfile" userId={cognitoId} />
      </div>
      <div>
        <Stack mt={2} flexDirection="row" justifyContent="space-between">
          <Box flex={1} sx={{ display: { xs: "none", md: "block" } }}></Box>
          <Stack
            flex={4}
            flexDirection="row"
            sx={{ backgroundColor: "", flexWrap: "wrap", alignItems: "center" }}
          >
            <UserDetails
              seteffectRun={seteffectRun}
              effectRun={effectRun}
              userId={cognitoId}
              bio={bio}
              location={location}
            />
            <Divider sx={{ width: 1, marginTop: 3, fontWeight: 200 }}>
              {" "}
              <Chip label={posts?.length + " " + " POSTS"} />
            </Divider>
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
      </div>
    </>
  );
}

export default UserProfile;
