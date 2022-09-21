import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserFollowers } from "../apiCalls";

function FollowersData({ userId }) {
  const [followers, setFollowers] = useState();
  console.log(userId, "mongoid  ", followers, "followers   ");
  console.log("modal rannnnnnnnn");

  useEffect(() => {
    getUserFollowers(userId).then((followersss) => {
      setFollowers(followersss);
    });
  }, []);

  return (
    <Stack
      flexDirection="row"
      sx={{ width: 300, height: 500, backgroundColor: "white" }}
      alignItems="center"
    >
      {followers?.map((aFollower) => (
        <Typography
          sx={{ textDecoration: "none", color: "text.primary" }}
          marginRight={1}
          fontWeight={600}
        >
          {aFollower?.username}
        </Typography>
      ))}
    </Stack>
  );
}

export default FollowersData;
