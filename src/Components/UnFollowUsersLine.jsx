import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

function UnFollowUsersLine({
  effect,
  aFollower,
  seteffect,
  _id,
  checkId,
  userDetailsEffect,
  setuserDetailsEffect,
  followedEffect,
  setfollowedEffect,
  seteffectRun,
  effectRun,
  setFollowersU,
  settabValue,
  tabValue,
}) {
  const navigate = useNavigate();
  const handleNavigateClick = (cognitoId) => {
    setFollowersU(false);
    setfollowedEffect(!followedEffect);
    seteffectRun(!effectRun);
    settabValue("MyPosts");

    navigate(`/userprofile/${cognitoId}`);
  };

  const removeFollower = async (e) => {
    e.preventDefault();

    try {
      const userAuth = await Auth.currentAuthenticatedUser();
      const token = userAuth.signInUserSession.idToken.jwtToken;
      const requestInfo = {
        headers: {
          Authorization: token,
        },
      };
      await axios.get(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/unfollow/${aFollower._id}/${_id}`,
        requestInfo
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
          onClick={(e) => handleNavigateClick(aFollower?.userCognitoId)}
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
          onClick={(e) => handleNavigateClick(aFollower?.userCognitoId)}
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
