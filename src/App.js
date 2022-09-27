import MainPage from "./MainPage/MainPage";
import UserProfile from "./UserProfile/UserProfile";
import Login from "./Authentication/authentication.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EditProfile from "./EditProfile/EditProfile";
import Navbar from "./Components/Navbar";
import { Auth, Hub } from "aws-amplify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { addUser, getMongoIdFromCognitoId } from "./apiCalls";
import NewPostModalNewPage from "./Components/NewPostModalNewPage";
import EditProfileModal from "./EditProfile/EditProfileModal";

function App() {
  const userContext = useContext(UserContext);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (useContext.currentUserMongoId === undefined) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, [userContext]);

  console.log(isLogged, "is logged");

  useEffect(() => {
    userContext.getCurrentUserId().then((cognitoId) => {
      getMongoIdFromCognitoId(cognitoId).then((id) =>
        userContext.setcurrentUserMongoId(id)
      );
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !isLogged ? <Login /> : <Navigate replace to={"/mainPage"} />
          }
        />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/newpost" element={<NewPostModalNewPage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/editmodal" element={<EditProfileModal />} />
        <Route path="/userprofile/:cognitoId" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
