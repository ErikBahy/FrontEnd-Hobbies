import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function JoinedUsersData({ _id , getJoinedUsers }) {
    const [joinedU, setJoinedU] = useState();
    console.log(_id, "mongoid  ", joinedU, "followers   ")
    console.log("modal rannnnnnnnn JOINED");


    useEffect(() => {
        getJoinedUsers().then((joinedUsers) => {
            setJoinedU(joinedUsers)
        });
    }, []);

    return (
        <Stack flexDirection="row" sx={{ width: 400, height: 700, backgroundColor: "blue" }} alignItems="center">
            {joinedU?.map(aJoined =>
            <Typography

                sx={{ textDecoration: "none", color: "text.primary" }}
                marginRight={1}
                fontWeight={600}
            >
                {aJoined?.username}

            </Typography>)}
        </Stack>
    );
}

export default JoinedUsersData;