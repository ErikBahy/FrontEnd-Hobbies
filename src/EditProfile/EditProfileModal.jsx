import { Modal, styled } from "@mui/material";
import React from "react";
import EditProfile from "./EditProfile";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
