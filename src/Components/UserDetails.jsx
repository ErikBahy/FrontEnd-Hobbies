import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  Modal,
  Skeleton,
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

////////////////////////

import FollowersData from "./FollowersData";
import FollowedData from "./FollowedData";
///////////////////////

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import EditProfileModal from "../EditProfile/EditProfileModal";
import EditProfile from "../EditProfile/EditProfile";

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

function UserDetails({ userId, bio, effectRun, setdividerLoading }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const userContext = useContext(UserContext);
  const { username, followers, followed } = userContext.user;
  const {
    isFollowed,
    setisFollowed,

    setuserMongoId,
    setcurrentUserMongoId,

    currentUserMongoId,
    userMongoId,
  } = userContext;
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    console.log("navigate ran");
    navigate(`/editprofile`);
  };
  const [followState, setfollowState] = useState(isFollowed);
  const [bioUpdate, setbioUpdate] = useState("");
  const [locationUpdate, setlocationUpdate] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFollowedUModalClose = () => setFollowedU(false);
  const handleFollowersUModalClose = () => setFollowersU(false);
  const checkId = userId === userContext.currentUserId;
  const [runEffect, setrunEffect] = useState(false);
  console.log(bioUpdate, locationUpdate);
  const [loading, setloading] = useState(true);

  //////////////////////////////
  const [followersOpen, setFollowersOpen] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [followersU, setFollowersU] = useState(false);
  const [followedU, setFollowedU] = useState(false);
  //////////////////////////////////

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
          size="medium"
          sx={{
            width: 0.95,
          }}
          variant="contained"
          onClick={(e) => {
            follow(e, currentUserMongoId, userMongoId);
          }}
        >
          follow
        </Button>
      ) : checkId === false && isFollowed === true ? (
        <Button
          size="medium"
          sx={{
            width: 0.95,
          }}
          variant="contained"
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
    userContext
      .getUserFromDatabase(userId, setloading)
      .then(() => setdividerLoading(false));
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
        marginX={1}
      >
        <Stack flex={2}>
          {loading ? (
            <Skeleton
              variant="circular"
              sx={{
                width: { xs: "75px", sm: "150px" },
                height: { xs: "75px", sm: "150px" },
              }}
            />
          ) : (
            <Avatar
              alt="Remy Sharp"
              src="https://wallpaperaccess.com/full/1890591.jpg"
              sx={{
                width: { xs: "75px", sm: "150px" },
                height: { xs: "75px", sm: "150px" },
              }}
            />
          )}
        </Stack>
        <Stack flex={1}></Stack>

        <Stack flex={4} flexDirection="row">
          {loading ? (
            <Skeleton
              variant="rectangular"
              sx={{ width: "100%" }}
              height={60}
            />
          ) : (
            <>
              <Button
                sx={{ color: "text.primary" }}
                onClick={() =>
                  followers?.length > 0
                    ? setFollowersU(true)
                    : setFollowersU(false)
                }
              >
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
              </Button>
              <Stack flex={1}></Stack>

              <Button
                sx={{ color: "text.primary" }}
                onClick={() =>
                  followed?.length > 0
                    ? setFollowedU(true)
                    : setFollowedU(false)
                }
              >
                <Stack flex={1} flexDirection="column" alignItems="center">
                  {" "}
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
                    {followed?.length}
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
              </Button>
            </>
          )}
        </Stack>

        <Stack flex={1}></Stack>
      </Stack>
      <Stack flex={4} flexDirection="column" sx={{ backgroundColor: "" }}>
        <Stack
          flexDirection="row"
          sx={{ backgroundColor: "", paddingY: { xs: 1, sm: 3 } }}
        >
          {loading ? (
            <Skeleton
              my={1}
              animation="wave"
              sx={{ marginLeft: "8px" }}
              height={10}
              width="20%"
            />
          ) : (
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
          )}
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
          {loading ? (
            <Skeleton
              my={1}
              animation="wave"
              height={10}
              width="20%"
              sx={{
                alignSelf: { xs: "flex-start", sm: "center" },
              }}
            />
          ) : (
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
          )}
        </Stack>
      </Stack>
      <Stack flexDirection="row" justifyContent="center" marginTop={1}>
        {checkId === true ? (
          loading ? (
            <Skeleton
              variant="rectangular"
              sx={{ width: "95%", my: 1 }}
              height={25}
            />
          ) : (
            <Button
              size="small"
              onClick={
                matches ? () => setOpen(true) : () => handleNavigateClick()
              }
              sx={{
                color: "text.primary",
                borderColor: "text.primary",
                width: 0.95,
              }}
              variant="outlined"
            >
              Edit Profile
            </Button>
          )
        ) : (
          renderFollowButton
        )}{" "}
        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={followersU}
          onClose={handleFollowersUModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <FollowersData userId={checkId ? currentUserMongoId : userMongoId} />
        </Modal>
        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={followedU}
          onClose={handleFollowedUModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <FollowedData userId={checkId ? currentUserMongoId : userMongoId} />
        </Modal>
        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={open} ///////////// ----> Fix
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <EditProfile setOpen={setOpen} called="userdetails" />
        </Modal>
      </Stack>
    </>
  );
}

export default UserDetails;
