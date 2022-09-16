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
import { getCurrentUserId, getMongoIdFromCognitoId } from "../apiCalls";
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

//sdhjafjheiufhuidshudhuvhuisvuirufbewhdufehwiudhuoewhuio

function UserDetails({ userId }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const userContext = useContext(UserContext);
  const { username, bio, followers } = userContext.user;
  const [userMongoId, setuserMongoId] = useState();
  const [currentUserMongoId, setcurrentUserMongoId] = useState();
  const [isFollowed, setisFollowed] = useState(false);

  console.log(isFollowed);

  console.log(
    userMongoId,
    " userMongo",
    currentUserMongoId,
    "currentUsermongo"
  );

  const follow = async (e, currentUserMongoId, userMongoId) => {
    e.preventDefault();
    const idk = axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/followers/${currentUserMongoId}/${userMongoId}`
    );
    console.log(idk.data);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const checkId = userId === userContext.currentUserId;
  console.log(checkId, "the user id should fucking be here");

  useEffect(() => {
    getMongoIdFromCognitoId(userId).then((id) => setuserMongoId(id));
    getCurrentUserId().then((id) =>
      getMongoIdFromCognitoId(id).then((mongoId) =>
        setcurrentUserMongoId(mongoId)
      )
    );
  }, []);

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        flex={1}
        sx={{ backgroundColor: "" }}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://wallpaperaccess.com/full/1890591.jpg"
          sx={{
            width: { xs: "100px", sm: "150px" },
            height: { xs: "100px", sm: "150px" },
          }}
        />
      </Stack>
      <Stack flex={4} flexDirection="column" sx={{ backgroundColor: "" }}>
        <Stack
          flexDirection="row"
          justifyContent="space-around"
          sx={{ backgroundColor: "", paddingY: { xs: 1, sm: 3 } }}
        >
          <Typography
            sx={{
              padding: 1,
            }}
            variant="p"
            component="span"
            fontWeight={100}
          >
            {username}
          </Typography>
          <Typography
            sx={{
              padding: 1,
            }}
            variant="p"
            component="span"
            fontWeight={100}
          >
            {` Followers`}
          </Typography>
          {checkId === true ? (
            <Button onClick={handleOpen}>Edit</Button>
          ) : checkId === false && isFollowed === false ? (
            <Button
              onClick={(e) => {
                setisFollowed(true);
                follow(e, currentUserMongoId, userMongoId);
              }}
            >
              follow
            </Button>
          ) : (
            <Button onClick={setisFollowed(false)}>Unfollow</Button>
          )}

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} flexdirection="column">
              <Box display="flex" flexdirection="row" justifyContent="center">
                <TextField
                  sx={{ mb: 2, mr: 1 }}
                  id="input-with-icon-textfield"
                  label="Change your bio"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 2, height: 40 }}
                  startIcon={<CheckCircleOutlineIcon />}
                >
                  Done
                </Button>
              </Box>
              <Box display="flex" flexdirection="row" justifyContent="center">
                <TextField
                  sx={{ mr: 1 }}
                  id="input-with-icon-textfield"
                  label="Change your location"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EditLocationIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 2, height: 40 }}
                  startIcon={<CheckCircleOutlineIcon />}
                >
                  Done
                </Button>
              </Box>
            </Box>
          </Modal>
        </Stack>
        <Stack
          justifyContent="space-around"
          alignItems="center"
          sx={{
            backgroundColor: "",
            paddingY: 0,
            paddingX: 1,
            flexDirection: { xs: "column", sm: "row" },
            paddingTop: { xs: 3 },
          }}
        >
          <Tooltip title="Users Description" placement="top-start">
            <TextField
              id="standard-multiline-static"
              maxLength={5}
              label=""
              disabled
              defaultValue={bio}
              maxRows={matches === true ? 4 : 2}
              multiline
              flex={1}
              sx={{
                width: { xs: "100%", sm: "60%" },
                "& .MuiInputBase-root": { padding: 1, borderTop: 0 },
              }}
            />
          </Tooltip>

          <Typography
            sx={{
              alignSelf: { xs: "flex-start", sm: "center" },
              padding: 1,
              marginTop: { xs: 1 },
            }}
            variant="p"
            component="span"
            fontWeight={100}
          >
            JOINED SINCE 1997
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}

export default UserDetails;
