import React from "react";
import { Route, Routes, useLocation } from "react-router";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NewDiary from "./pages/NewDiary";
import Navbar from "./component/Navbar";
import Diaries from "./pages/Diaries";

const App = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Routes location={location} key={location.pathname}>
        {/* <Route index element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diaries" element={<Diaries />} />
        <Route path="/diaries/12345" element={<NewDiary />} />
      </Routes>
    </>
  );
};

export default App;
