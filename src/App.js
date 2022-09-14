import MainPage from "./MainPage/MainPage";
import UserProfile from "./UserProfile/UserProfile";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProfile from "./EditProfile/EditProfile";
import Navbar from "./Components/Navbar";
import { API, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react'; 
import '@aws-amplify/ui-react/styles.css';
function App() {
   async function callApi(){
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken
    console.log({ token })

    const requestInfo = {
      headers: {
          Authorization: token
      }
    }
    const data = await API.get('apiFH', '/', requestInfo)
    console.log({ data })
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default withAuthenticator(App);
