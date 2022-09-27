import { Chip } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Auth } from "aws-amplify";

function ShowTags({ tags }) {
  const [locationTag, setlocationTag] = useState();
  const [sportTag, setsportTag] = useState();

  const getLocationTag = async () => {
    const userAuth = await Auth.currentAuthenticatedUser();
      const token = userAuth.signInUserSession.idToken.jwtToken;
      const requestInfo = {
        headers: {
          Authorization: token,
        },
      }
    const res = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/locations/${tags}`, requestInfo
    );
    setlocationTag(res.data);
  };

  const getSportTag = async () => {
    const userAuth = await Auth.currentAuthenticatedUser();
      const token = userAuth.signInUserSession.idToken.jwtToken;
      const requestInfo = {
        headers: {
          Authorization: token,
        },
      }
    const res = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/sports/${tags}`, requestInfo
    );
    setsportTag(res.data);
  };

  useEffect(() => {
    getLocationTag();
    getSportTag();
  }, [tags]);

  return (
    <>
      <Chip
        sx={{ fontSize: "12px", height: 25, marginRight: "5px", my: "3px" }}
        label={locationTag ? locationTag?.text : sportTag?.text}
      />
    </>
  );
}

export default ShowTags;
