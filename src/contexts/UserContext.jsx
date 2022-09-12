import React, { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();

function UserProvider(props) {
  const [user, setUser] = useState({
    userId: "11341dg",
    username: "fane",
    location: "tirane",
    bio: "adgadgadgadadgadgadgadadgadgadgadadgadgadgadadgadgadgadadgadgadgadadgadgadgadadgadgadgadadgadgadgadadgadgadgadadgadgadgadadgadgadgad",
    followed: [],
    followers: 4,
    posts: 5,
    comment: [],
  });

  return (
    <UserContext.Provider
      value={{
        user: user,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
