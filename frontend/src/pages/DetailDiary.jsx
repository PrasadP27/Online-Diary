import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DetailDiary = () => {
  const params = useParams();
  const currentDiaryId = params.diaryid;

  const [values, setValues] = useState({ heading: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hedingError, setHeadingError] = useState("");

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
        console.log(response.data);
        setValues({
          heading: response.data.heading,
          content: response.data.content,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    createDiary();
  }, [currentDiaryId]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    // ["blockquote", "code-block"],
    // ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    // [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      await axios.put(
        `http://localhost:8080/diary/${currentDiaryId}`,
        {
          heading: values.heading,
          content: values.content,
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  // limit heading
  const headingLimit = (e) => {
    const newHeading = e.target.value;

    if (newHeading.length <= 30) {
      setValues({ ...values, heading: newHeading });
      setHeadingError("");
    } else {
      setHeadingError("Max length reached (30 characters)");
    }
  };

  return (
    <section>
      <div className=" bg-primary rounded-2xl px-10 py-8 max-w-5xl mx-auto mt-8 border-2 shadow-lg">
        {/* <h2 className="font-unbounded text-3xl font-medium first-letter:uppercase">
          heading heasdinf asdhf haosdifh oasidhf
        </h2> */}
        <div className="flex items-center justify-between mb-5">
          <div className="px-3 py-0 bg-indigo-100 rounded-full inline-block font-unbounded font-light text-xs tracking-widest">
            <span className="font-normal">Sept 27 ' 2024</span> : 12:23 am
          </div>
          <div className="px-3 py-0 bg-indigo-100 rounded-full inline-block font-unbounded font-light text-xs tracking-widest">
            <span className="font-normal">120</span> words
          </div>
        </div>

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
            <div className="simple-btn w-4/5 text-center">Save</div>
            {/* <h4 className="error">error</h4> */}
          </div>
        </div>

        <div className="tags flex items-center">
          <div className="tag1"></div>
          <div className="tag2"></div>
          <div className="tag3"></div>
        </div>

        {/* <div className="editor">
          <ReactQuill
            modules={module}
            value={values.content}
            onChange={(content) => setValues({ ...values, content })}
          />
        </div> */}

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
