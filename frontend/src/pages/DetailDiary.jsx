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

        console.log(values);

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
    // setIsSaving(true);

    setAllowSave(false);

    // if (values.heading.length === 0) {
    //   return setHeadingError("Heading cannot be null");
    // }

    // try {
    //   const tagsString = tags.join(",");

    //   await axios.put(
    //     `http://localhost:8080/diary/${currentDiaryId}`,
    //     {
    //       heading: values.heading,
    //       content: values.content,
    //       tags: tagsString,
    //     },
    //     {
    //       withCredentials: true,
    //     }
    //   );

    //   console.log("saved successfull");
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   setIsSaving(false);
    // }
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
            <button
              className={`simple-btn ${
                allowSave ? "" : "notallowed"
              } w-4/5 text-center`}
              onClick={handleSaveClick}
            >
              Save
            </button>
            {/* <h4 className="error">error</h4> */}
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
        {/* <button
          className="simple-btn"
          onClick={handleSaveClick}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button> */}
      </div>
    </section>
  );
};

export default DetailDiary;
