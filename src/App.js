import MainPage from "./MainPage/MainPage";
import UserProfile from "./UserProfile/UserProfile";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProfile from "./EditProfile/EditProfile";
import Navbar from "./Components/Navbar";
import { API, Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";

import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
  async function callApi() {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    console.log({ token });

    const requestInfo = {
      headers: {
        Authorization: token,
      },
    };
    const data = await API.get("apiFH", "/", requestInfo);
    console.log({ data });
  }
  const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.getCurrentUserId();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/userprofile/:cognitoId" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default withAuthenticator(App);
