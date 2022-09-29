import React from "react";
import { Button } from "@mui/material";
import { Box, width } from "@mui/system";
/*const style = {
    nav: `bg-gray-800 h-20 flex justify-between items-center p-4`,
    heading: `text-white text-3xl`
}*/

const Navbar = () => {
  return (
    <div className="nav-bar-chat">
      <Box marginLeft={3}>
        <img src="/hobby-chat.png" alt="yo" height={40} width={200} />
      </Box>
      {/* <button>Go back</button> */}
      <Box
        m={1}
        //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button variant="contained" color="primary" href="/mainpage">
          Main page
        </Button>
      </Box>
      {/* <h1 className={style.heading}>Chat App</h1> */}
    </div>
  );
};

export default Navbar;
