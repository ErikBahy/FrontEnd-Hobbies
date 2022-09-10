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


function Post() {
   
const[isExpanded,setIsExpanded]=useState(false)
 
  return (
    <Box>
      <Card sx={{ margin: 5, borderRadius: "30px" }}>
       <Stack flexdirection="row"   width="100%">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          
          
          action={
             
             <>

            <Button  variant="outlined"  startIcon={<TagIcon />} sx={{ borderRadius:4}}>
                Tags
            </Button> 
            
            <IconButton aria-label="settings" >
             <MoreVertIcon />
            </IconButton>     
              
              </>
            
          }
          title="Username"
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
          
           <Tooltip title="Comment">
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
        <Typography sx={{my:1 }}>Add Comment:</Typography>

        <Box component="form" noValidate autoComplete="off" display={"flex"}>
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
  
      </Card>
      
    </Box>
  );
}

export default Post;
