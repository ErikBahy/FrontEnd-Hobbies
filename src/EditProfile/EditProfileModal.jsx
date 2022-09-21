import { Add } from "@mui/icons-material";
import { Box, Fab, Modal, styled, Tooltip } from "@mui/material";
import React, { useState } from "react";
import EditProfile from "./EditProfile";

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

function EditProfileModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip
        title="POST"
        sx={{
          position: "fixed",
          bottom: 20,

          right: { xs: "calc(0% + 30px)", md: 30 },
        }}
        onClick={(e) => {
          setOpen(true);
        }}
      >
        <Fab color="primary" aria-label="add">
          <Add />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditProfile />
      </StyledModal>
    </>
  );
}

export default EditProfileModal;
