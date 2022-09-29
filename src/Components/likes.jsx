import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getUserFromCognitoId } from "../apiCalls";

function Likes(data) {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserFromCognitoId(data.data.commentCognitoId).then((userr) =>
      setUser(userr)
    );
  }, []);

  return (
    <Stack display={"flex"}>
      <Typography>
        {user?.username} : {data?.data?.likes}
      </Typography>
    </Stack>
  );
}

export default Likes;
