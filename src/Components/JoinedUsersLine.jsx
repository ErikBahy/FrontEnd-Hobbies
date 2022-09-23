import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import axios from "axios";

function JoinedUsersLine({ effect, aFollower, seteffect, _id }) {
  const unjoinPost = async (e, joinedUserId) => {
    e.preventDefault();

    try {
      await axios.get(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/unjoinPost/${aFollower._id}/${_id}`
      );

      seteffect(!effect);
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
      padding={1}
    >
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
      <Button
        color="error"
        onClick={(e) => {
          unjoinPost(e, aFollower._id);
        }}
      >
        {" "}
        Delete
      </Button>
    </Stack>
  );
}

export default JoinedUsersLine;
