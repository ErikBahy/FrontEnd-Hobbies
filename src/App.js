import MainPage from "./MainPage/MainPage";
import UserProfile from "./UserProfile/UserProfile";
import Login from "./Authentication/authentication.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProfile from "./EditProfile/EditProfile";
import Navbar from "./Components/Navbar";
import {  Auth ,Hub} from "aws-amplify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { getMongoIdFromCognitoId } from "./apiCalls";

function App() {
    const userContext = useContext(UserContext);

  useEffect(() => {
    userContext
      .getCurrentUserId()
      .then((cognitoId) =>
        getMongoIdFromCognitoId(cognitoId).then((id) =>
          userContext.setcurrentUserMongoId(id)
        )
      );
  }, []);

    

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/mainpage" element={<MainPage />}/>
        <Route path="/userprofile/:cognitoId" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
