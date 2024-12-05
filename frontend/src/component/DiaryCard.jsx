import React, { useState } from "react";
import { useNavigate } from "react-router";

const DiaryCard = (props) => {
  const navigate = useNavigate();

  const formatDate = () => {
    const date = new Date(props.date);

    // Format the date components
    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getUTCFullYear();

    // Format the time
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    return {
      day,
      month,
      year,
      formattedTime,
    };
  };

  const { day, month, year, formattedTime } = formatDate();

  const gotoDiaryPage = () => {
    navigate(`/diaries/${props.diaryId}`);
  };

  // truncate the text
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  // Highlight function
  const highlightText = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const tagsArray = props.tags ? props.tags.split(",") : [];

  // Array of color options
  const colors = ["bg-blue-100", "bg-green-100", "bg-red-100"];

  return (
    <article
      className=" w-full lg:w-[45%] min-h-[150px] border-2 flex items-start justify-evenly px-5 py-7 rounded-3xl shadow-xl bg-primary text-secondary cursor-pointer  active:scale-[0.99] transition duration-500 underline-text overflow-hidden hover:border-indigo-300 my-4 hover:bg-[#f9faff]"
      onClick={gotoDiaryPage}
    >
      <div className="text-center mr-3">
        <div className="border-2 flex flex-col items-center mr-3 p-1 rounded w-full shadow-md text-secondary">
          <p className="text-sm uppercase font-nunito font-bold tracking-wider text-secondary">
            {month}
          </p>
          <p className="text-2xl font-unbounded font-medium text-secondary">
            {day}
          </p>
        </div>
        <p className="text-xs uppercase font-nunito font-semibold tracking-widest text-gray-500 mt-2">
          {year}
        </p>
      </div>

      <div className="entry-content border-2w-5/6 px-2 w-full">
        <h3 className="text-2xl font-unbounded font-medium mb-3">
          {highlightText(truncateText(props.heading, 15), props.query)}
        </h3>
        <p className="text-base font-nunito font-medium tracking-tight text-gray-500 mb-3">
          &emsp; {truncateText(props.content, 200)}
        </p>

        <div className="flex items-center justify-start flex-wrap">
          {tagsArray.map((tag, index) => (
            <p
              key={index}
              className={`${colors[index]} px-3 py-[2px] rounded-full font-semibold text-sm inline m-1`}
            >
              #{truncateText(tag.trim(), 7)}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default DiaryCard;
