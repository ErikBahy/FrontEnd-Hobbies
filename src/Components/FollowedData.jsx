import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserFollowers } from "../apiCalls";
import xIcon from "../logos/Group 182.png";
import { getUserFollowed } from "../apiCalls";

function FollowedData({ userId }) {
  const [followed, setFollowed] = useState();
  console.log(userId, "mongoid  ", followed, "followers   ");
  console.log("modal rannnnnnnnn FOLLOWEDs");

  useEffect(() => {
    getUserFollowed(userId).then((followersss) => {
      setFollowed(followersss);
    });
  }, []);

  return (
    <Stack
      sx={{
        width: 400,
        height: 300,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 2,
        overflow: "hidden",
        overflowY: "scroll",
      }}
      alignItems="center"
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={10}
      >
        <IconButton>
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
        <Box></Box>
      </Stack>
      <Divider
        sx={{
          alignSelf: "center",
          width: 1,
          marginY: 1,
          fontWeight: 200,
        }}
      />
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
            sx={{
              bgcolor: `red`,
              textDecoration: "none",
              width: "30px",
              height: "30px",
              marginRight: "auto",
            }}
            aria-label="recipe"
          >
            {aFollower?.username.substring(0, 1)}
          </Avatar>

          <Typography
            sx={{ textDecoration: "none", color: "text.primary" }}
            marginRight={1}
            fontWeight={600}
          >
            {aFollower?.username}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

export default FollowedData;