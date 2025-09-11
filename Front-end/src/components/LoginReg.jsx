import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Disp from "./Disp";
import Ct from "./Ct";

// import "./App.css";

function LoginReg() {
  let [msg, setMsg] = useState("");
  let [data, setData] = useState({ _id: "", username: "", pass: "" });
  let navigate = useNavigate();
  let obj = useContext(Ct);
  let [flipped, setFlipped] = useState(false);

  const fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const reg = () => {
    axios
      .post(`http://localhost:5001/reg`, data)
      .then((res) => {
        // console.log('registration success');
        if ("msg" in res.data) {
          alert(res.data.msg);
          setData({ _id: "", username: "", pass: "" });
        } else {
          alert(res.data.err);
        }
      })
      .catch((error) => {
        console.log("axios error in reg");
      });
  };

  const login = () => {
    axios
      .post(`http://localhost:5001/login`, data)
      .then((res) => {
        // console.log('login success f');
        if (res.data.token != undefined) {
          obj.updstore(res.data);
          navigate("/disp");
        } else {
          if ("msg" in res.data) alert(res.data.msg);
          else alert(res.data.err);
        }
      })
      .catch((error) => {
        console.log("axios error in login");
      });
  };

  return (
    <div className="container">
      <div className={`flipcard ${flipped ? "flipped" : ""}`}>
        <div className="auth-box login">
          <h2>Login</h2>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="_id"
              value={data._id}
              onChange={fun}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="pass"
              value={data.pass}
              onChange={fun}
            />
          </div>
          <button className="submit-btn" onClick={login}>
            Log In
          </button>
          <div>
            Not a User{" "}
            <button
              className="signup"
              onClick={() => {
                setFlipped(true);
                setData({ _id: "", username: "", pass: "" });
              }}
            >
              Signup
            </button>
          </div>
        </div>

        <div className="auth-box register">
          <h2>Register</h2>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={data._id}
              name="_id"
              onChange={fun}
            />
          </div>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={data.username}
              name="username"
              onChange={fun}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={data.pass}
              name="pass"
              onChange={fun}
            />
          </div>
          <button className="submit-btn" onClick={reg}>
            Sign Up
          </button>
          <div>
            Already have an account?{" "}
            <button onClick={() =>{
                setFlipped(false);
                setData({ _id: "", username: "", pass: "" });
              }}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginReg;
