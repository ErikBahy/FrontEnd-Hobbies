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
  const [isposting, setisposting] = useState(false);
  console.log(value, "date time");
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
      setisposting(true);
      e.preventDefault();
      await axios.post(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/post/user/${mongoId._id}`,
        {
          postCognitoId: cognitoId,
          text: text,
          limit: limit,
          date: Date.now(),
          startTime: value.$d,
          username: loggedUser.username,
          tags: tag,
        }
      );
      console.log("postPostRan when clicked");
      clear();
      setOpen(false);
      seteffectRunFromModal(!effectRunFromModal);
      setisposting(false);
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
          bottom: 50,
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
        <NewPostModalNewPage
          seteffectRunFromModal={seteffectRunFromModal}
          effectRunFromModal={effectRunFromModal}
          setOpen={setOpen}
          called="NewPostModal"
        />
      </StyledModal>
    </>
  );
}

export default NewPostModal;
