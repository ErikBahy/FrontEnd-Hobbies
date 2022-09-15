import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";

const UserContext = createContext();

function UserProvider(props) {
  const addUser = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    // const token = user.signInUserSession.idToken.jwtToken;
    const userId = currentUser.attributes.sub;
    axios.post(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/chechandpost/user/${userId}`,
      {
        username: "erik erik bahyyyyy",
        location: "me dhipa",
        bio: "naruto",
      }
    );
    console.log(userId);
  };
  const [currentUserId, setCurrentUserId] = useState();
  const getCurrentUserId = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();

    const userId = currentUser.attributes.sub;
    setCurrentUserId(userId);
  };

  const [user, setUser] = useState([]);

  const getUserFromDatabase = async (cognitoId) => {
    const currentUser = await Auth.currentAuthenticatedUser();
    const userId = currentUser.attributes.sub;

    const res = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/userCognitoForErikWithLove/${cognitoId}`
    );
    setUser(res.data);
    console.log(cognitoId, "cognito idfrom context");
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        getCurrentUserId: getCurrentUserId,
        currentUserId: currentUserId,

        addUser: addUser,
        setUser: setUser,
        getUserFromDatabase: getUserFromDatabase,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
