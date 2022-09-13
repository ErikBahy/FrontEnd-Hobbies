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
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import TagIcon from '@mui/icons-material/Tag';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import FormControl  from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput'
import AddIcon from '@mui/icons-material/Add';
import  "../stlyles.css"
import { Chip } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";



function Post() {
   
const[isExpanded,setIsExpanded]=useState(false)
const[showComment,setShowComment]=useState(false)

 
  return (
    <Box>
      <Card sx={{ margin: 5, borderRadius: "30px" }}>
       
<Stack flexdirection="row"   width="100%">
        <CardHeader

        title={
          <Typography sx={{ fontSize: 14, fontWeight: 150, textDecoration:"none" }} color="text.secondary" component={Link} to="userprofile">
          Username
        </Typography>
        }
          avatar={
            <Avatar sx={{ bgcolor: "red", textDecoration: "none" }} aria-label="recipe" >
              R
            </Avatar>
          }
          
          
          action={
             
             
<Stack  direction="row" >
<Stack  direction="row" spacing={1} justifyContent="space-between" sx={{  marginLeft : {xs: 2, sm:1}, marginTop : {xs: 0.5, sm:1} , marginRight : {xl: 6} }} >
      <Chip
        label="Futboll"
        deleteIcon={<DoneIcon />}
        variant="outlined"

      />
      <Chip
        label="Basketboll"
        deleteIcon={<DeleteIcon />}
        variant="outlined"
      />

</Stack>
                
            <IconButton aria-label="settings" >
             <MoreVertIcon />
            </IconButton>     
</Stack>
              

            
          }
          
          subheader="07/09/2022"

         
        />
</Stack>
       
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
         
         <CardActions >
          
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">

         <Box display="flex" direction="row" >
          
          <Tooltip title="Like" >
          <IconButton aria-label="add to favorites" >
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </IconButton>
          </Tooltip>
          
           <Tooltip title="Comment" onClick={()=>
          {
            setShowComment(!showComment)
          }}>
          <IconButton aria-label="add-comment">
          <AddCommentOutlinedIcon/>
          </IconButton>
          
          </Tooltip>
          </Box>

          <Tooltip title="Join room" sx={{marginRight:4}}>
          <IconButton aria-label="join-room" >
          <MeetingRoomIcon/>
          </IconButton>
          </Tooltip>


          
          
 
            </Stack>
        </CardActions>
        {
          showComment ? <>
           <Typography sx={{my:1 }}>Add Comment:</Typography>

<Box component="form" noValidate autoComplete="off" display={"flex"} onClick={""}>
<FormControl >
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
  onClick={()=>setIsExpanded(!isExpanded)}
>
  <Typography>Comment</Typography>
</AccordionSummary>
<AccordionDetails>
  <Typography>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    malesuada lacus ex, sit amet blandit leo lobortis eget.
  </Typography>
</AccordionDetails>
</Accordion> 
          </> : null
        }
       
  
      </Card>
      
    </Box>
  );
}

export default Post;
