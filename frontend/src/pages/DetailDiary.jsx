import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFformat from "../component/PDFformat";

const DetailDiary = () => {
  const params = useParams();
  const currentDiaryId = params.diaryid;
  const navigate = useNavigate();

  const [values, setValues] = useState({
    heading: "",
    content: "",
    saveDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [allowSave, setAllowSave] = useState(false);

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [contentLength, setContentLength] = useState();

  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [hedingError, setHeadingError] = useState("");
  const [delError, setDelError] = useState("");
  const [delPopup, setDelPopup] = useState(false);

  // create new entry or fetch entry details
  useEffect(() => {
    const createDiary = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/diary/${currentDiaryId}`,
          {},
          {
            withCredentials: true,
          }
        );

        setValues({
          heading: response.data.heading,
          content: response.data.content,
          saveDate: response.data.date,
        });

        const sanitizedContent = response.data.content
          .replace(/<[^>]*>/g, "")
          .trim();
        setContentLength(sanitizedContent.length);

        const fetchedTags = response.data.tags
          ? response.data.tags.split(",")
          : [];
        setTags(fetchedTags);
      } catch (err) {
        setError(err.response ? err.response.data.message : "Error");
      } finally {
        setLoading(false);
        setAllowSave(false);
      }
    };

    createDiary();
  }, [isSaving]);

  // editor code
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],

    [{ color: [] }, { background: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  // limit heading
  const headingLimit = (e) => {
    setAllowSave(true);
    const inputValue = e.target.value;
    const capitalizedValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

    if (inputValue.length <= 30) {
      setValues({ ...values, heading: capitalizedValue });
      setHeadingError("");
    } else {
      setHeadingError("Max length reached (30 characters)");
    }
  };

  // tags logic
  const colors = [
    "bg-blue-100 dark:bg-blue-700",
    "bg-green-100 dark:bg-green-700",
    "bg-red-100 dark:bg-red-700",
  ];

  const handleKeyDown = (e) => {
    if (e.key === " " && tagInput.trim() !== "") {
      e.preventDefault();
      if (tags.length < 3) {
        setTags([...tags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };
  const handleDelete = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };
  const handleChange = (e) => {
    setAllowSave(true);
    const value = e.target.value;
    if (value.length <= 30) {
      setTagInput(value);
    }
  };

  // formatted date and time
  const formatDate = () => {
    const date = new Date(values.saveDate);

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

  // save to database
  const handleSaveClick = async () => {
    setIsSaving(true);

    if (values.heading.length === 0) {
      setIsSaving(false);
      return setHeadingError("Heading cannot be null");
    }

    try {
      const tagsString = tags.join(",");

      await axios.put(
        `http://localhost:8080/diary/${currentDiaryId}`,
        {
          heading: values.heading,
          content: values.content,
          tags: tagsString,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Saved successfull");
    } catch (err) {
      setUpdateError(
        err.response ? err.response.data.message : "Error updating."
      );
    } finally {
      setIsSaving(false);
      setHeadingError("");
      setAllowSave(false);
    }
  };

  // delete entry
  const deleteEntry = async () => {
    try {
      await axios.delete(`http://localhost:8080/diary/${currentDiaryId}`, {
        withCredentials: true,
      });
      navigate("/diaries");
    } catch (err) {
      setDelError(err.response ? err.response.data.message : "Error Occured");

      setTimeout(() => {
        setDelError("");
      }, 10000);
    }
  };

  // if loading
  if (loading) {
    return (
      <section className="flex items-center justify-center flex-col h-dvh">
        <svg
          className="animate-spin p-2 bg-indigo-400 dark:bg-indigo-700 size-14 rounded-full duration-500"
          width="33"
          height="32"
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
        <span className="mt-3 font-unbounded capitalize font-light">
          loading...
        </span>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="text-center">
          <div className="text-center mt-14 flex items-center justify-center">
            <h3 className="text-2xl font-nunito font-bold text-secondary dark:text-darkPrimary underline-text-highlight">
              {error}
            </h3>
            <svg
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="size-11 ml-3"
            >
              <path d="M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12,3.667 C7.405,3.667 3.667,7.405 3.667,12 C3.667,16.595 7.405,20.333 12,20.333 C16.595,20.333 20.333,16.595 20.333,12 C20.333,7.405 16.595,3.667 12,3.667 Z M11.9986626,14.5022358 C12.5502088,14.5022358 12.9973253,14.9493523 12.9973253,15.5008984 C12.9973253,16.0524446 12.5502088,16.4995611 11.9986626,16.4995611 C11.4471165,16.4995611 11,16.0524446 11,15.5008984 C11,14.9493523 11.4471165,14.5022358 11.9986626,14.5022358 Z M11.9944624,7 C12.3741581,6.99969679 12.6881788,7.28159963 12.7381342,7.64763535 L12.745062,7.7494004 L12.7486629,12.2509944 C12.7489937,12.6652079 12.4134759,13.0012627 11.9992625,13.0015945 C11.6195668,13.0018977 11.3055461,12.7199949 11.2555909,12.3539592 L11.2486629,12.2521941 L11.245062,7.7506001 C11.2447312,7.33638667 11.580249,7.00033178 11.9944624,7 Z"></path>
            </svg>
          </div>
          <div className="mt-8 font-unbounded font-light">
            <Link to={"/"} className="simple-btn mx-5 my-3">
              Home
            </Link>
            <Link to={"/register"} className="simple-btn mx-5 my-3">
              Register
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      <div className="relative bg-primary dark:backdrop-blur-sm dark:bg-white/10 rounded-2xl px-10 py-8 max-w-5xl mx-auto mt-8 border-2 shadow-lg">
        {/* time and letters */}
        <div className="flex items-center justify-between mb-5">
          <div className="px-3 py-0 bg-indigo-100 dark:bg-indigo-700 rounded-full inline-block font-unbounded font-light text-xs tracking-widest">
            <span className="font-normal">
              {month} {day} ' {year}
            </span>
            : {formattedTime}
          </div>
          <div className="px-3 py-0 bg-indigo-100 dark:bg-indigo-700 rounded-full inline-block font-unbounded font-light text-xs tracking-widest">
            <span className="font-normal">{contentLength}</span> letters
          </div>
        </div>

        {/* heading and save btn */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start w-4/5">
            <textarea
              name="heading"
              value={values.heading}
              onChange={headingLimit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              placeholder="Enter your heading"
              spellCheck="false"
              autoCorrect="true"
              autoComplete="true"
              rows={1}
              className="font-unbounded font-medium text-3xl resize-none  w-full focus:outline-none border-b-2 border-solid border-gray-300 p-2 whitespace-nowrap overflow-hidden bg-transparent"
            >
              {values.heading}
            </textarea>
            <h2 className="error">{hedingError}</h2>
          </div>
          <div className="flex flex-col items-center w-1/5 text-center">
            <button
              className={`cursor-pointer mx-auto my-5 h-12 bg-indigo-400 dark:bg-indigo-700 font-semibold text-lg text-primary 
                  hover:bg-indigo-500 transition-all 
                  ${
                    isSaving
                      ? "w-11 h-11 rounded-full duration-500"
                      : "w-3/5 rounded-lg duration-500"
                  } ${allowSave ? "" : "notallowed"}`}
              onClick={handleSaveClick}
            >
              <svg
                className={`animate-spin ${
                  isSaving ? "block" : "hidden"
                } mx-auto`}
                width="33"
                height="32"
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
              <span className={`${isSaving ? "hidden" : "block"}`}>Save</span>
            </button>
          </div>
        </div>

        <h4 className="font-nunito text-red-500 font-bold text-xl mt-2 text-center">
          {updateError}
        </h4>

        {/* tags */}
        <div className="relative mt-5">
          <div className="flex flex-wrap items-center justify-center">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`inline-flex items-center ${colors[index]} px-3 py-[2px] rounded-full font-semibold text-base inline m-1`}
              >
                #{tag}
                <button
                  className="ml-2 text-secondary dark:text-darkPrimary"
                  onClick={() => handleDelete(index)}
                >
                  &times;
                </button>
              </span>
            ))}
            {tags.length < 3 && (
              <input
                type="text"
                value={tagInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="border-b-2 border-gray-300 focus:outline-none px-2 py-1 w-full sm:w-2/4 dark:bg-transparent"
                placeholder="Enter 3 tag"
              />
            )}
          </div>
        </div>

        {/* editor */}
        <div className="editor mt-8">
          <ReactQuill
            modules={module}
            value={values.content}
            onChange={(content) => {
              setValues({ ...values, content });
              // Inline sanitization: Remove HTML tags and trim whitespace
              const sanitizedContent = content.replace(/<[^>]*>/g, "").trim();
              setContentLength(sanitizedContent.length);
              setAllowSave(true);
            }}
            placeholder="Enter your content..."
          />
        </div>

        <div className="other-btns bg-transparent absolute -right-16 top-20 flex items-center justify-center flex-col gap-5">
          <PDFDownloadLink
            document={
              <PDFformat heading={values.heading} content={values.content} />
            }
            fileName={values.heading + "-Inkwell"}
            className="diary-animation inline-flex bg-indigo-400 p-2 rounded-xl text-primary hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-400 transition-colors duration-500"
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="size-8"
            >
              <path
                stroke="currentcolor"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 17H5a1 1 0 01-1-1v-5a2 2 0 012-2h12a2 2 0 012 2v5a1 1 0 01-1 1h-3M8 4h8v5H8V4zm0 11h8v4H8v-4z"
              ></path>
              <circle cx="7" cy="12" r="1" fill="currentcolor"></circle>
            </svg>
          </PDFDownloadLink>

          <button
            className="diary-animation inline-flex bg-red-400 p-2 rounded-xl text-primary hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-400 transition-colors duration-500"
            onClick={() => setDelPopup(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-8 p-1"
            >
              <path
                d="M10 11V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M14 11V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M4 7H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {delPopup && (
        <div className="popup fixed h-dvh w-full top-0 left-0 bg-[#7b7f83a3] dark:bg-[#191a1ba3] z-50 p-3 flex items-end lg:items-center">
          <div className="popup-container bg-primary dark:bg-white/10 dark:backdrop-blur-sm flex items-center justify-center flex-col relative rounded-xl border-2  shadow-xl py-8 px-2 sm:px-4 md:px-7 mx-auto">
            <h2 className="font-unbounded font-semibold text-xl text-center text-red-500 mb-4">
              Are you sure?
            </h2>
            <p className="font-nunito font-medium text-center text-secondary dark:text-darkPrimary mb-7">
              Your diary will be deleted permanently deleted. Are your sure?
            </p>
            <button
              className="w-4/5 px-3 py-2 bg-red-300 hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-400 dark:border-0 border-2 m-2 text-primary rounded-lg transition-all duration-500 active:scale-[0.98]"
              onClick={deleteEntry}
            >
              Confirm
            </button>
            <button
              className="w-4/5 px-3 py-2 bg-indigo-300 dark:bg-indigo-700 dark:border-0 dark:hover:bg-indigo-500 hover:bg-indigo-500 border-2 m-2 text-primary rounded-lg transition-all duration-500 active:scale-[0.98]"
              onClick={() => setDelPopup(false)}
            >
              Cancel
            </button>
            <h4 className="error">{delError}</h4>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailDiary;
