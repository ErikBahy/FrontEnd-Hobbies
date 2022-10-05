import { Stack } from "@mui/system";
import React, { useContext } from "react";
import Feed from "../Components/UserProfileFeed";
import UserDetails from "../Components/UserDetails";
import { Box, Divider, Skeleton, Tabs, Tab, Chip } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import NewPostModal from "../Components/NewPostModal";

function UserProfile() {
  const { cognitoId } = useParams();
  const userContext = useContext(UserContext);
  const { posts, bio, location } = userContext.user;
  const [effectRun, seteffectRun] = useState(false);
  const [dividerLoading, setdividerLoading] = useState(true);
  const [tabValue, settabValue] = useState("MyPosts");
  const [noPosts, setnoPosts] = useState(false);

  const check = cognitoId === userContext.currentUserId;
  const handleChange = (event, newValue) => {
    settabValue(newValue);
    setnoPosts(false);
  };

  return (
    <>
      <Box sx={{ height: "100vh", backgroundColor: "background.myBackground" }}>
        <div>
          <Navbar called="userProfile" userId={cognitoId} />
        </div>

        <Stack pt={2} flexDirection="row" alignItems="center">
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              flex: { sm: 1, md: 2 },
            }}
          ></Box>
          <Stack flex={4} flexDirection="column" sx={{ backgroundColor: "" }}>
            <UserDetails
              setdividerLoading={setdividerLoading}
              seteffectRun={seteffectRun}
              effectRun={effectRun}
              userId={cognitoId}
              bio={bio}
              location={location}
              settabValue={settabValue}
              tabValue={tabValue}
            />

            {dividerLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: 1, marginTop: 3 }}
              />
            ) : (
              <Divider sx={{ width: 1, marginTop: 3, fontWeight: 200 }}>
                {check ? (
                  <Tabs
                    sx={{ zIndex: 5 }}
                    textColor="text"
                    indicatorColor="primary"
                    aria-label="tabs "
                    centered
                    value={tabValue}
                    onChange={handleChange}
                  >
                    <Tab
                      sx={{ padding: "0px", marginX: "4px" }}
                      component="p"
                      value="MyPosts"
                      label="My Posts"
                    />
                    <Tab
                      sx={{ padding: "0px", marginX: "4px" }}
                      component="p"
                      value="JoinedPosts"
                      label="Joined Events"
                    />
                  </Tabs>
                ) : (
                  <>{`${userContext?.user?.username} Posts `}</>
                )}
              </Divider>
            )}
            <Stack>
              {" "}
              <Feed
                setnoPosts={setnoPosts}
                noPosts={noPosts}
                settabValue={settabValue}
                tabValue={tabValue}
                seteffectRun={seteffectRun}
                effectRun={effectRun}
                called="UserProfile"
                cognitoId={cognitoId}
              />
            </Stack>
          </Stack>
          <Box
            flex={2}
            sx={{
              display: { xs: "none", sm: "block" },
              flex: { sm: 1, md: 2 },
            }}
          ></Box>
        </Stack>
        <NewPostModal called="UserProfile" />
      </Box>
    </>
  );
}

export default UserProfile;
