import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";

const UserContext = createContext();

function UserProvider(props) {
  const [currentUserId, setCurrentUserId] = useState();
  const [loggedUser, setloggedUser] = useState();
  const [userMongoId, setuserMongoId] = useState();
  const [currentUserMongoId, setcurrentUserMongoId] = useState();
  const [isFollowed, setisFollowed] = useState();
  const getCurrentUserId = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();

    const userId = currentUser.attributes.sub;
    setCurrentUserId(userId);
    setloggedUser(currentUser);
    return userId;
  };

  const [user, setUser] = useState([]);

  const getUserFromDatabase = async (cognitoId) => {
    const currentUser = await Auth.currentAuthenticatedUser();
    const userId = currentUser.attributes.sub;

    const res = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/userCognitoForErikWithLove/${cognitoId}`
    );
    setUser(res.data);
    console.log(currentUser, "cognito idfrom context");
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        getCurrentUserId: getCurrentUserId,
        currentUserId: currentUserId,
        loggedUser: loggedUser,
        setUser: setUser,
        setuserMongoId: setuserMongoId,
        setcurrentUserMongoId: setcurrentUserMongoId,
        userMongoId: userMongoId,
        currentUserMongoId: currentUserMongoId,
        setisFollowed: setisFollowed,
        isFollowed: isFollowed,
        getUserFromDatabase: getUserFromDatabase,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
