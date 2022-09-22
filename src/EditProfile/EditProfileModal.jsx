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

function EditProfileModal({ open }) {
  return (
    <>
      <StyledModal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditProfile />
      </StyledModal>
    </>
  );
}

export default EditProfileModal;