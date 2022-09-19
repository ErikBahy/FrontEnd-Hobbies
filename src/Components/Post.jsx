import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddIcon from "@mui/icons-material/Add";
import "../stlyles.css";
import { Chip } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  checkJoin,
  checkLike,
  getCurrentUserId,
  getMongoIdFromCognitoId,
  getUserFromCognitoId,
} from "../apiCalls";
import Comment from "./Comment";
import Likes from "./likes";
import { UserContext } from "../contexts/UserContext";
import ShowTags from "./ShowTags";

function Post({
  post,
  called,
  seteffectRun,
  effectRun,
  feedEffectRun,
  setfeedEffectRun,
}) {
  const userContext = useContext(UserContext);
  const { currentUserMongoId, currentUserId } = userContext;
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState([]);
  const [commentsText, setCommentsText] = useState("");
  const [shouldEffectRun, setshouldEffectRun] = useState(false);
  const [checked, setchecked] = useState(false);
  const [postLikes, setpostLikes] = useState();
  const [liked, setLiked] = useState();
  const [isJoined, setisJoined] = useState(false);
  console.log(checked, isJoined);

  const {
    username,
    likes,
    text,
    tags,
    date,
    startTime,
    limit,
    postCognitoId,
    _id,
    joined,
  } = post;

  console.log(
    currentUserMongoId,
    "currentusermongoId",
    _id,
    "postId",
    joined,
    "joined"
  );
  const clear = () => {
    setCommentsText("");
    setLiked("");
  };

  const joinPost = async () => {
    await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/joinPost/${currentUserMongoId}/${_id}`
    );
    shouldEffectRun ? setshouldEffectRun(false) : setshouldEffectRun(true);
    feedEffectRun ? setfeedEffectRun(false) : setfeedEffectRun(true);
  };
  const unjoinPost = async () => {
    await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/unjoinPost/${currentUserMongoId}/${_id}`
    );
    feedEffectRun ? setfeedEffectRun(false) : setfeedEffectRun(true);
    shouldEffectRun ? setshouldEffectRun(false) : setshouldEffectRun(true);
  };

  const deletePost = async (e, _id) => {
    e.preventDefault();
    await axios.delete(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/delete/post/${currentUserMongoId}/${_id}`
    );

    effectRun ? seteffectRun(false) : seteffectRun(true);
  };

  useEffect(() => {
    allComments();
  }, [shouldEffectRun]);

  useEffect(() => {
    checkLike(currentUserMongoId, _id).then((bool) => setchecked(bool));
    checkJoin(currentUserMongoId, _id).then((bool) => setisJoined(bool));
  }, [shouldEffectRun, currentUserMongoId, _id]);

  const allComments = async () => {
    try {
      const res = await axios.get(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/comments/post/${_id}`
      );
      setComments(res.data);

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const renderDeleteButton = (
    <>
      {postCognitoId === currentUserId ? (
        <IconButton
          onClick={(e) => deletePost(e, post._id)}
          aria-label="settings"
        >
          <DeleteOutline />
        </IconButton>
      ) : null}
    </>
  );
  const getLikes = async () => {
    try {
      const res = await axios.get(
        ` https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/getLike/users/${_id}`
      );
      setpostLikes(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLikes();
  }, [shouldEffectRun]);

  const postComment = async () => {
    try {
      await axios.post(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/comment/post/${_id}`,
        {
          commentCognitoId: currentUserId,
          text: commentsText,
        }
      );
      shouldEffectRun ? setshouldEffectRun(false) : setshouldEffectRun(true);
      clear();
    } catch (err) {
      console.log(err);
    }
  };

  const removeLikeAtPost = async () => {
    try {
      await axios.get(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/unLike/${currentUserMongoId}/${_id}`
      );
      shouldEffectRun ? setshouldEffectRun(false) : setshouldEffectRun(true);
    } catch (error) {
      console.log(error);
    }
  };

  const addLikeAtPost = async () => {
    try {
      await axios.get(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/addLike/users/${currentUserMongoId}/${_id}`
      );

      shouldEffectRun ? setshouldEffectRun(false) : setshouldEffectRun(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Card sx={{ margin: 5, borderRadius: "30px" }}>
        <Stack flexdirection="row" width="100%">
          <CardHeader
            title={
              <Typography
                sx={{ fontSize: 14, fontWeight: 150, textDecoration: "none" }}
                color="text.secondary"
                component={Link}
                to={`userprofile/${postCognitoId}`}
              >
                {username}
              </Typography>
            }
            avatar={
              <Avatar
                sx={{ bgcolor: "red", textDecoration: "none" }}
                aria-label="recipe"
              >
                {username}
              </Avatar>
            }
            action={<Stack direction="row">{renderDeleteButton}</Stack>}
            subheader={date}
          />
        </Stack>
        {tags.map((el) => (
          <ShowTags tags={el} />
        ))}

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>

        <CardActions>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box display="flex" alignItems="center" direction="row">
              <Stack flexDirection="row" spacing={0} alignItems="center">
                <Typography>{postLikes}</Typography>
                <Tooltip title="Like">
                  <Checkbox
                    checked={checked}
                    onClick={
                      checked ? () => setchecked(false) : () => setchecked(true)
                    }
                    onChange={
                      checked ? () => removeLikeAtPost() : () => addLikeAtPost()
                    }
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite sx={{ color: "red" }} />}
                  />
                </Tooltip>
              </Stack>

              <Tooltip
                title="Comment"
                onClick={() => {
                  setShowComment(!showComment);
                }}
              >
                <IconButton aria-label="add-comment">
                  <AddCommentOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Box
              display="flex"
              direction="row"
              alignItems="center"
              sx={{ justifyContent: "space-between" }}
            >
              <Chip
                label={`Limit is: ${limit}`}
                color="primary"
                sx={{ marginRight: 3 }}
              />
              <Typography>
                {" "}
                {joined?.length}/{limit}
              </Typography>
              {currentUserId == postCognitoId ? (
                <Button variant="text">Check </Button>
              ) : isJoined === true ? (
                <Button onClick={() => unjoinPost()} variant="text">
                  Unjoin
                </Button>
              ) : joined?.length == limit ? (
                <Button disabled color="secondary" variant="text">
                  Completed
                </Button>
              ) : (
                <Button onClick={() => joinPost()} variant="text">
                  Join
                </Button>
              )}

              <Tooltip title="Join room" sx={{ marginRight: 4 }}>
                <IconButton
                  onClick={() =>
                    (window.location.href =
                      "https://d3rr23y8wyk3tl.cloudfront.net/")
                  }
                  aria-label="join-room"
                >
                  <MeetingRoomIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </CardActions>
        {showComment ? (
          <>
            <Typography sx={{ my: 1 }} marginLeft={2.5}>
              Add Comment:
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              display={"flex"}
            >
              <FormControl>
                <OutlinedInput
                  placeholder="Please enter text"
                  value={commentsText}
                  onChange={(e) => setCommentsText(e.target.value)}
                />
              </FormControl>
              <IconButton
                onClick={() => {
                  postComment();
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                expanded={isExpanded}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <Typography>Comment</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {comments.length > 0
                  ? comments.map((data) => {
                      return <Comment data={data} />;
                    })
                  : null}
              </AccordionDetails>
            </Accordion>
          </>
        ) : null}
      </Card>
    </Box>
  );
}

export default Post;
