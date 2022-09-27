import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import axios from "axios";

function UnFollowUsersLine({
  effect,
  aFollower,
  seteffect,
  _id,
  checkId,
  userDetailsEffect,
  setuserDetailsEffect,
}) {
  const removeFollower = async (e) => {
    e.preventDefault();

    try {
      await axios.get(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/unfollow/${aFollower._id}/${_id}`
      );

      seteffect(!effect);
      setuserDetailsEffect(!userDetailsEffect);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      flexDirection="row"
      alignSelf="flex-start"
      alignItems="center"
      justifyContent="flex-start"
      gap={2}
      width={1}
      padding={1}
    >
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <Avatar
          src={aFollower.prfilePicture}
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
      {checkId ? (
        <Button
          sx={{ marginLeft: "auto" }}
          color="error"
          onClick={(e) => {
            removeFollower(e, aFollower._id);
          }}
        >
          {" "}
          Remove
        </Button>
      ) : null}
    </Stack>
  );
}

export default UnFollowUsersLine;
