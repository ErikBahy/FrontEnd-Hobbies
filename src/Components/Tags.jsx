import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import React from "react";

function Tags({ called }) {
  const tags = [
    { title: "Futboll", year: 1994, category: "Sport" },
    { title: "Tirana", year: 1972, category: "City" },
    { title: "Durres", year: 1974, category: "City" },
    { title: "Fier", year: 1974, category: "City" },
  ];  
  
  const options = tags.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });
  return (
    <Stack flexDirection="row" marginTop={called === "main" ? 2 : 0}>
      <Box
        flex={2}
        sx={{
          display: called === "modal" ? "none" : { xs: "none", sm: "block" },
        }}
      ></Box>
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
          options={tags}
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.title}
          onChange={(event, value) => console.log(value)}
          multiple
          limitTags={2}
          renderInput={(params) => (
            <TextField {...params} label="Choose Tags" placeholder="Tags" />
          )}
          sx={{ width: called === "modal" ? "100%" : "88%" }}
        />
      </Box>
      <Box
        flex={2}
        sx={{
          display: called === "modal" ? "none" : { xs: "none", sm: "block" },
        }}
      ></Box>
    </Stack>
  );
}

export default Tags;
