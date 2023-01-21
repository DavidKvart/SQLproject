import Signup from "../auth/signUp";
import { useState } from "react";
import Login from "../auth/login";

const Intro = () => {
  const [authType, setAuthType] = useState(true);
  const handleAuth = () => {
    let temp = !authType;
    setAuthType(temp);
  };
  return (
    <div className="mainContainer">
      <div className="imageContainer">
        <img style={{ width: "100%" }} src="/images/students.jpg" alt="err" />
      </div>
      <div className="signUp">
        <button type="button" class="btn btn-light" onClick={handleAuth}>
          Login
        </button>
        <button type="button" class="btn btn-light" onClick={handleAuth}>
          sign up
        </button>
        {localStorage.getItem("token") ? <div>blala</div> : authType ? <Signup /> : <Login />}
      </div>
    </div>
  );
};

export default Intro;
