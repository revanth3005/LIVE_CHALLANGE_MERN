import React, { useEffect, useState } from "react";
import "./Register.css";
import { useUserContext } from "../../components/ContextAPi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const ctx = useUserContext();
  const navigate = useNavigate();
  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [lState, setLState] = useState({
    email: "",
    password: "",
  });
  const submitFormRegister = async (e) => {
    e.preventDefault();
    console.log(registerState);

    try {
      const res = await axios.post("http://localhost:5000/api/v1/register", {
        email: registerState.email,
        password: registerState.password,
        name: registerState.name,
      });
      console.log(res, "register");
      setRegisterState({
        email: "",
        password: "",
        name: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const submitFormLogin = async (event) => {
    event.preventDefault();
    console.log(lState);

    try {
      const res = await axios.post("http://localhost:5000/api/v1/login", {
        email: lState.email,
        password: lState.password,
      });
      console.log("res", res.data);
      localStorage.setItem("jwt", res.data?.jwt_token);
      setLState({
        email: "",
        password: "",
      });
      navigate("/task");
      ctx.setUserState(true);
    } catch (error) {
      console.log(error);
    }
  };
  const registerHandler = (event) => {
    setRegisterState({
      ...registerState,
      [event.target.name]: event.target.value,
    });
  };
  const loginHandler = (event) => {
    setLState({ ...lState, [event.target.name]: event.target.value });
  };

  return (
    <div className="formDiv">
      {ctx.logState === "Login" && (
        <form onSubmit={submitFormLogin}>
          <label htmlFor="emailId">Email</label>
          <input
            type="email"
            name="email"
            id="emailId"
            placeholder="enter email"
            value={lState.email}
            onChange={loginHandler}
          />
          <label htmlFor="pId">Password</label>
          <input
            type="password"
            name="password"
            id="pId"
            placeholder="enter Password"
            value={lState.password}
            onChange={loginHandler}
          />
          <input type="submit" value={"Login"} />
        </form>
      )}
      {ctx.logState === "Register" && (
        <form onSubmit={submitFormRegister}>
          <label htmlFor="nameId">Name</label>
          <input
            type="text"
            name="name"
            id="nameId"
            placeholder="enter name"
            value={registerState.name}
            onChange={registerHandler}
          />
          <label htmlFor="emailId">Email</label>
          <input
            type="email"
            name="email"
            id="emailId"
            placeholder="enter email"
            value={registerState.email}
            onChange={registerHandler}
          />
          <label htmlFor="pId">Password</label>
          <input
            type="password"
            name="password"
            id="pId"
            placeholder="enter Password"
            value={registerState.password}
            onChange={registerHandler}
          />
          <input type="submit" value={"Register"} />
        </form>
      )}
    </div>
  );
};

export default Register;
