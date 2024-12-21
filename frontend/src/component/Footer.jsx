import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-secondary w-full h-full p-5 text-primary dark:bg-[#0c0c0c] border-t-2 rounded-t-[3rem] mt-14 transition duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[auto,1fr,auto] gap-4 max-w-7xl mx-auto md:px-8 h-full w-full relative mb-32 md:mb-0">
        <div className="col-span-3 row-span-1 pt-4 my-5 text-center border-b-2 border-neutral-400">
          <h3 className="text-xl font-medium font-unbounded md:text-2xl">
            Need help?
          </h3>
          <p className="mb-3 font-light font-nunito text-neutral-400 dark:text-gray-400">
            Feel free to reach out to us
          </p>
          <div className="flex items-center justify-center mb-5 text-primary fill-primary">
            <div className="p-3 m-3 bg-indigo-400 twitter fill-primary dark:bg-indigo-700 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="size-4 sm:size-5"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </div>
            <div className="p-3 m-3 bg-indigo-400 facebook fill-primary dark:bg-indigo-700 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="size-4 sm:size-5"
              >
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </div>
            <div className="p-3 m-3 bg-indigo-400 insta fill-primary dark:bg-indigo-700 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="size-4 sm:size-5"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="col-span-2 row-span-1 overflow-auto md:col-span-2 font-nunito">
          {/* <a href="/" data-discover="true"></a> */}
          <Link
            to={"/"}
            className="flex items-center mb-2 text-xl font-medium sm:mb-4 logo font-unbounded"
          >
            <svg
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-8 md:h-11 mr-1.5"
            >
              <path d="M470.7 20L368.2 49.81l41.5-28.09c-26.2 5.92-59.3 17.5-100.9 36.19l-67.9 70.79L265 79.25c-23.3 12.96-48 29.95-71.8 49.85l-15.8 64.3-3.4-47.6c-23.5 21.6-45.6 45.6-63.9 70.9-19.23 26.5-34.26 54.5-41.79 82.4l-28.12-18.8c2.52 23.7 10.31 44.3 23.09 63.2l-33.62-10.3c7.64 23.5 20.13 38.7 41.25 51-11.83 33.3-17.38 68.1-23.34 102.8l18.4 3.1C87.31 277.4 237.9 141.8 374 81.72l6.9 17.38c-121.7 54.5-216.3 146.5-265.8 279.1 18.1.1 35.8-2.1 52.2-6.3l4.9-60.9 13.1 55.5c10.9-4 20.9-8.8 29.8-14.4l-20.7-43.5 32.8 34.8c8-6.4 14.6-13.6 19.6-21.5 30.4-47.5 62.2-94.7 124.8-134.2l-45.7-16.2 70.1 2.1c11.4-5.8 23.4-12.9 32.5-19.6l-49.7-4 74.7-17.6c5.8-5.8 11.2-11.9 16.1-18 17.3-21.94 29-44.78 26.2-65.55-1.3-10.39-7.5-20.16-17.6-25.63-2.5-1.3-5.2-2.45-7.5-3.22z"></path>
            </svg>
            Inkwell
          </Link>
          <p className="px-3 text-sm font-light leading-snug md:text-lg text-neutral-400">
            &emsp; Welcome to Inkwell, your personal online diary! Easily
            register and start documenting your thoughts and experiences in a
            secure space. With an intuitive interface, you can create new
            entries and revisit your memories effortlessly. Join our community
            today and let Inkwell be your trusted journaling companion!
          </p>
        </div>

        <div className="col-span-3 row-span-1 px-3 mx-auto overflow-auto md:col-span-1">
          <h3 className="text-lg uppercase font-nunito font-semibold tracking-[5px] my-3 ">
            Links
          </h3>
          <div className="flex flex-col items-start pl-4 text-sm font-light tracking-wider font-unbounded text-neutral-400">
            <Link to={"/"} className="my-2 underline-text">
              Home
            </Link>
            <Link to={"/register"} className="my-2 underline-text">
              Register
            </Link>
            <Link to={"/login"} className="my-2 underline-text">
              Login
            </Link>
            <Link to={"/diaries"} className="my-2 underline-text">
              Diaries
            </Link>
          </div>
        </div>

        <div className="col-span-3 row-span-1 my-5 mb-2 text-xs font-medium text-center md:text-left md:text-sm font-unbounded text-neutral-500">
          Copyright &copy; 2024 |{" "}
          <a
            href="https://github.com/prasadp27"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 dark:text-indigo-700"
          >
            Prasad Panchal
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
