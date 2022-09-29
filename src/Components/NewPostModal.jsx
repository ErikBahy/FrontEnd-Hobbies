import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

import {
  Box,
  Fab,
  Modal,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import dayjs from "dayjs";
import axios from "axios";
import { getCurrentUserId, getUserFromCognitoId, addUser } from "../apiCalls";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

import NewPostModalNewPage from "./NewPostModalNewPage";
import { Auth } from "aws-amplify";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

function NewPostModal({ effectRunFromModal, seteffectRunFromModal, called }) {
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

  const handleNavigateClick = () => {
    navigate("/newpost");
  };

  const clear = () => {
    setLimit("");
    setText("");
    setTag([]);
  };

  const postPost = async (e) => {
    try {
      const userAuth = await Auth.currentAuthenticatedUser();
      const token = userAuth.signInUserSession.idToken.jwtToken;
      const requestInfo = {
        headers: {
          Authorization: token,
        },
      };
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
        },
        requestInfo
      );

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
          right: { xs: "calc(0% + 15px)", md: 30 },
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
          calledd={called}
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
