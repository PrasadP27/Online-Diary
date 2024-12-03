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
    ["blockquote", "code-block"],
    // ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
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

  return (
    <section>
      <div className=" bg-primary rounded-2xl px-14 py-10 max-w-5xl mx-auto mt-8 border-2 shadow-lg">
        {/* <h2 className="font-unbounded text-3xl font-medium first-letter:uppercase">
          heading heasdinf asdhf haosdifh oasidhf
        </h2> */}
        <textarea
          name="heading"
          value={values.heading}
          onChange={(e) => setValues({ ...values, heading: e.target.value })}
          className="bg-blue-100 font-unbounded text-3xl font-medium first-letter:uppercase"
        >
          {values.heading}
        </textarea>
        <ReactQuill
          modules={module}
          value={values.content}
          onChange={(content) => setValues({ ...values, content })}
        />

        <button
          className="simple-btn"
          onClick={handleSaveClick}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </section>
  );
};

export default DetailDiary;
