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
      <StyledModal
        open={true}
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
