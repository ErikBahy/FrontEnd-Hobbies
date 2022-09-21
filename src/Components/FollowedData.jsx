import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserFollowed } from "../apiCalls"


function FollowedData({userId}){
    const [followed, setFollowed] = useState();
    console.log(userId, "mongoid  ", followed, "followers   ")
    console.log("modal rannnnnnnnn FOLLOWEDs");


    useEffect(() => {
        getUserFollowed(userId).then((followersss) => {
            setFollowed(followersss)
        });
    }, []);

    return (
        <Stack flexDirection="row" sx={{width:400 , height : 700 , backgroundColor:"blue"}} alignItems="center">
          {followed?.map(aFollower=><Typography
           
           sx={{ textDecoration: "none", color: "text.primary" }}
           marginRight={1}
           fontWeight={600}
         >
           {aFollower?.username}
          
         </Typography>)}
        </Stack>
      );
}

export default FollowedData;