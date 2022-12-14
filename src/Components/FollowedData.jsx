import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import xIcon from "../logos/Group 182.png";
import { getUserFollowed } from "../apiCalls";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function FollowedData({
  userId,
  setFollowedU,
  followedEffect,
  setfollowedEffect,
  seteffectRun,
  effectRun,
  settabValue,
  tabValue,
}) {
  const [followed, setFollowed] = useState();
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const handleNavigateClick = (cognitoId) => {
    setFollowedU(false);
    setfollowedEffect(!followedEffect);
    seteffectRun(!effectRun);
    settabValue("MyPosts");

    navigate(`/userprofile/${cognitoId}`);
  };

  useEffect(() => {
    getUserFollowed(userId).then((followersss) => {
      setFollowed(followersss);
      setloading(false);
    });
  }, []);
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <Stack
      sx={{
        width: 400,
        height: 300,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 2,
        margin: { xs: 2 },
      }}
      alignItems="center"
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={10}
      >
        <IconButton onClick={() => setFollowedU(false)}>
          <img src={xIcon} height={20} width={20} />
        </IconButton>

        <Typography
          sx={{ marginRight: "10%" }}
          fontSize="16px"
          color="gray"
          textAlign="center"
        >
          Following
        </Typography>
        <Box> </Box>
      </Stack>
      <Divider
        sx={{
          alignSelf: "center",
          width: 1,
          marginY: 1,
          fontWeight: 200,
        }}
      />
      {loading ? (
        <div style={style}>
          <MoonLoader color="grey" loading speedMultiplier={1} />
        </div>
      ) : (
        <Stack width={1} sx={{ overflow: "hidden", overflowY: "scroll" }}>
          {followed?.map((aFollower) => (
            <Stack
              flexDirection="row"
              alignSelf="flex-start"
              alignItems="center"
              justifyContent="flex-start"
              gap={2}
              padding={1}
            >
              <Avatar
                onClick={(e) => handleNavigateClick(aFollower?.userCognitoId)}
                src={aFollower.prfilePicture}
                sx={{
                  bgcolor: `red`,
                  textDecoration: "none",
                  width: "30px",
                  height: "30px",
                  marginRight: "auto",
                  "& :hover": { cursor: "pointer" },
                }}
                aria-label="recipe"
              >
                {aFollower?.username.substring(0, 1)}
              </Avatar>

              <Typography
                onClick={(e) => handleNavigateClick(aFollower?.userCognitoId)}
                sx={{ textDecoration: "none", color: "text.primary" }}
                marginRight={1}
                fontWeight={600}
              >
                {aFollower?.username}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default FollowedData;
