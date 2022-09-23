import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserFollowers } from "../apiCalls";
import xIcon from "../logos/Group 182.png";

function UserSearchModal({ usersFound }) {
  return (
    <Stack
      sx={{
        width: 1,
        height: 300,
        backgroundColor: "white",

        padding: 2,
        overflow: "hidden",
        overflowY: "scroll",
      }}
      alignItems="flex-start"
    >
      <Typography
        sx={{ marginRight: "10%" }}
        fontSize="16px"
        color="gray"
        textAlign="center"
      >
        Results
      </Typography>

      {usersFound?.map((aUser) => (
        <Stack
          flexDirection="row"
          alignSelf="flex-start"
          alignItems="center"
          justifyContent="flex-start"
          gap={2}
          padding={1}
          sx={{ textDecoration: "none" }}
          component={Link}
          to={`/userprofile/${aUser.userCognitoId}`}
        >
          <Avatar
            src={aUser.prfilePicture}
            sx={{
              bgcolor: `red`,
              textDecoration: "none",
              width: "30px",
              height: "30px",
              marginRight: "auto",
            }}
            aria-label="recipe"
          >
            {aUser?.username.substring(0, 1)}
          </Avatar>

          <Typography
            sx={{ textDecoration: "none", color: "text.primary" }}
            marginRight={1}
            fontWeight={600}
          >
            {aUser?.username}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

export default UserSearchModal;
