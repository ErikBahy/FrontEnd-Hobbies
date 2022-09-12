import { Box, TextField } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function EditProfile() {
  const userContext = useContext(UserContext);
  const { username, bio } = userContext.user;

  return (
    <Box my={2}>
      <form>
        <TextField id="outlined-basic" label="Username" variant="outlined" />
        <TextField id="outlined-basic" label="Bio" variant="outlined" />
      </form>
    </Box>
  );
}

export default EditProfile;
