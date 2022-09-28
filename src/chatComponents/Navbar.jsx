import React from 'react';
import { Button } from '@mui/material';
/*const style = {
    nav: `bg-gray-800 h-20 flex justify-between items-center p-4`,
    heading: `text-white text-3xl`
}*/

const Navbar = () => {   
  return (
    <div className="nav-bar-chat">
      {/* <button>Go back</button> */}
      {/* <Button variant="contained" color="secondary" href="/mainpage">Mainpage</Button> */}
        <img src='/hobby-chat.png' alt="" height={200} width={160} style={{padding: 20}} />
        {/* <h1 className={style.heading}>Chat App</h1> */}
    </div>
  );
};

export default Navbar;
