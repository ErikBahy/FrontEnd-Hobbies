import React from 'react';
/*const style = {
    nav: `bg-gray-800 h-20 flex justify-between items-center p-4`,
    heading: `text-white text-3xl`
}*/

const Navbar = () => {
  return (
    <div className="nav-bar-chat">
        <img src='/Sport-chat.png' alt="" height={200} width={180} style={{paddingTop: 12,paddingLeft: 20, 
                                                                      paddingBottom: 12, paddingRight: 20}} />
        {/* <h1 className={style.heading}>Chat App</h1> */}
    </div>
  );
};

export default Navbar;
