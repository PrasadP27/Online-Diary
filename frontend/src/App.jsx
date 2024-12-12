import React, { lazy } from "react";
import { Route, Routes, useLocation } from "react-router";

const Home = lazy(() => import("./pages/Home"));
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Diaries = lazy(() => import("./pages/Diaries"));
const DetailDiary = lazy(() => import("./pages/DetailDiary"));
// const PageNotFound = lazy(() => import("./pages/pageNotFound"));

const App = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <main>
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/diaries" element={<Diaries />} />
          <Route path="/diaries/:diaryid" element={<DetailDiary />} />
        </Routes>
      </main>
      {location.pathname !== "/register" &&
        location.pathname !== "/login" &&
        location.pathname !== "/diaries" && <Footer />}
    </>
  );
};

export default App;
