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
      className="article w-full lg:w-[45%] min-h-[150px] border-2 flex items-start justify-evenly px-3 sm:px-5 py-5 sm:py-7 rounded-3xl shadow-xl bg-primary dark:bg-gray-900 text-secondary dark:text-darkPrimary cursor-pointer active:scale-[0.99] transition duration-500 underline-text overflow-hidden hover:border-indigo-300 my-3 md:my-4 hover:bg-[#f9faff] dark:hover:bg-gray-900 dark:border-indigo-900 dark:hover:border-indigo-700 relative group/pinToggle"
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

        {/* tags */}
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

      {/* pin */}
      <div
        className={`absolute top-0 right-0 z-20 p-2 mt-3 mr-3 group hover:scale-[1.08] active:scale-[0.98] transition duration-150 rounded-full  shadow-md ${
          props.isPinned
            ? "block bg-indigo-50 dark:bg-slate-700"
            : "block md:group-hover/pinToggle:block md:hidden bg-indigo-50 dark:bg-slate-800"
        }`}
        onClick={(event) => {
          event.stopPropagation();
          // get the diaryId of that diary that is clicked
          props.onTogglePin(props.diaryId);
        }}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="size-4 md:size-6 "
        >
          <path
            d="M3.30236 21.7764L7.77841 17.2961L6.69935 16.2163L2.22345 20.6965C1.92552 20.9947 1.92552 21.4782 2.22345 21.7764C2.52138 22.0747 3.00443 22.0747 3.30236 21.7764Z"
            fill="currentcolor"
          ></path>
          <path
            strokeWidth={1}
            stroke="currentcolor"
            fill={props.isPinned ? "currentcolor" : "none"}
            className="md:group-hover:fill-slate-500"
            d="M16.2188 4.83755L19.1835 7.80516C21.1954 9.81905 22.2014 10.826 21.9667 11.9115C21.7319 12.9969 20.4 13.4973 17.7362 14.4981L15.8922 15.191C15.1788 15.459 14.8221 15.593 14.5468 15.8314C14.4262 15.9358 14.3184 16.054 14.2254 16.1835C14.013 16.4795 13.9119 16.8472 13.7095 17.5825C13.2493 19.2551 13.0192 20.0914 12.4713 20.4041C12.2404 20.5358 11.9792 20.6049 11.7134 20.6045C11.0827 20.6036 10.4699 19.9902 9.24441 18.7635L7.77841 17.2961L6.69935 16.2163L5.28476 14.8C4.06698 13.581 3.45809 12.9715 3.45413 12.3446C3.45242 12.0735 3.5228 11.8069 3.65804 11.5721C3.97088 11.0289 4.80107 10.8 6.46145 10.3423C7.19811 10.1392 7.56644 10.0377 7.86251 9.82451C7.99536 9.72887 8.11619 9.61754 8.22239 9.49292C8.45908 9.2152 8.59063 8.85617 8.85373 8.1381L9.5217 6.31506C10.5086 3.62155 11.0021 2.2748 12.0904 2.03468C13.1788 1.79457 14.1921 2.8089 16.2188 4.83755Z"
          ></path>
        </svg>
      </div>
    </article>
  );
};

export default DiaryCard;
