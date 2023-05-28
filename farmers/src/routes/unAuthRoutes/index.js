import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Home from "./Home";
import Register from "./register";
import Farmer from "./farmer";
import MyHeader from "../../components/UnAuthHeader";
import "./index.css";
import About from "./about";

function UnAuthenticatedRoutes() {
  return (
    <>
      <BrowserRouter >
        <MyHeader />
        <Routes >
          <Route index path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/farmers/:id" element={<Farmer />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
  
      </>
  );
}

export default UnAuthenticatedRoutes;
