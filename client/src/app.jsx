import Navbar from "./components/skelton/navBar";

import { Routes, Route } from "react-router-dom";
import DefultPage from "./components/content/pages/defult";
import BrowsCourses from "./components/content/pages/browesCourse";
import ManageAcount from "./components/content/pages/manageAcount";
import ManageCourses from "./components/content/pages/manageCourse";
import Login from "./components/content/auth/login";
import Intro from "./components/content/pages/intro";
import UserHome from "./components/content/pages/main";
import ForgotPassword from "./components/content/auth/forgotPass";
import HomePage from "./components/content/pages/homePage";
import { useContext } from "react";
import { UserContext } from "./components/context/authContext";
const App = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar />

      <Routes>
        {!user ? <Route path="/" element={<Intro />} /> : <Route path="/" element={<HomePage />} />}
        <Route path="/creatpass" element={<ForgotPassword />} />
        <Route path="user" element={<DefultPage />}>
          <Route path="acount" element={<ManageAcount />} />
          <Route path="home" element={<UserHome />} />
          <Route path="browse" element={<BrowsCourses />} />
          <Route path="courses" element={<ManageCourses />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
