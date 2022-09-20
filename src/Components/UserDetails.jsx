import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import DescriptionIcon from "@mui/icons-material/Description";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  checkFollow,
  getCurrentUserId,
  getMongoIdFromCognitoId,
} from "../apiCalls";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserDetails({ userId, bio, effectRun }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const userContext = useContext(UserContext);
  const { username, followers } = userContext.user;
  const {
    isFollowed,
    setisFollowed,

    setuserMongoId,
    setcurrentUserMongoId,

    currentUserMongoId,
    userMongoId,
  } = userContext;

  const [followState, setfollowState] = useState(isFollowed);
  const [bioUpdate, setbioUpdate] = useState("");
  const [locationUpdate, setlocationUpdate] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const checkId = userId === userContext.currentUserId;
  const [runEffect, setrunEffect] = useState(false);
  console.log(bioUpdate, locationUpdate);

  console.log(
    userMongoId,
    " userMongo",
    currentUserMongoId,
    "currentUsermongo"
  );

  const updateUserInfo = async (e) => {
    e.preventDefault();
    await axios.patch(
      ` https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/user/put/${currentUserMongoId}`,
      { bio: bioUpdate, location: locationUpdate }
    );

    setOpen(false);
  };

  const follow = async (e, currentUserMongoId, userMongoId) => {
    e.preventDefault();

    const idk = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/followers/${currentUserMongoId}/${userMongoId}`
    );
    console.log(idk.data);
    if (runEffect) {
      setrunEffect(false);
    } else {
      setrunEffect(true);
    }
  };

  const unfollow = async (e, currentUserMongoId, userMongoId) => {
    e.preventDefault();

    const idk = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/unfollow/${currentUserMongoId}/${userMongoId}`
    );
    console.log(idk.data);
    if (runEffect) {
      setrunEffect(false);
    } else {
      setrunEffect(true);
    }
  };
  const renderFollowButton = (
    <>
      {checkId === false && isFollowed === false ? (
        <Button
          onClick={(e) => {
            follow(e, currentUserMongoId, userMongoId);
          }}
        >
          follow
        </Button>
      ) : checkId === false && isFollowed === true ? (
        <Button
          onClick={(e) => {
            unfollow(e, currentUserMongoId, userMongoId);
          }}
        >
          Unfollow
        </Button>
      ) : null}
    </>
  );
  useEffect(() => {
    userContext.getUserFromDatabase(userId);
    getMongoIdFromCognitoId(userId).then((id) => setuserMongoId(id));
    getCurrentUserId().then((id) =>
      getMongoIdFromCognitoId(id).then((mongoId) =>
        setcurrentUserMongoId(mongoId)
      )
    );
  }, [open, isFollowed, effectRun]);

  useEffect(() => {
    checkFollow(currentUserMongoId, userMongoId).then((bool) =>
      setisFollowed(bool)
    );
  }, [isFollowed, currentUserMongoId, userMongoId, runEffect]);

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        sx={{ backgroundColor: "" }}
        marginX={2}
      >
        <Stack flex={2}>
          <Avatar
            alt="Remy Sharp"
            src="https://wallpaperaccess.com/full/1890591.jpg"
            sx={{
              width: { xs: "75px", sm: "150px" },
              height: { xs: "75px", sm: "150px" },
            }}
          />
        </Stack>
        <Stack flex={1}></Stack>

        <Stack flex={4} flexDirection="row">
          <Stack flex={1} flexDirection="column" alignItems="center">
            {" "}
            {/*ky esh stacku Followers*/}
            <Typography
              sx={{
                color: "text.primary",
                fontWeight: 600,
                padding: 0,
              }}
              variant="p"
              component="span"
              fontWeight={100}
            >
              {followers?.length}
            </Typography>
            <Typography
              sx={{
                padding: 0,
              }}
              variant="p"
              component="span"
              fontWeight={100}
            >
              {followers?.length == 1 ? `Follower` : ` Followers `}
            </Typography>
          </Stack>
          <Stack flex={1}></Stack>
          <Stack flex={1} flexDirection="column" alignItems="center">
            {" "}
            {/*ky esh stacku Following*/}
            <Typography
              sx={{
                color: "text.primary",
                fontWeight: 600,
                padding: 0,
              }}
              variant="p"
              component="span"
              fontWeight={100}
            >
              {followers?.length}
            </Typography>
            <Typography
              sx={{
                padding: 0,
              }}
              variant="p"
              component="span"
              fontWeight={100}
            >
              {followers?.length == 1 ? `  Following` : `  Following `}
            </Typography>
          </Stack>
        </Stack>

        <Stack flex={1}></Stack>
      </Stack>
      <Stack flex={4} flexDirection="column" sx={{ backgroundColor: "" }}>
        <Stack
          flexDirection="row"
          sx={{ backgroundColor: "", paddingY: { xs: 1, sm: 3 } }}
        >
          <Typography
            sx={{
              paddingLeft: "8px",
              fontSize: "14px",
            }}
            variant="p"
            component="span"
            fontWeight={300}
          >
            {bio}
          </Typography>
        </Stack>
        <Stack
          justifyContent="space-around"
          alignItems="center"
          sx={{
            backgroundColor: "",
            paddingY: 0,
            paddingX: 1,
            fontSize: "12px",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography
            sx={{
              alignSelf: { xs: "flex-start", sm: "center" },
            }}
            variant="p"
            component="span"
            fontWeight={100}
          >
            JOINED SINCE 1997
          </Typography>
        </Stack>
      </Stack>
      <Stack flexDirection="row" justifyContent="center" marginTop={1}>
        {checkId === true ? (
          <Button
            size="medium"
            sx={{
              color: "text.primary",
              borderColor: "text.primary",
              width: 0.95,
            }}
            variant="outlined"
            onClick={handleOpen}
          >
            Edit Profile
          </Button>
        ) : (
          renderFollowButton
        )}{" "}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Stack
            spacing={0}
            sx={style}
            flexDirection="row"
            justifyContent="space-around"
            alignContent="center"
          >
            <Stack
              display="flex"
              flexdirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                sx={{ mb: 2, mr: 1 }}
                id="input-with-icon-textfield"
                label="Change your bio"
                value={bioUpdate}
                onChange={(e) => setbioUpdate(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              <TextField
                sx={{ mr: 1 }}
                id="input-with-icon-textfield"
                label="Change your location"
                onChange={(e) => setlocationUpdate(e.target.value)}
                value={locationUpdate}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EditLocationIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Stack>
            <Stack
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Button
                variant="outlined"
                onClick={(e) => updateUserInfo(e)}
                sx={{ borderRadius: 2, height: 40 }}
                startIcon={<CheckCircleOutlineIcon />}
              >
                Done
              </Button>
            </Stack>
          </Stack>
        </Modal>
      </Stack>
    </>
  );
}

export default UserDetails;
