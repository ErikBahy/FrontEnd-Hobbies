import { LineAxisOutlined } from "@mui/icons-material";
import {
  Box,
  Stack,
  Container,
  Pagination,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

const url = "https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com";

function Feed({ called, setTag, tag }) {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState();
  const [totalPages, setTotalPages] = useState();
  const [multipleTags, setMultipleTags] = useState([]);
  const [feedEffectRun, setfeedEffectRun] = useState(false);
  const [shouldEffectRun, setshouldEffectRun] = useState(false);

  const theme = useTheme();
  const matchesDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const getAllPosts = async () => {
    const page = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/allpostsPages`
    );
    setTotalPages(parseInt(page.data));
    // console.log(totalPages);
    //const res = await axios.get(`${url}/dev/allposts`);
    const res = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/allposts?page=${pageNumber}`
    );
    const data = res.data;

    let i = [];
    data.post.map((el) => i.push(el));

    setPosts(i);
    console.log(posts, " state from feed");
  };

  const getPostsByTag = async () => {
    if (tag.length === 1) {
      const res = await axios.get(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/bylocationsport?tags=${tag}`
      );
      const data = res.data;
      console.log(data);
      let i = [];
      data.map((el) => i.push(el));

      setPosts(i);
    } else if (tag.length > 1) {
      // setMultipleTags([...tag]);
      let str = tag.join();
      console.log(str);

      const res = await axios.get(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/bytag?tags=${str}`
      );
      const data = res.data;
      console.log(data);
      let i = [];
      data.map((el) => i.push(el));

      setPosts(i);
    } else {
      shouldEffectRun ? setshouldEffectRun(false) : setshouldEffectRun(true);
    }
  };

  useEffect(() => {
    getPostsByTag();
    console.log("===============");
  }, [tag, feedEffectRun]);

  useEffect(() => {
    getAllPosts();
  }, [pageNumber, shouldEffectRun]);

  return (
    <>
      <Stack flexDirection={matchesDesktop ? "row" : "column"}>
        {matchesDesktop ? (
          <Box flex={2} sx={{ display: { xs: "none", sm: "block" } }}></Box>
        ) : null}
        <Box sx={{ flex: { xs: 1, sm: 4 } }}>
          {posts.map((el) => {
            return (
              <Post
                feedEffectRun={feedEffectRun}
                setfeedEffectRun={setfeedEffectRun}
                called="feed"
                post={el}
              />
            );
          })}
        </Box>
        {matchesDesktop ? (
          <Box flex={2} sx={{ display: { xs: "none", sm: "block" } }}></Box>
        ) : null}
      </Stack>

      <Box
        alignSelf="flex-end"
        py={{ xs: 2 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Stack spacing={1} direction="row" justifyContent="center">
              <Pagination
                count={totalPages}
                onChange={(e, value) => setPageNumber(value)}
              />
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Feed;
