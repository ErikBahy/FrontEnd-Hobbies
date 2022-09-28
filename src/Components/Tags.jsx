import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";

function Tags({ called, setTag, tag }) {
  // const tags = [
  //   { title: "Futboll", category: "Sport" },
  //   { title: "Tirana", category: "City" },
  //   { title: "Durres", category: "City" },
  //   { title: "Fier", category: "City" },
  // ];
  const [tags, setTags] = useState([]);
  // console.log(tags, " state hereeee");
  const getTags = async () => {
    const userAuth = await Auth.currentAuthenticatedUser();
      const token = userAuth.signInUserSession.idToken.jwtToken;
      const requestInfo = {
        headers: {
          Authorization: token,
        },
      }
    const res = await axios.get(
      "https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/locations", requestInfo
    );
    const data = res.data;

    let i = [];
    data.map((el) =>
      i.push({ title: el.text, _id: el._id, category: "location" })
    );
    // setTags(data.map((el)=>[...tags , { title: el.text, _id: el._id, category: "location" }]))

    // console.log(i, "tags heree");

    const response = await axios.get(
      "https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/sports", requestInfo
    );
    const sportTags = response.data;
    sportTags.map((el) =>
      i.push({ title: el.text, _id: el._id, category: "sport" })
    );
    console.log(i, " from tags");
    setTags(i);
  };

  useEffect(() => {
    getTags();
  }, []);

  // const options = tags.map((option) => {
  //   const firstLetter = option.title[0].toUpperCase();
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
  //     ...option,
  //   };
  // });
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
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Autocomplete
          id="grouped-demo"
          options={tags}
          size="small"
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.title}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          onChange={(event, value) => {
            let tagsArray = [];
            value.map((el) => {
              tagsArray.push(el._id);
            });
            setTag(tagsArray);
          }}
          multiple
          limitTags={2}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose Tags"
              placeholder="Location/Sport"
            />
          )}
          sx={{
            width: called === "modal" ? "100%" : { xs: "92%", sm: "95%" },
            backgroundColor: "background.paper",
          }}
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
