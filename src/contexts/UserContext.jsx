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

  const [user, setUser] = useState([]);

  const getUserFromDatabase = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    const userId = currentUser.attributes.sub;
    const res = await axios.get(
      `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/user/632330ee7c09870d4bd5ce97`
    );
    setUser(res.data);
    console.log(res.data, "user data from context");
  };

  return (
    <UserContext.Provider
      value={{
        user: user,

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
