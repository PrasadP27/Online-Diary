import React from "react";
import { Route, Routes, useLocation } from "react-router";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./component/Navbar";
import Diaries from "./pages/Diaries";
import DetailDiary from "./pages/DetailDiary";

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
        <Route path="/diaries/:diaryid" element={<DetailDiary />} />
      </Routes>
    </>
  );
};

export default App;
