import React from "react";
import { useState } from "react";
export const UserContext = React.createContext("");

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const logIn = () => {};
  const signUp = () => {};
  const logOut = () => {};

  return <UserContext.Provider value={{ user, logIn, signUp, logOut, setUser }}>{children}</UserContext.Provider>;
};

export default ContextProvider;
