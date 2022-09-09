import MainPage from "./MainPage/MainPage";
import UserProfile from "./UserProfile/UserProfile";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
       <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
        </BrowserRouter>
  );
}

export default App;
