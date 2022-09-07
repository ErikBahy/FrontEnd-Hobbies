import { Person2Outlined, Settings } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";

function LeftBar() {
  return (
    <Stack
      flexDirection="row"
      justifyContent="center"
      flex={3}
      sx={{ backgroundColor: "lightgray" }}
    >
      <Stack flexDirection="column" alignItems="center">
        <Avatar
          alt="Remy Sharp"
          src="https://wallpaperaccess.com/full/1890591.jpg"
          sx={{ width: 250, height: 250, margin: 2 }}
        />
        <Typography variant="h6" component="text" sx={{ margin: 3 }}>
          UserName
        </Typography>
        <Button variant="contained" sx={{ mb: 1, width: 1 / 2 }}>
          Follow
        </Button>
        <Divider variant="middle" sx={{ width: "80%" }} />
        <Stack flexDirection="row" justifyContent="space-evenly">
          <Button>134 Posts</Button>
          <Button>456 Followers</Button>
          <Button>198 Following</Button>
        </Stack>
        <Divider variant="middle" sx={{ width: "80%" }} />
        <Typography sx={{ marginX: 3, marginTop: 2, alignSelf: "flex-start" }}>
          Description :{" "}
        </Typography>
        <Typography sx={{ margin: 3 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quasi
          quae vitae, ab alias omnis veritatis facilis doloribus nam
          reprehenderit itaque delectus numquam? Illo recusandae eos, quas ipsam
          aperiam excepturi?
        </Typography>

        <Button variant="outlined" startIcon={<Person2Outlined />}>
          Edit Profile
        </Button>
      </Stack>
    </Stack>
  );
}

export default LeftBar;
