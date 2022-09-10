import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Tags from "./Tags";
import {
  Avatar,
  Box,
  Button,
  Fab,
  InputAdornment,
  Modal,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { AccountCircle } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

function NewPostModal() {
  const [value, setValue] = React.useState(dayjs());
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [open, setopen] = useState(false);

  return (
    <>
      <Tooltip
        title="Delete"
        sx={{
          position: "fixed",
          bottom: 20,
          right: { xs: "calc(0% + 30px)", md: 30 },
        }}
        onClick={(e) => setopen(true)}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={(e) => setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ width: { xs: 300, sm: 500 }, height: { xs: 350, sm: 350 } }}
          bgcolor="background.default"
          color="text.primary"
          borderRadius={5}
          p={3}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create Post
          </Typography>
          <UserBox>
            <Stack flex={5} flexDirection="row" gap={2} alignItems="center">
              <Avatar
                sx={{ width: 30, height: 30 }}
                alt="Erik"
                src="https://images.unsplash.com/photo-1517348573020-98fb6f1ccc80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              />
              <Typography fontWeight={500} variant="span">
                Erik
              </Typography>
            </Stack>
            {matches === false ? (
              <Box flex={3}>
                <TextField
                  sx={{ alignSelf: "flex-end" }}
                  id="outlined-number"
                  label="People limit"
                  type="number"
                  size="small"
                  onChange={(event) =>
                    event.target.value < 0
                      ? (event.target.value = 0)
                      : event.target.value
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Box>
            ) : null}
          </UserBox>
          <TextField
            id="standard-multiline-static"
            sx={{
              width: "100%",
            }}
            multiline
            placeholder="What's on yo mind, huh?"
            rows={4}
            variant="standard"
          />
          <Stack direction="row" gap={1} mt={3} mb={3}>
            {matches === true ? (
              <Box flex={2}>
                <TextField
                  sx={{ alignSelf: "flex-end" }}
                  id="outlined-number"
                  label="People limit"
                  type="number"
                  onChange={(event) =>
                    event.target.value < 0
                      ? (event.target.value = 0)
                      : event.target.value
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Box>
            ) : null}
            <Box flex={4}>
              <Tags called="modal" />
            </Box>
          </Stack>
          <Stack
            flexDirection="row"
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "50%" }}
              flex={1}
            >
              Post
            </Button>
            <Box flex={1} sx={{ width: "100%" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      sx={{ backgroundColor: "primary.main", borderRadius: 1n }}
                      {...props}
                    />
                  )}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Stack>
        </Box>
      </StyledModal>
    </>
  );
}

export default NewPostModal;
