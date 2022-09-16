import React from "react";
import { Container, Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Footer() {
  return (
    <footer className="footer">
      <Box
        py={{ xs: 2 }}
        bgcolor="text.secondary"
        color="white"
        position="fixed"
        sx={{ bottom: 0 }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Stack spacing={1} direction="row" justifyContent="center">
              <Pagination count={10} />
            </Stack>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
