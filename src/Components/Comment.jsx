import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserFromCognitoId } from "../apiCalls";

function Comment(data) {
  const [user, setUser] = useState();

  const commentedFromNow = moment(data.data.date).fromNow();

  useEffect(() => {
    getUserFromCognitoId(data.data.commentCognitoId).then((userr) =>
      setUser(userr)
    );
  }, []);

  return (
    <Stack paddingLeft="2px" marginBottom={1}>
      <Stack flexDirection="row">
        <Typography
          component={Link}
          to={`/userprofile/${data.data.commentCognitoId}`}
          sx={{
            textDecoration: "none",
            color: "text.primary",
          }}
          marginRight={1}
          fontWeight={600}
        >
          {user?.username}{" "}
        </Typography>
        <Typography sx={{ marginLeft: "auto", fontSize: 12 }} fontWeight={100}>
          {commentedFromNow}{" "}
        </Typography>
      </Stack>
      <Stack flexDirection="row" marginTop="0px" alignItems="center">
        <Typography sx={{ width: 1, wordBreak: "break-all" }} fontWeight={100}>
          {data?.data?.text}{" "}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Comment;
