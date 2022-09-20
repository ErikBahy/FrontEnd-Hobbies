import { Chip } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function ShowTags({ tags }) {
  const [locationTag, setlocationTag] = useState();
  const [sportTag, setsportTag] = useState();

  const getLocationTag = async () => {
    const res = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/locations/${tags}`
    );
    setlocationTag(res.data);
  };

  const getSportTag = async () => {
    const res = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/sports/${tags}`
    );
    setsportTag(res.data);
  };

  useEffect(() => {
    getLocationTag();
    getSportTag();
  }, []);

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
