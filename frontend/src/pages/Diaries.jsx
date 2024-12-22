import React, { useEffect, useState } from "react";
import axios from "axios";
import DiaryCard from "../component/DiaryCard";
import { Link, useLocation, useNavigate } from "react-router";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Diary = () => {
  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get("http://localhost:8080/diary", {
          withCredentials: true,
        });
        setDiaries(response.data.diary);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
      }
    };

    fetchDiaries();
  }, [location]);

  // random string generate
  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  // new entry
  const handleNewEntryClick = () => {
    const randomString = generateRandomString();
    navigate(`/diaries/${randomString}`);
  };

  // filter diaries
  const filteredDiaries = diaries.filter((diary) =>
    diary.heading.toLowerCase().includes(query.toLowerCase())
  );

  useGSAP(() => {
    let diaryTl = gsap.timeline();
    diaryTl
      .from(".diaries-header h1", {
        scale: 0.96,
        y: 50,
        opacity: 0,
        duration: 0.6,
      })
      .from(".diaries-content .entries", {
        opacity: 0,
      });
  });

  if (error) {
    return (
      <section>
        {error === "No diaries avaliable." ? (
          <>
            <div className="flex items-center justify-between mt-10 diaries-header">
              <h1>
                My <span className="underline-text-highlight">Diaries</span>
              </h1>

              <div className="flex items-center">
                <div
                  className="p-2 px-5 mx-3 border-2 rounded-full bg-primary dark:bg-gray-600 shadow-lg flex items-center transition-all duration-500 hover:border-indigo-300 hover:text-indigo-400  hover:px-10 cursor-pointer active:scale-[0.98] "
                  onClick={handleNewEntryClick}
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="size-7"
                  >
                    <line
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      x1="12"
                      x2="12"
                      y1="19"
                      y2="5"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      x1="5"
                      x2="19"
                      y1="12"
                      y2="12"
                    ></line>
                  </svg>
                  <h4 className="ml-2 font-semibold font-nunito">New Entry</h4>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-center mt-14">
                <h3 className="text-2xl font-bold font-nunito text-secondary dark:text-darkPrimary underline-text-highlight">
                  {error}
                </h3>
                <svg
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="ml-3 size-11"
                >
                  <path d="M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12,3.667 C7.405,3.667 3.667,7.405 3.667,12 C3.667,16.595 7.405,20.333 12,20.333 C16.595,20.333 20.333,16.595 20.333,12 C20.333,7.405 16.595,3.667 12,3.667 Z M11.9986626,14.5022358 C12.5502088,14.5022358 12.9973253,14.9493523 12.9973253,15.5008984 C12.9973253,16.0524446 12.5502088,16.4995611 11.9986626,16.4995611 C11.4471165,16.4995611 11,16.0524446 11,15.5008984 C11,14.9493523 11.4471165,14.5022358 11.9986626,14.5022358 Z M11.9944624,7 C12.3741581,6.99969679 12.6881788,7.28159963 12.7381342,7.64763535 L12.745062,7.7494004 L12.7486629,12.2509944 C12.7489937,12.6652079 12.4134759,13.0012627 11.9992625,13.0015945 C11.6195668,13.0018977 11.3055461,12.7199949 11.2555909,12.3539592 L11.2486629,12.2521941 L11.245062,7.7506001 C11.2447312,7.33638667 11.580249,7.00033178 11.9944624,7 Z"></path>
                </svg>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center text-center mt-14">
              <h3 className="text-2xl font-bold font-nunito text-secondary dark:text-darkPrimary underline-text-highlight">
                {error}
              </h3>
              <svg
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="ml-3 size-11"
              >
                <path d="M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12,3.667 C7.405,3.667 3.667,7.405 3.667,12 C3.667,16.595 7.405,20.333 12,20.333 C16.595,20.333 20.333,16.595 20.333,12 C20.333,7.405 16.595,3.667 12,3.667 Z M11.9986626,14.5022358 C12.5502088,14.5022358 12.9973253,14.9493523 12.9973253,15.5008984 C12.9973253,16.0524446 12.5502088,16.4995611 11.9986626,16.4995611 C11.4471165,16.4995611 11,16.0524446 11,15.5008984 C11,14.9493523 11.4471165,14.5022358 11.9986626,14.5022358 Z M11.9944624,7 C12.3741581,6.99969679 12.6881788,7.28159963 12.7381342,7.64763535 L12.745062,7.7494004 L12.7486629,12.2509944 C12.7489937,12.6652079 12.4134759,13.0012627 11.9992625,13.0015945 C11.6195668,13.0018977 11.3055461,12.7199949 11.2555909,12.3539592 L11.2486629,12.2521941 L11.245062,7.7506001 C11.2447312,7.33638667 11.580249,7.00033178 11.9944624,7 Z"></path>
              </svg>
            </div>
            <div className="mt-8 font-light font-unbounded">
              <Link to={"/"} className="mx-5 my-3 simple-btn">
                Home
              </Link>
              <Link to={"/register"} className="mx-5 my-3 simple-btn">
                Register
              </Link>
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="p-5 pt-10 pb-32 md:pt-24 md:pb-14 ">
      <div className="flex flex-col items-start justify-between md:items-center md:flex-row md:mt-10 diaries-header">
        <h1 className="mb-5 md:mb-0">
          My <span className="underline-text-highlight">Diaries</span>
        </h1>

        <div className="flex items-center">
          <div
            className="fixed z-30 items-center p-4 bg-indigo-300 border-2 rounded-full shadow-lg cursor-pointer bottom-24 sm:bottom-28 right-4 dark:bg-indigo-700 active:bg-indigo-200 active:dark:bg-indigo-900 md:relative md:bottom-auto md:right-auto md:bg-primary md:dark:bg-gray-600 md:flex md:p-2 md:px-5 md:mx-3 md:hover:border-indigo-300 md:hover:text-indigo-400 md:hover:px-10 active:scale-[0.98] transition-all duration-500"
            onClick={handleNewEntryClick}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="size-7"
            >
              <line
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                x1="12"
                x2="12"
                y1="19"
                y2="5"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                x1="5"
                x2="19"
                y1="12"
                y2="12"
              ></line>
            </svg>
            <h4 className="hidden ml-2 font-semibold font-nunito md:block">
              New Entry
            </h4>
          </div>

          <div className="relative text-primary dark:text-darkPrimary">
            <div className="text-secondary dark:text-darkPrimary absolute top-2/4 left-[13px] size-7 pointer-events-none -translate-y-1/2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              name="query"
              className="text-lg border-2 text-secondary dark:text-darkPrimary font-medium outline-none transition-all ease-in-out duration-500 bg-primary dark:bg-gray-600 shadow-lg rounded-full cursor-pointer focus:w-[200px] xl:focus:w-[300px] focus:cursor-text size-12 p-2 pl-11 focus:shadow-md focus:border-indigo-300"
              placeholder="Type to search..."
              spellCheck="false"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="relative mt-10 diaries-content">
        <div className="flex flex-wrap items-center justify-around gap-3 mt-12 entries md:px-4">
          {filteredDiaries.length > 0 ? (
            filteredDiaries.map((diary) => (
              <DiaryCard
                key={diary.diaryId}
                query={query}
                link={`/diaries/${diary.diaryId}`}
                {...diary}
              />
            ))
          ) : (
            <h4 className="text-xl font-bold font-nunito text-secondary dark:text-darkPrimary">
              No diaries found for{" "}
              <span className="text-indigo-400">"{query}"</span>
            </h4>
          )}
        </div>
      </div>
    </section>
  );
};

export default Diary;
