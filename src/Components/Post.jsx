import {
  Avatar,
  Modal,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  styled,
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
import { DeleteOutline, MoreVert } from "@mui/icons-material";
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
import peopleIcon from "../logos/Group 180.png";
import calendarIcon from "../logos/Group 179.png";
import commentIcon from "../logos/Group 175.png";

//////////////////////////////////////////////
import JoinedUsersData from "./JoinedUsersData";
/////////////////////////////////////////////

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#118C94",
  fontSize: "10px",
  padding: "0px 0px ",
  height: "25px",
}));

function Post({
  post,
  called,
  seteffectRun,
  effectRun,
  feedEffectRun,
  setfeedEffectRun,
  userProfileFeedEffect,
  setuserProfileFeedEffect,
}) {
  const userContext = useContext(UserContext);
  const { currentUserMongoId, currentUserId } = userContext;
  const [commentsOpen, setcommentsOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState([]);
  const [commentsText, setCommentsText] = useState("");
  const [shouldEffectRun, setshouldEffectRun] = useState(false);
  const [checked, setchecked] = useState(false);
  const [postLikes, setpostLikes] = useState();
  const [liked, setLiked] = useState();
  const [isJoined, setisJoined] = useState(false);

  const [userWhoPosted, setuserWhoPosted] = useState();

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
  const [numberJoined, setnumberJoined] = useState(joined.length);
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  ///////////////////////////////////////////////////////////////
  const getJoinedUsers = async () => {
    const joinedU = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/joined/users/${_id}`
    );
    console.log(joinedU.data);
    return await joinedU.data;
  };

  const [joinedUsers, setJoinedUsers] = useState(false);
  ///////////////////////////////////////////////////////////////

  console.log(commentsOpen, showComment, "comments open");
  const clear = () => {
    setCommentsText("");
    setLiked("");
  };

  const joinPost = async () => {
    await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/joinPost/${currentUserMongoId}/${_id}`
    );
    // shouldEffectRun ? setshouldEffectRun(false) : setshouldEffectRun(true);
    // feedEffectRun ? setfeedEffectRun(false) : setfeedEffectRun(true);
  };
  const unjoinPost = async () => {
    await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/unjoinPost/${currentUserMongoId}/${_id}`
    );
    // feedEffectRun ? setfeedEffectRun(false) : setfeedEffectRun(true);
    // shouldEffectRun ? setshouldEffectRun(false) : setshouldEffectRun(true);
  };

  const deletePost = async (e, _id) => {
    try {
      e.preventDefault();
      await axios.delete(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/delete/post/${currentUserMongoId}/${_id}`
      );

      called === "userProfile"
        ? setuserProfileFeedEffect(!userProfileFeedEffect)
        : setfeedEffectRun(!feedEffectRun);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserFromCognitoId(postCognitoId).then((userWhoPostedData) =>
      setuserWhoPosted(userWhoPostedData)
    );
  }, []);

  useEffect(() => {
    allComments();
  }, [shouldEffectRun]);

  useEffect(() => {
    checkLike(currentUserMongoId, _id).then((bool) => setchecked(bool));
    checkJoin(currentUserMongoId, _id).then((bool) => {
      setisJoined(bool);
    });
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
      ) : (
        <IconButton aria-label="settings">
          <MoreVert />
        </IconButton>
      )}
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
      setpostLikes((postLikes) => postLikes - 1);
      await axios.get(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/unLike/${currentUserMongoId}/${_id}`
      );
      // shouldEffectRun ? setshouldEffectRun(false) : setshouldEffectRun(true);
    } catch (error) {
      console.log(error);
    }
  };
  const renderComments =
    comments.length > 0
      ? comments.map((data) => {
          return <Comment data={data} />;
        })
      : null;

  const addLikeAtPost = async () => {
    try {
      setpostLikes((postLikes) => postLikes + 1);
      await axios.get(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/addLike/users/${currentUserMongoId}/${_id}`
      );

      // shouldEffectRun ? setshouldEffectRun(false) : setshouldEffectRun(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Card width="100%" sx={{ margin: 2 }}>
        <Stack flexdirection="row">
          <CardHeader
            sx={{ padding: "10px" }}
            title={
              <Typography
                sx={{ fontSize: 16, fontWeight: 500, textDecoration: "none" }}
                color="text.primary"
                component={Link}
                to={`/userprofile/${postCognitoId}`}
              >
                {username}
              </Typography>
            }
            avatar={
              <Avatar
                src={userWhoPosted?.prfilePicture}
                sx={{
                  bgcolor: `#B24D74`,
                  textDecoration: "none",
                  width: "40px",
                  height: "40px",
                }}
                aria-label="recipe"
              >
                {username.substring(0, 1)}
              </Avatar>
            }
            action={
              <Stack flexDirection="row" alignItems="center">
                {currentUserId == postCognitoId ? (
                  <StyledButton
                    onClick={() =>
                      joined?.length > 0
                        ? setJoinedUsers(true)
                        : setJoinedUsers(false)
                    }
                    sx={{
                      fontSize: "10px",
                    }}
                    size="small"
                    variant="contained"
                  >
                    Check{" "}
                  </StyledButton>
                ) : isJoined === true ? (
                  <StyledButton
                    onClick={() => {
                      setisJoined(false);
                      setnumberJoined((numberJoined) => numberJoined - 1);
                      unjoinPost();
                    }}
                    size="small"
                    variant="contained"
                  >
                    Leave
                  </StyledButton>
                ) : joined?.length == limit ? (
                  <StyledButton
                    disabled
                    sx={{ paddingX: 1 }}
                    color="secondary"
                    size="small"
                    variant="contained"
                  >
                    Completed
                  </StyledButton>
                ) : (
                  <StyledButton
                    onClick={() => {
                      setisJoined(true);
                      setnumberJoined((numberJoined) => numberJoined + 1);
                      joinPost();
                    }}
                    size="small"
                    variant="contained"
                  >
                    Join
                  </StyledButton>
                )}
                {renderDeleteButton}
              </Stack>
            }
            subheader={date?.substring(0, 10)}
          />
        </Stack>

        <CardContent sx={{ padding: "10px" }}>
          <Typography
            sx={{ fontSize: 16, wordBreak: "break-all" }}
            variant="body2"
            color="text.primary"
          >
            {text}
          </Typography>
        </CardContent>

        <Stack sx={{ padding: "10px", width: "100%" }}>
          <Stack flexDirection="row" alignItems="center">
            <img src={calendarIcon} height={20} width={20} />
            <Typography mx={1}>
              {" "}
              {startTime?.substring(0, 10) + " " + startTime?.slice(11, 16)}
            </Typography>
          </Stack>
          <Stack my="3px" flexDirection="row" alignItems="center">
            <img src={peopleIcon} height={20} width={20} />
            <Typography mx={1}>
              {" "}
              {numberJoined}/{limit}
            </Typography>
          </Stack>
          <Stack flexDirection="row" alignItems="center">
            {tags?.map((el) => (
              <ShowTags tags={el} />
            ))}
          </Stack>

          <Divider
            sx={{
              alignSelf: "center",
              width: 1,
              marginTop: 1,
              fontWeight: 200,
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box display="flex" alignItems="center" direction="row">
              <Stack flexDirection="row" spacing={0} alignItems="center">
                <Tooltip title="">
                  <Checkbox
                    sx={{ width: 20, height: 20 }}
                    checked={checked}
                    onClick={
                      checked ? () => setchecked(false) : () => setchecked(true)
                    }
                    onChange={
                      checked
                        ? () => {
                            removeLikeAtPost();
                          }
                        : () => {
                            addLikeAtPost();
                          }
                    }
                    icon={<FavoriteBorder sx={{ width: 20, height: 20 }} />}
                    checkedIcon={
                      <Favorite sx={{ color: "red", width: 20, height: 20 }} />
                    }
                  />
                </Tooltip>
              </Stack>

              <Tooltip
                title=""
                onClick={() => {
                  setShowComment(!showComment);
                }}
              >
                <IconButton aria-label="add-comment">
                  <img src={commentIcon} height={20} width={20} />
                </IconButton>
              </Tooltip>
            </Box>

            <Box
              display="flex"
              direction="row"
              alignItems="center"
              sx={{ justifyContent: "space-between" }}
            >
              {/* <Tooltip title="Join room" sx={{ marginRight: 4 }}>
                  <IconButton
                    onClick={() =>
                      (window.location.href =
                        "https://d3rr23y8wyk3tl.cloudfront.net/")
                    }
                    aria-label="join-room"
                  >
                    <MeetingRoomIcon />
                  </IconButton>
                </Tooltip> */}
            </Box>
          </Stack>

          <Stack flexDirection="row">
            <Typography paddingRight="4px" paddingLeft="2px">
              {postLikes}
            </Typography>
            <Typography>{postLikes == 1 ? "Like" : "Likes"} </Typography>
          </Stack>
          <Stack flexDirection="row">
            <Button
              variant="text"
              disableRipple
              onClick={() =>
                comments.length > 0
                  ? setcommentsOpen(!commentsOpen)
                  : setcommentsOpen(commentsOpen)
              }
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "#fff",
                },
                padding: "2px",
                margin: 0,
                minHeight: 0,
                minWidth: 0,
              }}
            >
              {!commentsOpen
                ? comments.length > 0
                  ? `View all ${comments?.length} comments`
                  : "No Comments"
                : "Hide Comments"}
            </Button>
          </Stack>
          <Stack>
            {showComment ? (
              <>
                <FormControl>
                  <OutlinedInput
                    size="small"
                    id="outlined-adornment-weight"
                    placeholder="Type your comment"
                    value={commentsText}
                    endAdornment={
                      <InputAdornment position="end">
                        <StyledButton
                          onClick={() => {
                            postComment();
                            setcommentsOpen(!commentsOpen);
                            setShowComment(!showComment);
                          }}
                          sx={{ color: "white" }}
                        >
                          Done
                        </StyledButton>
                      </InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    onChange={(e) => setCommentsText(e.target.value)}
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                </FormControl>
                {/* <IconButton
                onClick={() => {
                  postComment();
                }}
              >
                <AddIcon />
              </IconButton> */}
              </>
            ) : null}
          </Stack>
          {commentsOpen ? renderComments : null}
          <Modal
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            open={joinedUsers}
            onClose={() => setJoinedUsers(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <JoinedUsersData
              setJoinedUsers={setJoinedUsers}
              _id={_id}
              getJoinedUsers={getJoinedUsers}
            />
          </Modal>
        </Stack>
      </Card>
    </>
  );
}

export default Post;
