import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router";
import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const DetailDiary = () => {
  const params = useParams();
  const currentDiaryId = params.diaryid;

  const [values, setValues] = useState({
    heading: "",
    content: "",
    saveDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [allowSave, setAllowSave] = useState(false);
  const [hedingError, setHeadingError] = useState("");
  const [editorError, setEditorError] = useState("");

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

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
        // console.log(response.data);

        setValues({
          heading: response.data.heading,
          content: response.data.content,
          saveDate: response.data.date,
        });

        // console.log(values);

        const fetchedTags = response.data.tags
          ? response.data.tags.split(",")
          : [];
        setTags(fetchedTags);

        setAllowSave(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
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

  // save to database
  const handleSaveClick = async () => {
    setIsSaving(true);

    if (values.heading.length === 0) {
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

      console.log("saved successfull");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSaving(false);
      setHeadingError("");
      setAllowSave(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  // limit heading
  const headingLimit = (e) => {
    setAllowSave(true);
    const newHeading = e.target.value;

    if (newHeading.length <= 30) {
      setValues({ ...values, heading: newHeading });
      setHeadingError("");
    } else {
      setHeadingError("Max length reached (30 characters)");
    }
  };

  // tags logic
  const colors = ["bg-blue-100", "bg-green-100", "bg-red-100"];

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
  console.log(formattedTime);

  return (
    <section>
      <div className=" bg-primary rounded-2xl px-10 py-8 max-w-5xl mx-auto mt-8 border-2 shadow-lg">
        {/* time and letters */}
        <div className="flex items-center justify-between mb-5">
          <div className="px-3 py-0 bg-indigo-100 rounded-full inline-block font-unbounded font-light text-xs tracking-widest">
            <span className="font-normal">
              {month} {day} ' {year}
            </span>{" "}
            : {formattedTime}
          </div>
          <div className="px-3 py-0 bg-indigo-100 rounded-full inline-block font-unbounded font-light text-xs tracking-widest">
            <span className="font-normal">120</span> letters
          </div>
        </div>

        {/* heading and save btn */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start w-4/5">
            <textarea
              name="heading"
              value={values.heading}
              onChange={headingLimit}
              placeholder="Enter your heading"
              spellCheck="false"
              autoCorrect="true"
              autoComplete="true"
              rows={1}
              className="font-unbounded font-medium text-3xl resize-none  w-full focus:outline-none border-b-2 border-solid border-gray-300 p-2 whitespace-nowrap overflow-hidden"
            >
              {values.heading}
            </textarea>
            <h2 className="error">{hedingError}</h2>
          </div>
          <div className="flex flex-col items-center w-1/5">
            {/* <button
              className={`simple-btn ${
                allowSave ? "" : "notallowed"
              } w-4/5 text-center`}
              onClick={handleSaveClick}
            >
              Save
            </button> */}
            {/* <h4 className="error">error</h4> */}

            <button
              // type="submit"
              className={`cursor-pointer mx-auto my-5 h-12 bg-indigo-400 font-semibold text-lg text-primary 
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
                  className="ml-2 text-secondary"
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
                className="border-b-2 border-gray-300 focus:outline-none px-2 py-1 w-full sm:w-2/4"
                placeholder="Enter 3 tag"
              />
            )}
          </div>
        </div>

        {/* editor */}
        <h4 className="error">{editorError}</h4>
        <div className="editor mt-8">
          <ReactQuill
            modules={module}
            value={values.content}
            onChange={(content) => {
              setValues({ ...values, content });
              setAllowSave(true);
            }}
            placeholder="Enter your content..."
          />
        </div>
      </div>
    </section>
  );
};

export default DetailDiary;
