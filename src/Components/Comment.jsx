import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getUserFromCognitoId } from "../apiCalls";

function Comment(data) {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserFromCognitoId(data.commentCognitoId).then((userr) => setUser(userr));
  }, []);

  return (
    <Stack>
      <Typography>username</Typography>
      <Typography>commentText</Typography>
    </Stack>
  );
}

export default Comment;
