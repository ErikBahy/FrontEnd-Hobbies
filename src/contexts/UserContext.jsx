import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";
import { getMongoIdFromCognitoId } from "../apiCalls";

const UserContext = createContext();

function UserProvider(props) {
  const [currentUserId, setCurrentUserId] = useState();
  const [loggedUser, setloggedUser] = useState();
  const [userMongoId, setuserMongoId] = useState();
  const [currentUserMongoId, setcurrentUserMongoId] = useState();
  const [isFollowed, setisFollowed] = useState();
  const [appEffect, setappEffect] = useState(false);

  const getCurrentUserId = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    const userId = currentUser.attributes.sub;
    setCurrentUserId(userId);
    setloggedUser(currentUser);
    return userId;
  };

  useEffect(() => {
    getCurrentUserId().then((cognitoId) =>
      getMongoIdFromCognitoId(cognitoId).then((id) => setcurrentUserMongoId(id))
    );
  }, []);

  const [user, setUser] = useState([]);

  async function signOut() {
    try {
      await Auth.signOut();
      window.location.reload(true);
      setappEffect(!appEffect);
      localStorage.removeItem("userLogged");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const getUserFromDatabase = async (cognitoId, setloading) => {
    try {
      const userAuth = await Auth.currentAuthenticatedUser();
      const token = userAuth.signInUserSession.idToken.jwtToken;
      const requestInfo = {
        headers: {
          Authorization: token,
        },
      };
      const currentUser = await Auth.currentAuthenticatedUser();
      const userId = currentUser.attributes.sub;

      const res = await axios.get(
        `https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/userCognitoForErikWithLove/${cognitoId}`,
        requestInfo
      );
      setUser(res.data);

      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        setappEffect: setappEffect,
        appEffect: appEffect,
        signOut: signOut,
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
