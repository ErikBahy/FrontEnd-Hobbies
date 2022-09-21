import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserFollowers } from "../apiCalls"


function FollowersData({userId}){
    const [followers, setFollowers] = useState();
    console.log(userId, "mongoid  ", followers, "followers   ")
    console.log("modal rannnnnnnnn");


    useEffect(() => {
        getUserFollowers(userId).then((followersss) => {
            setFollowers(followersss)
        });
    }, []);

    


    return (
        <Stack flexDirection="row" sx={{width:400 , height : 700 , backgroundColor:"white"}} alignItems="center">
          {followers?.map(aFollower=><Typography
           
           sx={{ textDecoration: "none", color: "text.primary" }}
           marginRight={1}
           fontWeight={600}
         >
           {aFollower?.username}
          
         </Typography>)}
          {/*<Typography fontWeight={100}>{data?.data?.text} </Typography>
          <Typography sx={{ marginLeft: "auto" }} fontWeight={100}>
    {data?.data?.date.substring(0, 10)}{" "}
          </Typography>*/}
        </Stack>
      );
}

export default FollowersData;