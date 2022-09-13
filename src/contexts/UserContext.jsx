import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";

const UserContext = createContext();

function UserProvider(props) {
  const [user, setUser] = useState([]);

  const getUserFromDatabase = async () => {
    const res = await axios.get(
      "https://0tcdj2tfi8.execute-api.eu-central-1.amazonaws.com/dev/user/6320478c0864939b883df92f"
    );
    setUser(res.data);
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        getUserFromDatabase: getUserFromDatabase,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
