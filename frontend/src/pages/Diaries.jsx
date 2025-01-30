import React, { useEffect, useState } from "react";
import axios from "axios";
import DiaryCard from "../component/DiaryCard";
import { Link, useLocation, useNavigate } from "react-router";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Diary = () => {
  const [loading, setLoading] = useState(true);
  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [pinnedDiaries, setPinnedDiaries] = useState([]);

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
      } finally {
        setLoading(false);
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

  // pin and unpin
  const togglePin = (diaryId) => {
    // function creates an array which contains all pinned diarieId
    setPinnedDiaries((prevPinned) => {
      if (prevPinned.includes(diaryId)) {
        // If already pinned, unpin it
        return prevPinned.filter((id) => id !== diaryId);
      } else {
        // If not pinned, pin it
        return [...prevPinned, diaryId];
      }
    });
  };
  console.log(pinnedDiaries);

  // animation
  useGSAP(() => {
    let diaryTl = gsap.timeline();
    diaryTl.from(".diaries-header h1", {
      scale: 0.96,
      y: 50,
      opacity: 0,
      duration: 0.6,
    });
  });

  // error code
  if (error) {
    return (
      <section>
        {error === "No diaries avaliable." ? (
          <>
            <div className="flex items-start justify-between md:items-center md:flex-row md:mt-10 diaries-header">
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
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-center mt-14">
                <h3 className="text-lg font-bold md:text-2xl font-nunito text-secondary dark:text-darkPrimary underline-text-highlight">
                  {error}
                </h3>
                <svg
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="ml-3 size-7 md:size-11"
                >
                  <path d="M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12,3.667 C7.405,3.667 3.667,7.405 3.667,12 C3.667,16.595 7.405,20.333 12,20.333 C16.595,20.333 20.333,16.595 20.333,12 C20.333,7.405 16.595,3.667 12,3.667 Z M11.9986626,14.5022358 C12.5502088,14.5022358 12.9973253,14.9493523 12.9973253,15.5008984 C12.9973253,16.0524446 12.5502088,16.4995611 11.9986626,16.4995611 C11.4471165,16.4995611 11,16.0524446 11,15.5008984 C11,14.9493523 11.4471165,14.5022358 11.9986626,14.5022358 Z M11.9944624,7 C12.3741581,6.99969679 12.6881788,7.28159963 12.7381342,7.64763535 L12.745062,7.7494004 L12.7486629,12.2509944 C12.7489937,12.6652079 12.4134759,13.0012627 11.9992625,13.0015945 C11.6195668,13.0018977 11.3055461,12.7199949 11.2555909,12.3539592 L11.2486629,12.2521941 L11.245062,7.7506001 C11.2447312,7.33638667 11.580249,7.00033178 11.9944624,7 Z"></path>
                </svg>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center text-center mt-14">
              <h3 className="text-lg font-bold md:text-2xl font-nunito text-secondary dark:text-darkPrimary underline-text-highlight">
                {error}
              </h3>
              <svg
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="ml-3 size-7 md:size-11"
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
            className="fixed z-30 items-center p-3 bg-indigo-300 border-2 rounded-full shadow-lg cursor-pointer bottom-24 sm:p-4 sm:bottom-28 right-4 dark:bg-indigo-700 active:bg-indigo-200 active:dark:bg-indigo-900 md:relative md:bottom-auto md:right-auto md:bg-primary md:dark:bg-gray-600 md:flex md:p-2 md:px-5 md:mx-3 md:hover:border-indigo-300 md:hover:text-indigo-400 md:hover:px-10 active:scale-[0.98] transition-all duration-500 dark:border-indigo-800 md:dark:border-gray-400"
            onClick={handleNewEntryClick}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="1.5"
              className="block md:hidden text-primary md:text-current size-7"
            >
              <path
                d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M17 15V18M17 21V18M17 18H14M17 18H20"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>

            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="hidden md:block text-primary md:text-current size-7"
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
              className="text-base md:text-lg border-2 text-secondary dark:text-darkPrimary font-medium outline-none transition-all ease-in-out duration-500 bg-primary dark:bg-gray-600 shadow-lg rounded-full cursor-pointer focus:w-[200px] xl:focus:w-[300px] focus:cursor-text size-12 p-2 pl-11 focus:shadow-md focus:border-indigo-300 dark:border-gray-400"
              placeholder="Type to search..."
              spellCheck="false"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="relative mt-4 md:mt-10 diaries-content">
        {loading ? (
          // loading animation
          <div className="flex flex-col items-center justify-center">
            <svg
              className="p-2 duration-500 bg-indigo-400 rounded-full animate-spin dark:bg-indigo-700 size-12"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.1792 0.129353C10.6088 0.646711 8.22715 1.74444 6.16886 3.36616C4.13416 4.96799 2.42959 7.14686 1.38865 9.48493C0.202866 12.1414 -0.241805 15.156 0.125386 18.0413C0.684593 22.4156 3.02922 26.3721 6.63375 29.0186C8.01155 30.0301 9.65549 30.8757 11.2725 31.3997C12.0405 31.6518 13.4857 32 13.7518 32H13.8361V30.7232V29.4464L13.762 29.4331C11.8485 29.0252 10.2787 28.3818 8.7493 27.3802C7.50961 26.5644 6.29688 25.4402 5.40416 24.2794C3.88824 22.3095 2.98206 20.0908 2.66203 17.5736C2.57781 16.8905 2.57781 15.1029 2.66203 14.4396C2.88773 12.7317 3.31556 11.3288 4.06678 9.863C5.88589 6.3045 9.23103 3.67791 13.1286 2.746C13.4352 2.67303 13.7182 2.60671 13.762 2.59676L13.8361 2.58349V1.29009C13.8361 0.577066 13.8327 -0.00330353 13.8293 1.33514e-05C13.8226 1.33514e-05 13.5329 0.0597076 13.1792 0.129353Z"
                fill="white"
              ></path>
              <path
                d="M19.563 1.38627V2.67967L19.7078 2.71615C20.8768 3.01463 21.7527 3.32968 22.6723 3.78071C24.8249 4.84528 26.6878 6.467 28.042 8.47011C29.248 10.251 29.9858 12.2375 30.2654 14.4562C30.3126 14.831 30.326 15.1792 30.326 16.0149C30.326 17.169 30.2923 17.5869 30.1205 18.5022C29.7365 20.575 28.8404 22.5681 27.5266 24.2761C26.8158 25.2014 25.8019 26.2029 24.862 26.9027C23.3056 28.0634 21.7324 28.7997 19.7078 29.3137L19.563 29.3502V30.6436V31.9403L19.691 31.9204C20.0616 31.8541 21.1362 31.5689 21.6516 31.4031C24.8216 30.365 27.6041 28.3951 29.6152 25.7652C30.2789 24.8996 30.7337 24.1667 31.2356 23.1618C31.8959 21.8419 32.3102 20.6479 32.5999 19.2318C33.4354 15.1394 32.6606 10.9441 30.417 7.40886C28.4126 4.24833 25.3067 1.8373 21.692 0.640079C21.1867 0.470943 20.038 0.169149 19.7078 0.112772L19.563 0.0895557V1.38627Z"
                fill="white"
              ></path>
            </svg>
            <span className="mt-3 font-light capitalize font-unbounded">
              loading...
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-around gap-3 md:mt-12 md:px-4 entries">
            {filteredDiaries.length > 0 ? (
              filteredDiaries.map((diary) => (
                <DiaryCard
                  key={diary.diaryId}
                  query={query}
                  link={`/diaries/${diary.diaryId}`}
                  {...diary}
                  onTogglePin={togglePin}
                  isPinned={pinnedDiaries.includes(diary.diaryId)}
                />
              ))
            ) : (
              <h4 className="mt-10 text-xl font-bold md:mt-4 font-nunito text-secondary dark:text-darkPrimary">
                No diaries found for{" "}
                <span className="text-indigo-400">"{query}"</span>
              </h4>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Diary;
