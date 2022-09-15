import {
  Avatar,
  Box,
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
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddIcon from "@mui/icons-material/Add";
import "../stlyles.css";
import { Chip } from "@mui/material";

import { Link } from "react-router-dom";
import axios from "axios";

function Post(post) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const { username, text, tags, date, startTime, limit } = post.post;
  const clear = () => {
    setComments("");
  };
console.log(comments, "state comment");
const {
  texts
} = comments
    useEffect(()=>{
      const allComments=async()=>{
        /* const user = await Auth.currentAuthenticatedUser()
         const token = user.signInUserSession.idToken.jwtToken
         const requestInfo = {
             headers: {
                 Authorization: token
             }
           }*/
             try {
                const res = await axios.get(`https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/comments/post/630f472e08fc7cd993939a70`)
                console.log(res.data , "comment data");
                 setComments(res.data) 
             } catch (err) {
                 console.log(err)
             }
         }
      allComments()
  },[])

  // const postComments=async()=>{
  //   // const user = await Auth.currentAuthenticatedUser()
  //   // const token = user.signInUserSession.idToken.jwtToken
  //   // const requestInfo = {
  //   //     headers: {
  //   //         Authorization: token
  //   //     }
  //   //   }
  //       try {
  //          await axios.post(`https://egw1r79dz5.execute-api.eu-central-1.amazonaws.com/dev/newProduct`,{
  //               text:texts
  //          })
           
  //            clear()
  //           comments()
  //       } catch (err) {
  //           console.log(err)
  //       }
  //   }


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
                to="userprofile"
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
            action={
              <Stack direction="row">
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Stack>
            }
            subheader={date}
          />
        </Stack>

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
            <Box display="flex" direction="row">
              <Tooltip title="Like">
                <IconButton aria-label="add to favorites">
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite sx={{ color: "red" }} />}
                  />
                </IconButton>
              </Tooltip>

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
                label="Limit is: "
                color="primary"
                sx={{ marginRight: 3 }}
              />

              <Tooltip title="Join room" sx={{ marginRight: 4 }}>
                <IconButton aria-label="join-room">
                  <MeetingRoomIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </CardActions>
        {showComment ? (
          <>
            <Typography sx={{ my: 1 }}>Add Comment:</Typography>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              display={"flex"}
            >
              <FormControl>
                <OutlinedInput placeholder="Please enter text" />
              </FormControl>
              <IconButton>
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
              {
              comments.length > 0 ? comments.map((data) => {
                    return (
                        <Typography key={data._id}>
                          {data.text}
                        </Typography>
                    )
                   
                  }):null
                    } 
                    
              </AccordionDetails>
            </Accordion>
          </>
        ) : null}
      </Card>
    </Box>
  );
}

export default Post;
