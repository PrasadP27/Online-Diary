import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    const isvalid = dataValidCheck();
    if (!isvalid) {
      setIsLoading(false);
      return;
    }

    axios
      .post("http://localhost:8080/login", values, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res); // ---

        if (res.data) {
          setSuccessMessage(res.data.message);
          setValues({ email: "", password: "" });
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred during registration.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // show hide password toggle
  const passtoggle = () => {
    setPassVisible(!passVisible);
  };

  // data validation
  const dataValidCheck = () => {
    if (values.email.length === 0 || values.password.length === 0) {
      setError("Fields cannot be null.");
      return false;
    } else if (values.email.length > 40) {
      setError("Email is too long");
      return false;
    } else if (values.password.length > 30) {
      setError("Pssword is too long");
      return false;
    } else {
      return true;
    }
  };

  return (
    <section className="h-dvh">
      <div className="login-container flex items-center justify-around h-full w-full">
        <div className="login-left shadow-2xl w-5/12 p-3 bg-white rounded-3xl text-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col border-b-2 py-3 relative"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              autoComplete="username"
              className="font-nunito px-5 py-3 m-3 border-2 rounded-lg shadow-sm focus:outline-indigo-200 outline-2"
              required
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <div className="password relative m-3">
              <input
                type={passVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                className="w-full font-nunito px-5 py-3 border-2 rounded-lg shadow-sm focus:outline-indigo-200 outline-2"
                required
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              <span onClick={passtoggle}>
                {passVisible ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-4 top-0 translate-y-2/4 size-6 cursor-pointer z-10"
                  >
                    <path
                      d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
                      fill="#292D32"
                    ></path>
                    <path
                      d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
                      fill="#292D32"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-4 top-0 translate-y-2/4 size-6 cursor-pointer z-10"
                  >
                    <path
                      d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
                      fill="#292D32"
                    ></path>
                    <path
                      d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
                      fill="#292D32"
                    ></path>
                    <path
                      d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
                      fill="#292D32"
                    ></path>
                    <path
                      d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
                      fill="#292D32"
                    ></path>
                    <path
                      d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
                      fill="#292D32"
                    ></path>
                  </svg>
                )}
              </span>
            </div>

            <button
              type="submit"
              className={`cursor-pointer mx-auto my-5 h-12 bg-indigo-400 font-semibold text-lg text-white 
                  hover:bg-indigo-500 transition-all 
                  ${
                    isLoading
                      ? "w-11 h-11 rounded-full duration-500"
                      : "w-3/5 rounded-lg duration-500"
                  }`}
            >
              <svg
                className={`animate-spin ${
                  isLoading ? "block" : "hidden"
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
              <span className={`${isLoading ? "hidden" : "block"}`}>
                Register
              </span>
            </button>

            <h4 className="font-nunito text-red-600 font-semibold ">{error}</h4>
            <h4 className="font-nunito text-green-600 font-semibold ">
              {successMessage}
            </h4>
          </form>
          <Link
            to={"/register"}
            className="block mx-auto my-5 w-3/5 px-3 py-3 text-lg cursor-pointer font-semibold bg-green-400  text-white rounded-lg transition duration-300 hover:bg-green-500 hover:text-white active:bg-green-200"
          >
            Register
          </Link>
        </div>

        <div className="login-left border-s-8 border-secondary w-2/4 py-5">
          <div className="logo mb-3 ml-4 flex items-center font-unbounded text-gray-700">
            <svg
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="size-9 mr-1.5"
            >
              <path d="M470.7 20L368.2 49.81l41.5-28.09c-26.2 5.92-59.3 17.5-100.9 36.19l-67.9 70.79L265 79.25c-23.3 12.96-48 29.95-71.8 49.85l-15.8 64.3-3.4-47.6c-23.5 21.6-45.6 45.6-63.9 70.9-19.23 26.5-34.26 54.5-41.79 82.4l-28.12-18.8c2.52 23.7 10.31 44.3 23.09 63.2l-33.62-10.3c7.64 23.5 20.13 38.7 41.25 51-11.83 33.3-17.38 68.1-23.34 102.8l18.4 3.1C87.31 277.4 237.9 141.8 374 81.72l6.9 17.38c-121.7 54.5-216.3 146.5-265.8 279.1 18.1.1 35.8-2.1 52.2-6.3l4.9-60.9 13.1 55.5c10.9-4 20.9-8.8 29.8-14.4l-20.7-43.5 32.8 34.8c8-6.4 14.6-13.6 19.6-21.5 30.4-47.5 62.2-94.7 124.8-134.2l-45.7-16.2 70.1 2.1c11.4-5.8 23.4-12.9 32.5-19.6l-49.7-4 74.7-17.6c5.8-5.8 11.2-11.9 16.1-18 17.3-21.94 29-44.78 26.2-65.55-1.3-10.39-7.5-20.16-17.6-25.63-2.5-1.3-5.2-2.45-7.5-3.22z"></path>
            </svg>
            Inkwell
          </div>
          <h1 className="mb-3 ml-4">Login</h1>
          <h4 className="font-nunito text-xl font-medium ml-4">
            Take a moment to reflect. Log in to revisit your thoughts.
          </h4>
        </div>
      </div>
    </section>
  );
};

export default Login;
