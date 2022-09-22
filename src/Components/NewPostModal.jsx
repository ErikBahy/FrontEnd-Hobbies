import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Tags from "./Tags";
import {
  Avatar,
  Box,
  Button,
  Fab,
  InputAdornment,
  Modal,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { AccountCircle } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import axios from "axios";
import {
  getCurrentUserId,
  getMongoIdFromCognitoId,
  getUserFromCognitoId,
  addUser,
} from "../apiCalls";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import peopleIcon from "../logos/Group 180.png";
import NewPostModalNewPage from "./NewPostModalNewPage";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

function NewPostModal({ effectRunFromModal, seteffectRunFromModal }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(dayjs());
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [text, setText] = useState("");
  const [limit, setLimit] = useState("");
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState();
  const [cognitoId, setcognitoId] = useState();
  const [mongoId, setmongoId] = useState();
  const userContext = useContext(UserContext);
  const { loggedUser } = userContext;
  const handleNavigateClick = () => {
    navigate("/newpost");
  };

  // console.log(cognitoId, "and currentuser ", mongoId, "hopefully");

  // console.log(text, "     console logging text ");
  // console.log(value.$d, " console logging date ");
  // console.log(limit, "     console logging limit ");
  // console.log(tag, "     console logging tag from newpostmodal ");

  const clear = () => {
    setLimit("");
    setText("");
    setTag([]);
  };

  const postPost = async (e) => {
    /* const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken
    const requestInfo = {
      headers: {
        Authorization: token
      }
    }*/
    try {
      e.preventDefault();
      await axios.post(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/post/user/${mongoId._id}`,
        {
          postCognitoId: cognitoId,
          text: text,
          limit: limit,
          startTime: value.$d,
          username: loggedUser.username,
          tags: tag,
        }
      );
      console.log("postPostRan when clicked");
      clear();
      setOpen(false);
      seteffectRunFromModal(!effectRunFromModal);
      //  fetchPost()
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentUserId().then((id) => {
      setcognitoId(id);
      getUserFromCognitoId(id).then((data) => setmongoId(data));
    });
  }, []);

  return (
    <>
      <Tooltip
        title="POST"
        sx={{
          position: "fixed",
          bottom: 20,

          right: { xs: "calc(0% + 30px)", md: 30 },
        }}
        onClick={(e) => {
          matches ? setOpen(true) : handleNavigateClick();
          setTag([]);

          addUser();
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {matches ? (
          <Box
            sx={{ width: { xs: 300, sm: 500 }, height: { xs: 350, sm: 400 } }}
            bgcolor="background.default"
            color="text.primary"
            borderRadius={5}
            p={3}
          >
            <Typography variant="h6" color="gray" textAlign="center">
              Create Post
            </Typography>
            <UserBox>
              <Stack flex={5} flexDirection="row" gap={2} alignItems="center">
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  alt="Erik"
                  src="https://images.unsplash.com/photo-1517348573020-98fb6f1ccc80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                />
                <Typography fontWeight={500} variant="span">
                  {loggedUser?.username}
                </Typography>
              </Stack>
              {matches === false ? (
                <Box flex={3}>
                  <TextField
                    sx={{ alignSelf: "flex-end" }}
                    id="outlined-number"
                    label="People limit"
                    type="number"
                    size="small"
                    value={limit}
                    onChange={(e) =>
                      setLimit(
                        e.target.value < 0
                          ? (e.target.value = 0)
                          : e.target.value
                      )
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Box>
              ) : null}
            </UserBox>
            <TextField
              id="standard-multiline-static"
              sx={{
                width: "100%",
              }}
              multiline
              placeholder="What's on yo mind, huh?"
              rows={4}
              variant="standard"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Stack direction="row" gap={1} mt={3} mb={3}>
              {matches === true ? (
                <Box flex={2}>
                  <TextField
                    id="outlined-number"
                    size="small"
                    type="number"
                    value={limit}
                    onChange={(e) =>
                      setLimit(
                        e.target.value < 0
                          ? (e.target.value = 0)
                          : e.target.value
                      )
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={peopleIcon} height={20} width={20} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography
                            fontSize={14}
                            sx={{ color: "text.secondary" }}
                          >
                            {" "}
                            Limit
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Box>
              ) : null}
              <Box flex={4}>
                <Tags called="modal" tag={tag} setTag={setTag} />
              </Box>
            </Stack>
            <Stack
              flexDirection="row"
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "50%" }}
                flex={1}
                onClick={(e) => {
                  postPost(e);
                }}
              >
                Post
              </Button>

              <Box
                flex={1}
                sx={{ width: "100%", marginLeft: { xs: 0, sm: 1 } }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField
                        sx={{
                          backgroundColor: "primary.main",
                          borderRadius: 1,
                        }}
                        {...props}
                      />
                    )}
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Stack>
          </Box>
        ) : (
          <NewPostModalNewPage called="modal" setOpen={setOpen} />
        )}
      </StyledModal>
    </>
  );
}

export default NewPostModal;
