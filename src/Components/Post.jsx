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
import useCollapse from "react-collapsed";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import TagIcon from '@mui/icons-material/Tag';


function Post() {
  const { getToggleProps, getCollapseProps, isExpanded } = useCollapse({
    defaultExpanded: true
  });
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
          
          <div className="App">
      <button {...getToggleProps({ style: { display: "block" } })}>
        {isExpanded ? <Tooltip title="Comment">
          <IconButton aria-label="add-comment" >
          <AddCommentOutlinedIcon/>
          </IconButton>
          </Tooltip> : <Tooltip title="Comment">
          <IconButton aria-label="add-comment" >
          <AddCommentOutlinedIcon/>
          </IconButton>
          </Tooltip>}
      </button>
      <div
        {...getCollapseProps({
          style: {
            padding: 20,
            backgroundColor: "lightblue"
          }
        })}
      >
        <p style={{ margin: 0 }}>
          In the morning I walked down the Boulevard to the rue Soufflot for
          coffee and brioche. It was a fine morning. The horse-chestnut trees in
          the Luxembourg gardens were in bloom. There was the pleasant
          early-morning feeling of a hot day. I read the papers with the coffee
          and then smoked a cigarette. The flower-women were coming up from the
          market and arranging their daily stock. Students went by going up to
          the law school, or down to the Sorbonne. The Boulevard was busy with
          trams and people going to work.
        </p>
      </div>
    </div>

          </Box>

          <Tooltip title="Join room" sx={{marginRight:4}}>
          <IconButton aria-label="join-room" >
          <MeetingRoomIcon/>
          </IconButton>
          </Tooltip>


          
          
 
            </Stack>
        </CardActions>

      </Card>
    </Box>
  );
}

export default Post;
