import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

function EditProfile() {
  const userContext = useContext(UserContext);
  const myUser = userContext.user;
  const [newUsername, setUsername] = useState(myUser.username);
  const [newBio, setBio] = useState(myUser.bio);
  const onSubmit = (e) => {
    e.preventDefault();
    userContext.setUser({ ...myUser, username: newUsername, bio: newBio });
  };

  return (
    <Box my={2} >
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          onChange={(newValue) => {
            setUsername(newValue.target.value);
          }}
          id="outlined-basic"
          label="username"
          value={newUsername}
          variant="outlined"
        />
        <TextField
          onChange={(newValue) => {
            setBio(newValue.target.value);
          }}
          id="outlined-basic"
          label="Bio"
          value={newBio}
          variant="outlined"
        />
        <Button type="submit">Edit</Button>
      </form>
    </Box>
  );
}

export default EditProfile;
