import {
  Avatar,
  Button,
  Modal,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

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

import EditProfile from "../EditProfile/EditProfile";
import { Auth } from "aws-amplify";

function UserDetails({
  userId,
  bio,
  location,
  effectRun,
  seteffectRun,
  setdividerLoading,
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const userContext = useContext(UserContext);
  const { username, prfilePicture, followers, followed } = userContext.user;
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

  const [loading, setloading] = useState(true);

  //////////////////////////////
  const [followersOpen, setFollowersOpen] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [followersU, setFollowersU] = useState(false);
  const [followedU, setFollowedU] = useState(false);
  const [userDetailsEffect, setuserDetailsEffect] = useState(false);
  const [followedEffect, setfollowedEffect] = useState(false);
  //////////////////////////////////

  const follow = async (e, currentUserMongoId, userMongoId) => {
    const userAuth = await Auth.currentAuthenticatedUser();
    const token = userAuth.signInUserSession.idToken.jwtToken;
    const requestInfo = {
      headers: {
        Authorization: token,
      },
    };
    e.preventDefault();

    const idk = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/followers/${currentUserMongoId}/${userMongoId}`,
      requestInfo
    );

    if (runEffect) {
      setrunEffect(false);
    } else {
      setrunEffect(true);
    }
  };

  const unfollow = async (e, currentUserMongoId, userMongoId) => {
    const userAuth = await Auth.currentAuthenticatedUser();
    const token = userAuth.signInUserSession.idToken.jwtToken;
    const requestInfo = {
      headers: {
        Authorization: token,
      },
    };
    e.preventDefault();

    const idk = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/unfollow/${currentUserMongoId}/${userMongoId}`,
      requestInfo
    );

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
            width: { xs: 0.95, sm: 1 },
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
            width: { xs: 0.95, sm: 1 },
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
  }, [open, isFollowed, effectRun, userDetailsEffect, followedEffect]);

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
        sx={{ backgroundColor: "", marginX: { xs: 1, sm: 0 } }}
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
              src={prfilePicture}
              sx={{
                width: { xs: "75px", sm: "125px" },
                height: { xs: "75px", sm: "125px" },
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
      <Stack flex={4} flexDirection="column">
        <Stack
          flexDirection="row"
          sx={{ backgroundColor: "", paddingY: { xs: 1, sm: 1 } }}
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
                paddingLeft: { xs: "8px", sm: 0 },
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: { xs: 300, sm: 400 },
              }}
              variant="p"
              component="span"
            >
              {bio}
            </Typography>
          )}
        </Stack>
        <Stack
          justifyContent="space-around"
          sx={{
            backgroundColor: "",
            paddingY: 0,
            paddingX: { xs: 1, sm: 0 },
            fontSize: "12px",
            flexDirection: { xs: "column", sm: "column" },
          }}
        >
          {loading ? (
            <Skeleton
              my={1}
              animation="wave"
              height={10}
              width="20%"
              sx={{
                alignSelf: { xs: "flex-start", sm: "flex-start" },
              }}
            />
          ) : (
            <Typography
              sx={{
                alignSelf: { xs: "flex-start", sm: "flex-start" },
                fontWeight: { xs: 100, sm: 100 },
                fontSize: { sm: "16px" },
              }}
              variant="p"
              component="span"
              fontWeight={100}
            >
              {location}
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
                width: { xs: 0.95, sm: 1 },
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
          <FollowersData
            followedEffect={followedEffect}
            setfollowedEffect={setfollowedEffect}
            seteffectRun={seteffectRun}
            effectRun={effectRun}
            userDetailsEffect={userDetailsEffect}
            setuserDetailsEffect={setuserDetailsEffect}
            checkId={checkId}
            setFollowersU={setFollowersU}
            userId={checkId ? currentUserMongoId : userMongoId}
          />
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
          <FollowedData
            followedEffect={followedEffect}
            setfollowedEffect={setfollowedEffect}
            seteffectRun={seteffectRun}
            effectRun={effectRun}
            setFollowedU={setFollowedU}
            userId={checkId ? currentUserMongoId : userMongoId}
          />
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
          <EditProfile
            userDetailsEffect={userDetailsEffect}
            setuserDetailsEffect={setuserDetailsEffect}
            setOpen={setOpen}
            called="userdetails"
          />
        </Modal>
      </Stack>
    </>
  );
}

export default UserDetails;
