import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import Disp from "./components/Disp";
import "./App.css";
import LoginReg from "./components/LoginReg";
import Ct from "./components/Ct";

function App() {
  let [store, setStore] = useState({ token: "", username: "", _id:""});
  console.log();
  
  let updstore = (obj) => {
    setStore({ ...store, ...obj });
  };
  let obj = { store: store, updstore: updstore };

  return (
    <>
      <BrowserRouter>
      <Ct.Provider value={obj}>
        <Routes>
          <Route path="/" element={<LoginReg />} />
          <Route path="/disp" element={<Disp />} />
        </Routes>
        </Ct.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
