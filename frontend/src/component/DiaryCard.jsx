import React from "react";
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
  const colors = [
    "bg-blue-100 dark:bg-blue-700",
    "bg-green-100 dark:bg-green-700",
    "bg-red-100 dark:bg-red-700",
  ];

  // Function to convert HTML to plain text
  const convertHtmlToPlainText = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.innerText || tempElement.textContent;
  };

  return (
    <article
      className="article w-full lg:w-[45%] min-h-[150px] border-2 flex items-start justify-evenly px-3 sm:px-5 py-5 sm:py-7 rounded-3xl shadow-xl bg-primary dark:bg-white/10 dark:backdrop-blur-sm text-secondary dark:text-darkPrimary cursor-pointer active:scale-[0.99] transition duration-500 underline-text overflow-hidden hover:border-indigo-300 my-4 hover:bg-[#f9faff] dark:hover:bg-gray-900 dark:border-indigo-900 dark:hover:border-indigo-700"
      onClick={gotoDiaryPage}
    >
      {/* date  */}
      <div className="hidden mr-3 text-center md:block">
        <div className="flex flex-col items-center w-full p-1 mr-3 border-2 rounded-lg shadow-md dark:border-gray-400 text-secondary">
          <p className="text-sm font-bold tracking-wider uppercase font-nunito text-secondary dark:text-darkPrimary">
            {month}
          </p>
          <p className="text-2xl font-medium font-unbounded text-secondary dark:text-darkPrimary">
            {day}
          </p>
        </div>
        <p className="mt-2 text-xs font-semibold tracking-widest text-gray-500 uppercase font-nunito dark:text-gray-400">
          {year}
        </p>
      </div>

      <div className="w-full overflow-hidden sm:px-2 entry-content">
        {/* mobile device date div */}
        <div className="block float-left mb-3 mr-3 text-center md:hidden">
          <div className="flex flex-col items-center w-full p-1 mr-3 border-[1px] rounded-lg shadow-lg dark:border-gray-400 text-secondary">
            <p className="text-xs font-bold tracking-wider uppercase font-nunito text-secondary dark:text-darkPrimary">
              {month}
            </p>
            <p className="text-xl font-medium font-unbounded text-secondary dark:text-darkPrimary">
              {day}
            </p>
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase font-nunito dark:text-gray-400">
              {year}
            </p>
          </div>
        </div>

        {/* content  */}
        <h3 className="mb-3 text-xl font-medium md:text-2xl font-unbounded">
          {highlightText(truncateText(props.heading, 15), props.query)}
        </h3>
        <p className="mb-3 ml-2 text-sm font-medium tracking-tight text-gray-500 md:ml-0 md:text-base text-pretty font-nunito dark:text-gray-400">
          &emsp; {truncateText(convertHtmlToPlainText(props.content), 200)}
        </p>

        <div className="flex flex-wrap items-center justify-center md:justify-start dark:text-darkPrimary">
          {tagsArray.map((tag, index) => (
            <p
              key={index}
              className={`${colors[index]} px-3 py-[2px] rounded-full font-semibold text-xs md:text-sm inline m-1`}
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
