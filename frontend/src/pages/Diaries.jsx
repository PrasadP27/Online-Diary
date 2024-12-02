import React, { useEffect, useState } from "react";
import axios from "axios";
import DiaryCard from "../component/DiaryCard";
import { Link, useNavigate } from "react-router";

const Diary = () => {
  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

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
  }, []);

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

  if (error) {
    return <div>{error}</div>;
  }

  // filter diaries
  const filteredDiaries = diaries.filter((diary) =>
    diary.heading.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section>
      <div className="diaries-header flex items-center justify-between mt-10">
        <h1>My Diaries</h1>

        <div className="flex items-center">
          <div
            className="p-2 px-5 mx-3 border-2 rounded-full bg-primary shadow-lg flex items-center transition-all duration-500 hover:border-indigo-300 hover:text-indigo-400 hover:px-10 cursor-pointer active:scale-[0.98]"
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
            <h4 className="ml-2 font-nunito font-bold">New Entry</h4>
          </div>

          <div className="relative text-primary">
            <div className="text-secondary absolute top-2/4 left-[13px] size-7 pointer-events-none -translate-y-1/2">
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
              className="text-lg border-2 text-secondary font-medium outline-none transition-all ease-in-out duration-500 bg-primary shadow-lg rounded-full cursor-pointer focus:w-[200px] xl:focus:w-[300px] focus:cursor-text size-12 p-2 pl-11 focus:shadow-md focus:border-indigo-300"
              placeholder="Type to search..."
              spellCheck="false"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="diaries-content mt-10 relative">
        {/* <div
          className="font-unbounded font-normal text-sm text-secondary inline-flex items-center justify-center bg-primary border-2 border-secondary px-5 py-2 rounded-lg  transition duration-500 shadow-sm hover:border-indigo-400 hover:text-indigo-500"
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
          <h4 className="ml-2">New Entry</h4>
        </div> */}
        <div className="entries mt-12 md:px-4 flex items-center justify-around flex-wrap gap-3">
          {filteredDiaries.map((diary) => {
            console.log(diary);

            return (
              <DiaryCard
                key={diary.diaryId}
                query={query}
                link={`/diaries/${diary.diaryId}`}
                {...diary}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Diary;
