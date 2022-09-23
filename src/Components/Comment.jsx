import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserFromCognitoId } from "../apiCalls";

function Comment(data) {
  const [user, setUser] = useState();
  console.log(data, "data  ", user, "and user ");

  useEffect(() => {
    getUserFromCognitoId(data.data.commentCognitoId).then((userr) =>
      setUser(userr)
    );
  }, []);

  return (
    <Stack
      sx={{ whiteSpace: "initial" }}
      flexDirection="row"
      marginTop="10px"
      alignItems="center"
    >
      <Typography
        component={Link}
        to={`/userprofile/${data.data.commentCognitoId}`}
        sx={{ textDecoration: "none", color: "text.primary" }}
        marginRight={1}
        fontWeight={600}
      >
        {user?.username}{" "}
      </Typography>
      <Typography fontWeight={100}>{data?.data?.text} </Typography>
      <Typography sx={{ marginLeft: "auto" }} fontWeight={100}>
        {data?.data?.date.substring(0, 10)}{" "}
      </Typography>
    </Stack>
  );
}

export default Comment;
