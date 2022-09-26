import React, { useEffect, useState } from "react";
import NewPostModal from "../Components/NewPostModal";
import Feed from "../Components/Feed";
import Tags from "../Components/Tags";
import Navbar from "../Components/Navbar";
import { Box, Skeleton, Stack } from "@mui/material";
import { DotLoader } from "react-spinners";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { getMongoIdFromCognitoId } from "../apiCalls";

function MainPage() {
  const [tag, setTag] = useState([]);
  const userContext = useContext(UserContext);
  const [loading, setloading] = useState(true);
  const [effectRunFromModal, seteffectRunFromModal] = useState(false);

  useEffect(() => {
    userContext
      .getCurrentUserId()
      .then((cognitoId) =>
        getMongoIdFromCognitoId(cognitoId).then((id) =>
          userContext.setcurrentUserMongoId(id)
        )
      );
  }, []);

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
