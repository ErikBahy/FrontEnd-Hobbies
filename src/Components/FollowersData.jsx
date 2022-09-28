import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { loadingBar } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { getUserFollowers } from "../apiCalls";
import xIcon from "../logos/Group 182.png";
import UnFollowUsersLine from "./UnFollowUsersLine";

function FollowersData({
  _id,
  userId,
  setFollowersU,
  checkId,
  userDetailsEffect,
  setuserDetailsEffect,
}) {
  const [followers, setFollowers] = useState();
  const [loading, setloading] = useState(true);
  const [effect, seteffect] = useState(false);
  const [userMongo, setuserMongo] = useState();
  console.log(
    userId,
    "mongoid  !!!!!!",
    followers,
    "followers!!!!   ",
    userMongo,
    "userMongo"
  );
  console.log("modal rannnnnnnnn followers");

  useEffect(() => {
    getUserFollowers(userId).then((followersss) => {
      setFollowers(followersss);
      setloading(false);
    });
  }, [effect]);

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
        <IconButton onClick={() => setFollowersU(false)}>
          <img src={xIcon} height={20} width={20} />
        </IconButton>

        <Typography
          sx={{ marginRight: "10%" }}
          fontSize="16px"
          color="gray"
          textAlign="center"
        >
          Followers
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
      {loading ? (
        <div style={style}>
          <MoonLoader color="grey" loading speedMultiplier={1} />
        </div>
      ) : (
        <Stack width={1} sx={{ overflow: "hidden", overflowY: "scroll" }}>
          {followers?.map((aFollower) => (
            <UnFollowUsersLine
              userDetailsEffect={userDetailsEffect}
              setuserDetailsEffect={setuserDetailsEffect}
              checkId={checkId}
              aFollower={aFollower}
              seteffect={seteffect}
              _id={userId}
              effect={effect}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default FollowersData;
