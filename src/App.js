import MainPage from "./MainPage/MainPage";
import UserProfile from "./UserProfile/UserProfile";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProfile from "./EditProfile/EditProfile";
import Navbar from "./Components/Navbar";
function App() {
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

export default App;
