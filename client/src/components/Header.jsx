import React, { useState } from "react";
import "./Headers.css";
import { useUserContext } from "./ContextAPi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const ctx = useUserContext();
  const navigate = useNavigate();
  console.log("logState", ctx);
  const [btState, setBtState] = useState("Register");
  const userLog = () => {
    navigate("/");
    if (btState === "Login") {
      //   console.log("login");
      setBtState("Register");
      ctx.setLogState("Login");
    }
    if (btState === "Register") {
      setBtState("Login");
      ctx.setLogState("Register");
    }
  };
  const userLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
    ctx.setUserState(false)
  };
  return (
    <div className={"mainHead"}>
      <div className="headerHead">
        <div>
          <h2>LOGO</h2>
        </div>
        <div>
          {ctx.userState ? (
            <button onClick={userLogout}>logout</button>
          ) : (
            <button onClick={userLog}>{btState}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
