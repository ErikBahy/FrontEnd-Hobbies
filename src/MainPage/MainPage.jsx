import React, { useEffect, useState } from "react";
import NewPostModal from "../Components/NewPostModal";
import Feed from "../Components/Feed";
import Tags from "../Components/Tags";
import Navbar from "../Components/Navbar";
import { Box } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { addUser, getMongoIdFromCognitoId } from "../apiCalls";

function MainPage() {
  const [tag, setTag] = useState([]);
  const userContext = useContext(UserContext);
  const [effectRunFromModal, seteffectRunFromModal] = useState(false);
  const [cognitoID, setcognitoID] = useState();
  console.log(cognitoID, "cognito from main adduser");

  useEffect(() => {
    userContext.getCurrentUserId().then((cognitoId) => {
      setcognitoID(cognitoId);

      getMongoIdFromCognitoId(cognitoId).then((id) =>
        userContext.setcurrentUserMongoId(id)
      );
    });
  }, []);
  useEffect(() => {
    addUser();
  }, [cognitoID]);

  console.log(tag, "from main page");
  return (
    <>
      <Box sx={{ backgroundColor: "background.myBackground" }}>
        <Navbar called="main" />
        <Tags called="main" tag={tag} setTag={setTag} />

        <>
          <Feed
            called="main"
            effectRunFromModal={effectRunFromModal}
            seteffectRunFromModal={seteffectRunFromModal}
            tag={tag}
            setTag={setTag}
          />
          <NewPostModal
            effectRunFromModal={effectRunFromModal}
            seteffectRunFromModal={seteffectRunFromModal}
          />
        </>
      </Box>
    </>
  );
}

export default MainPage;
