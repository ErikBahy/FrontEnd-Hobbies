import React, { useEffect } from 'react';
import Navbar from './chatComponents/Navbar';
import Chat from './chatComponents/Chat';

import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { useState } from 'react';
import { getUserFromDatabase } from './apiCalls';
import { useParams } from 'react-router-dom';

const style = {
  appContainer: `max-w-[100vW] mx-auto text-center overflow-auto`,
  sectionContainer: `flex flex-col h-[90vh] bg-gray-100 mt-10 border relative`,
};

function ChatApp() {
 const [user , setUser] = useState()
 const userContext = useContext(UserContext)
 //const {postId} = useParams();
  

  useEffect(() => {
   getUserFromDatabase(userContext.currentUserId).then((userr)=>setUser(userr))
  }, [userContext.currentUserId]);
  return (
      <div className={style.appContainer}>
        <div className='{style.sectionContainer}'>
          <Navbar />
          
          {user ? <Chat user={user} /> : null}
        </div>

      </div>
  );
}

export default ChatApp;
