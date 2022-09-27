import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUserId,
 
  updateUserInfo,
} from "../apiCalls";
import { UserContext } from "../contexts/UserContext";
import xIcon from "../logos/Group 182.png";
import FileBase from "react-file-base64";

function EditProfile({
  called,
  setOpen,
  userDetailsEffect,
  setuserDetailsEffect,
}) {
  console.log(called, "called");
  const userContext = useContext(UserContext);
  const myUser = userContext.user;
  const { username, prfilePicture, followers, followed } = userContext.user;
  const [cognitoId, setcognitoId] = useState();
  const [newLocation, setnewLocation] = useState("");
  const [newBio, setnewBio] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    console.log("navigate ran");
    navigate(`/userprofile/${cognitoId}`);
  };
  console.log(myUser, "myUser here");
  console.log(newBio, newLocation);
  const handleSave = (e) => {
    try {
      e.preventDefault();
      updateUserInfo(myUser._id, newBio, newLocation, newProfilePicture);
      handleNavigateClick();
      if (called === "userdetails") {
        setOpen(false);
        setuserDetailsEffect(!userDetailsEffect);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUserId().then((userId) => {
      setcognitoId(userId);
      userContext.getUserFromDatabase(userId);
    });
  }, []);

  return (
    <Stack
      color="text.primary"
      borderRadius={5}
      p={3}
      sx={{ backgroundColor: "background.myBackground", paddingTop: 2 }}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <IconButton
          onClick={
            called === "userdetails"
              ? () => setOpen(false)
              : () => handleNavigateClick()
          }
        >
          <img src={xIcon} height={20} width={20} />
        </IconButton>

        <Typography
          sx={{ marginRight: "10%" }}
          fontSize="16px"
          color="gray"
          textAlign="center"
        >
          Edit Profile
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
      <Stack gap={2} my={1} alignItems="center">
        <Avatar sx={{ width: 90, height: 90 }} src={prfilePicture} />

        <Typography
          fontWeight={500}
          color="primary"
          fontSize="16px"
          variant="span"
          alignSelf="center !important"
        >
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setNewProfilePicture(base64)}
          />
        </Typography>
      </Stack>
      <TextField
        id="outlined-number"
        sx={{ marginY: 2 }}
        size="small"
        placeholder={myUser?.bio}
        onChange={(e) => setnewBio(e.target.value)}
        value={newBio}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography fontSize={14} sx={{ color: "text.secondary" }}>
                {" "}
                BIO
              </Typography>
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <TextField
        id="outlined-number"
        size="small"
        value={newLocation}
        placeholder={myUser?.location}
        onChange={(e) => setnewLocation(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography fontSize={14} sx={{ color: "text.secondary" }}>
                {" "}
                Location
              </Typography>
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <Button
        variant="contained"
        onClick={(e) => {
          handleSave(e);
        }}
        size="large"
        color="primary"
        sx={{ width: "100%", marginY: 3 }}
      >
        Save
      </Button>
    </Stack>
  );
}

export default EditProfile;
