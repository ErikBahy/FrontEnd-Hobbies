import { Box, Stack, Button } from "@mui/material";
import React from "react";
import Post from "./Post";

function Feed() {
  let a=[]
  for(let i=0;i<100;i++){
    a.push(i)
  }
  return (
    <>
      <Stack flexDirection="row">
        <Box flex={2} sx={{ display: { xs: "none", sm: "block" } }}></Box>
        <Box flex={4}>
          {
            a.map((el)=>{
              return(
                <Post />
              )
            })
          }

        </Box>
        <Box flex={2} sx={{ display: { xs: "none", sm: "block" } }}></Box>
      </Stack>
    </>
  );
}

export default Feed;
