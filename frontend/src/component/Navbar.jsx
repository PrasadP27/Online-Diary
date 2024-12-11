import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

const Navbar = () => {
  const [profDropDown, setProfDropDown] = useState(false);
  const [user, setUser] = useState([]);

  const naviagte = useNavigate();
  const location = useLocation();

  // fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/", {
          withCredentials: true,
        });

        setUser(response.data.user);
      } catch (error) {
        console.log("Error:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, [location]);

  // logout user
  const userLogout = () => {
    axios
      .post("http://localhost:8080/logout", {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        console.log("user logout successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    naviagte("/");
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to add/remove the dark class on body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between max-w-7xl mx-auto backdrop-blur-sm bg-white/30 dark:bg-white/10 rounded-b-xl drop-shadow-md px-14 py-5 z-50">
      <Link
        to={"/"}
        className="logo font-unbounded font-medium flex items-center text-xl"
      >
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="h-11 mr-1.5"
        >
          <path d="M470.7 20L368.2 49.81l41.5-28.09c-26.2 5.92-59.3 17.5-100.9 36.19l-67.9 70.79L265 79.25c-23.3 12.96-48 29.95-71.8 49.85l-15.8 64.3-3.4-47.6c-23.5 21.6-45.6 45.6-63.9 70.9-19.23 26.5-34.26 54.5-41.79 82.4l-28.12-18.8c2.52 23.7 10.31 44.3 23.09 63.2l-33.62-10.3c7.64 23.5 20.13 38.7 41.25 51-11.83 33.3-17.38 68.1-23.34 102.8l18.4 3.1C87.31 277.4 237.9 141.8 374 81.72l6.9 17.38c-121.7 54.5-216.3 146.5-265.8 279.1 18.1.1 35.8-2.1 52.2-6.3l4.9-60.9 13.1 55.5c10.9-4 20.9-8.8 29.8-14.4l-20.7-43.5 32.8 34.8c8-6.4 14.6-13.6 19.6-21.5 30.4-47.5 62.2-94.7 124.8-134.2l-45.7-16.2 70.1 2.1c11.4-5.8 23.4-12.9 32.5-19.6l-49.7-4 74.7-17.6c5.8-5.8 11.2-11.9 16.1-18 17.3-21.94 29-44.78 26.2-65.55-1.3-10.39-7.5-20.16-17.6-25.63-2.5-1.3-5.2-2.45-7.5-3.22z"></path>
        </svg>
        Inkwell
      </Link>
      <ul className="font-unbounded font-light text-base flex items-center ">
        <li className="mr-8">
          <Link to={"/"} className="underline-text">
            Home
          </Link>
        </li>

        {user && (
          <li className="mr-8">
            <Link to={"/diaries"} className="underline-text">
              My Diaries
            </Link>
          </li>
        )}

        <li className="relative mr-8">
          <label
            className="themeToggle st-sunMoonThemeToggleBtn size-6 cursor-pointer relative block"
            type="checkbox"
          >
            <input
              type="checkbox"
              id="themeToggle"
              className="themeToggleInput"
              checked={isDarkMode}
              onChange={handleToggle}
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="none"
            >
              <mask id="moon-mask">
                <rect x="0" y="0" width="20" height="20" fill="white"></rect>
                <circle cx="11" cy="3" r="8" fill="black"></circle>
              </mask>
              <circle
                className="sunMoon"
                cx="10"
                cy="10"
                r="8"
                mask="url(#moon-mask)"
              ></circle>
              <g>
                <circle
                  className="sunRay sunRay1"
                  cx="18"
                  cy="10"
                  r="1.5"
                ></circle>
                <circle
                  className="sunRay sunRay2"
                  cx="14"
                  cy="16.928"
                  r="1.5"
                ></circle>
                <circle
                  className="sunRay sunRay3"
                  cx="6"
                  cy="16.928"
                  r="1.5"
                ></circle>
                <circle
                  className="sunRay sunRay4"
                  cx="2"
                  cy="10"
                  r="1.5"
                ></circle>
                <circle
                  className="sunRay sunRay5"
                  cx="6"
                  cy="3.1718"
                  r="1.5"
                ></circle>
                <circle
                  className="sunRay sunRay6"
                  cx="14"
                  cy="3.1718"
                  r="1.5"
                ></circle>
              </g>
            </svg>
          </label>
        </li>

        {!user ? (
          <li className="mr-3">
            <Link to={"/register"} className="simple-btn">
              Register
            </Link>
          </li>
        ) : (
          <div
            className="relative"
            onClick={() => setProfDropDown(!profDropDown)}
          >
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              xmlSpace="preserve"
              className="h-11 p-1 rounded-full bg-primary cursor-pointer border-2 transition duration-200 hover:shadow-md"
              style={
                profDropDown
                  ? { boxShadow: "0px 0px 0px 4px rgb(165 180 252)" }
                  : {}
              }
            >
              <path d="M80,71.2V74c0,3.3-2.7,6-6,6H26c-3.3,0-6-2.7-6-6v-2.8c0-7.3,8.5-11.7,16.5-15.2c0.3-0.1,0.5-0.2,0.8-0.4 c0.6-0.3,1.3-0.3,1.9,0.1C42.4,57.8,46.1,59,50,59c3.9,0,7.6-1.2,10.8-3.2c0.6-0.4,1.3-0.4,1.9-0.1c0.3,0.1,0.5,0.2,0.8,0.4 C71.5,59.5,80,63.9,80,71.2z"></path>
              <ellipse cx="50" cy="36.5" rx="14.9" ry="16.5"></ellipse>
            </svg>

            {profDropDown && (
              <div className="profile-drown absolute top-20 right-0 rounded-xl bg-primary p-2 pt-7 text-center min-w-56 shadow-xl border-2 dark:backdrop-blur-sm dark:bg-gray-900">
                {user && (
                  <span className="id font-nunito px-2 py-1 bg-indigo-200 rounded-md dark:bg-indigo-700">
                    ID: {user.id}
                  </span>
                )}
                <p className="p-2 my-2  border-b-2">{user?.name}</p>
                <p className="p-2 my-2  border-b-2">{user?.email}</p>
                <p
                  onClick={userLogout}
                  className="flex items-center justify-center p-2 my-2 rounded-md text-red-500 cursor-pointer hover:bg-red-50 transition duration-150 dark:hover:bg-red-950"
                >
                  <svg
                    viewBox="0 -0.5 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 mr-4 fill-red-500"
                  >
                    <path d="M11.75 9.874C11.75 10.2882 12.0858 10.624 12.5 10.624C12.9142 10.624 13.25 10.2882 13.25 9.874H11.75ZM13.25 4C13.25 3.58579 12.9142 3.25 12.5 3.25C12.0858 3.25 11.75 3.58579 11.75 4H13.25ZM9.81082 6.66156C10.1878 6.48991 10.3542 6.04515 10.1826 5.66818C10.0109 5.29121 9.56615 5.12478 9.18918 5.29644L9.81082 6.66156ZM5.5 12.16L4.7499 12.1561L4.75005 12.1687L5.5 12.16ZM12.5 19L12.5086 18.25C12.5029 18.25 12.4971 18.25 12.4914 18.25L12.5 19ZM19.5 12.16L20.2501 12.1687L20.25 12.1561L19.5 12.16ZM15.8108 5.29644C15.4338 5.12478 14.9891 5.29121 14.8174 5.66818C14.6458 6.04515 14.8122 6.48991 15.1892 6.66156L15.8108 5.29644ZM13.25 9.874V4H11.75V9.874H13.25ZM9.18918 5.29644C6.49843 6.52171 4.7655 9.19951 4.75001 12.1561L6.24999 12.1639C6.26242 9.79237 7.65246 7.6444 9.81082 6.66156L9.18918 5.29644ZM4.75005 12.1687C4.79935 16.4046 8.27278 19.7986 12.5086 19.75L12.4914 18.25C9.08384 18.2892 6.28961 15.5588 6.24995 12.1513L4.75005 12.1687ZM12.4914 19.75C16.7272 19.7986 20.2007 16.4046 20.2499 12.1687L18.7501 12.1513C18.7104 15.5588 15.9162 18.2892 12.5086 18.25L12.4914 19.75ZM20.25 12.1561C20.2345 9.19951 18.5016 6.52171 15.8108 5.29644L15.1892 6.66156C17.3475 7.6444 18.7376 9.79237 18.75 12.1639L20.25 12.1561Z"></path>
                  </svg>
                  Logout
                </p>
              </div>
            )}
          </div>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
