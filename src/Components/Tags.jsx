import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import React from "react";


function Tags() {
  const top100Films = [
    { title: "Futboll", year: 1994, category: "Sport" },
    { title: "Tirana", year: 1972, category: "City" },
    { title: "Durres", year: 1974, category: "City" },
  ];
  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });
  return (
    <Stack flexDirection="row" marginTop={2}>
      <Box flex={2} sx={{ display: { xs: "none", sm: "block" } }}></Box>
      <Box
        flex={4}
        sx={{
          backgroundColor: "",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Autocomplete
          id="grouped-demo"
          options={top100Films}
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.title}
          multiple
          limitTags={2}
          renderInput={(params) => (
            <TextField {...params} label="Choose Tags" placeholder="Tags" />
          )}
          sx={{ width: "88%" }}
        />
      </Box>
      <Box
        flex={2}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      ></Box>
    </Stack>
  );
}

export default Tags;
