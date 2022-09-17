import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getUserFromCognitoId } from "../apiCalls";

function Comment(data) {
  const [user, setUser] = useState();
  console.log(data , "data  " , user , "and user " );

  useEffect(() => {
    getUserFromCognitoId(data.data.commentCognitoId).then((userr) => setUser(userr));
  }, []);


  return (
    <Stack display={"flex"}> 
      <Typography>{user?.username} : {data?.data?.text}</Typography>
    </Stack>
  );
}

export default Comment;
