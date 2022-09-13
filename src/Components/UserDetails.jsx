import {
  Avatar,
  Button,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { Edit } from "@mui/icons-material";
import { UserContext } from "../contexts/UserContext";

//sdhjafjheiufhuidshudhuvhuisvuirufbewhdufehwiudhuoewhuio

function UserDetails() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const userContext = useContext(UserContext);
  const { username, bio, followers } = userContext.user;

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        flex={1}
        sx={{ backgroundColor: "" }}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://wallpaperaccess.com/full/1890591.jpg"
          sx={{
            width: { xs: "100px", sm: "150px" },
            height: { xs: "100px", sm: "150px" },
          }}
        />
      </Stack>
      <Stack flex={4} flexDirection="column" sx={{ backgroundColor: "" }}>
        <Stack
          flexDirection="row"
          justifyContent="space-around"
          sx={{ backgroundColor: "", paddingY: { xs: 1, sm: 3 } }}
        >
          <Typography
            sx={{
              padding: 1,
            }}
            variant="p"
            component="span"
            fontWeight={100}
          >
            {username}
          </Typography>
          <Typography
            sx={{
              padding: 1,
            }}
            variant="p"
            component="span"
            fontWeight={100}
          >
            {` Followers`}
          </Typography>
          <Button variant="text" href="/editUser" startIcon={<Edit />}>
            Edit
          </Button>
        </Stack>
        <Stack
          justifyContent="space-around"
          alignItems="center"
          sx={{
            backgroundColor: "",
            paddingY: 0,
            paddingX: 1,
            flexDirection: { xs: "column", sm: "row" },
            paddingTop: { xs: 3 },
          }}
        >
          <Tooltip title="Users Description" placement="top-start">
            <TextField
              id="standard-multiline-static"
              maxLength={5}
              label=""
              disabled
              defaultValue={bio}
              maxRows={matches === true ? 4 : 2}
              multiline
              flex={1}
              sx={{
                width: { xs: "100%", sm: "60%" },
                "& .MuiInputBase-root": { padding: 1, borderTop: 0 },
              }}
            />
          </Tooltip>

          <Typography
            sx={{
              alignSelf: { xs: "flex-start", sm: "center" },
              padding: 1,
              marginTop: { xs: 1 },
            }}
            variant="p"
            component="span"
            fontWeight={100}
          >
            JOINED SINCE 1997
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}

export default UserDetails;
