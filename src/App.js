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
<<<<<<< HEAD
        {/* <Route path="/editUser" element={<EditProfile />} /> */}
=======
        <Route path="/editUser" element={<EditProfile />} />
       
>>>>>>> 5ff6ef3f86dc90149e14233d05d0fe31ea7dc07d
      </Routes>
    </BrowserRouter>
  );
}

export default App;
