import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserFollowers } from "../apiCalls";
import xIcon from "../logos/Group 182.png";
import axios from "axios";
import JoinedUsersLine from "./JoinedUsersLine";
import { MoonLoader } from "react-spinners";

function JoinedUsersData({ _id, getJoinedUsers, setJoinedUsers }) {
  const [joinedU, setJoinedU] = useState();
  const [effect, seteffect] = useState(false);
  const [userMongo, setuserMongo] = useState();
  const [loading, setloading] = useState(true);
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  console.log(_id, "mongoid  ", joinedU, "joinedd   ", userMongo, "userMongo");
  console.log("modal rannnnnnnnn JOINED");

  useEffect(() => {
    getJoinedUsers().then((joinedUsers) => {
      setJoinedU(joinedUsers);
      setloading(false);
    });
  }, [effect]);

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
        <IconButton onClick={() => setJoinedUsers(false)}>
          <img src={xIcon} height={20} width={20} />
        </IconButton>

        <Typography sx={{}} fontSize="14px" color="gray" textAlign="center">
          {`People Joined`}
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
        joinedU?.map((aFollower) => (
          <Stack width={1} sx={{ overflow: "hidden", overflowY: "scroll" }}>
            <JoinedUsersLine
              aFollower={aFollower}
              seteffect={seteffect}
              _id={_id}
              effect={effect}
            />
          </Stack>
        ))
      )}
    </Stack>
  );
}

export default JoinedUsersData;
