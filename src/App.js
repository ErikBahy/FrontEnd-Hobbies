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
import ChatApp from "./ChatApp";

function App() {
  const userContext = useContext(UserContext);
  const [isLogged, setIsLogged] = useState(false);

  let key = localStorage.getItem("isLogged");
  console.log(key, "key");

  useEffect(() => {
    if (key === "true") {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [key]);

  console.log(isLogged, "is logged");

  useEffect(() => {
    userContext.getCurrentUserId().then((cognitoId) => {
      getMongoIdFromCognitoId(cognitoId).then((id) =>
        userContext.setcurrentUserMongoId(id)
      );
    });
  }, []);

  console.log(isLogged, " is logged ..");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={!isLogged ? <Login /> : <Navigate to={"/mainPage"} />}
        />
        <Route path="/mainPage" element={<MainPage />} />
        <Route
          path="/newpost"
          element={isLogged ? <NewPostModalNewPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/editprofile"
          element={isLogged ? <EditProfile /> : <Navigate to={"/"} />}
        />
        <Route
          path="/editmodal"
          element={isLogged ? <EditProfileModal /> : <Navigate to={"/"} />}
        />
        <Route
          path="/userprofile/:cognitoId"
          element={isLogged ? <UserProfile /> : <Navigate to={"/"} />}
        />
        <Route
          path="/chat/:postId"
          element={isLogged ? <ChatApp /> : <Navigate to={"/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
