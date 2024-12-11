import React from "react";
import { Link } from "react-router";

const Home = () => {
  const features = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-8"
        >
          <path
            d="M14 11H8M10 15H8M16 7H8M20 10V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12.5M18 21C18 21 21 19.5701 21 17.4252V14.9229L18.8124 14.1412C18.2868 13.9529 17.712 13.9529 17.1864 14.1412L15 14.9229V17.4252C15 19.5701 18 21 18 21Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      feature: "Your Private Diary",
      featureText:
        "Enjoy complete privacy with your diary. Every entry is exclusively yours.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-8"
        >
          <path
            d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M17 15V18M17 21V18M17 18H14M17 18H20"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      feature: "Quick Diary Creation",
      featureText:
        "Easily create new entries with just a click, capturing your thoughts in seconds.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-8"
        >
          <path
            d="M9.5 19.5V18H4.5C3.95 18 3.45 17.78 3.09 17.41C2.72 17.05 2.5 16.55 2.5 16C2.5 14.97 3.3 14.11 4.31 14.01C4.37 14 4.43 14 4.5 14H19.5C19.57 14 19.63 14 19.69 14.01C20.17 14.05 20.59 14.26 20.91 14.59C21.32 14.99 21.54 15.56 21.49 16.18C21.4 17.23 20.45 18 19.39 18H14.5V19.5C14.5 20.88 13.38 22 12 22C10.62 22 9.5 20.88 9.5 19.5Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M20.17 5.3L19.69 14.01C19.63 14 19.57 14 19.5 14H4.50001C4.43001 14 4.37001 14 4.31001 14.01L3.83001 5.3C3.65001 3.53 5.04001 2 6.81001 2H17.19C18.96 2 20.35 3.53 20.17 5.3Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7.98999 2V7"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 2V4"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      feature: "Theme Flexibility",
      featureText:
        "Switch effortlessly between dark and light themes to suit your mood.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="size-8"
        >
          <path
            fill="currentcolor"
            d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"
          ></path>
        </svg>
      ),
      feature: "Smart Search",
      featureText:
        "Quickly locate specific entries with our efficient search filter.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-8"
        >
          <path
            d="M2.66992 7.17003V5.35003C2.66992 4.20003 3.59992 3.28003 4.73992 3.28003H19.2599C20.4099 3.28003 21.3299 4.21003 21.3299 5.35003V7.17003"
            stroke="currentcolor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 20.7201V4.11011"
            stroke="currentcolor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M8.06006 20.72H15.9401"
            stroke="currentcolor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      feature: "Rich Text Features",
      featureText:
        "Enhance your entries with formatting options using our rich text editor.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="size-8"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              stroke="currentcolor"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M8 17H5a1 1 0 01-1-1v-5a2 2 0 012-2h12a2 2 0 012 2v5a1 1 0 01-1 1h-3M8 4h8v5H8V4zm0 11h8v4H8v-4z"
            ></path>
            <circle cx="7" cy="12" r="1" fill="currentcolor"></circle>
          </g>
        </svg>
      ),
      feature: "PDF Export",
      featureText:
        "Easily download your entries as PDFs for convenient sharing and storage.",
    },
  ];

  return (
    <>
      {/* hero section */}
      <section className="flex flex-col items-center justify-center h-dvh w-full max-h-[1000px] text-center">
        <h1 className="leading-snug text-6xl dark:text-darkPrimary">
          Your{" "}
          <span className=" text-indigo-400 dark:text-indigo-700">
            Personal Diary
          </span>
          , Anytime, Anywhere
        </h1>
        <h3 className="font-nunito font-light text-2xl mt-7 leading-relaxed dark:text-gray-400">
          Your Thoughts are Precious – Write Them Down, Reflect on Them, <br />
          and Create a Space Just for You!
        </h3>
        <Link
          to={"/diaries"}
          className="px-8 py-2 mt-6 bg-secondary font-unbounded font-light text-lg tracking-wide text-primary rounded-lg transition duration-300 hover:bg-indigo-400 active:bg-indigo-300 cursor-pointer dark:bg-darkPrimary dark:text-secondary dark:hover:bg-indigo-700 dark:hover:text-darkPrimary dark:active:bg-indigo-500;"
        >
          Star today
        </Link>
      </section>

      <section></section>

      {/* Features  */}
      <section>
        <h2 className="font-unbounded font-medium leading-snug text-4xl text-center dark:text-darkPrimary">
          All the features,
          <br />
          none of the clutter.
        </h2>

        <div className="gap-7 flex flex-wrap mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center flex flex-1 basis-80 items-center flex-col p-4"
            >
              <div className="p-3 rounded-2xl bg-indigo-400 mb-5 dark:bg-indigo-700 text-primary">
                {feature.icon}
              </div>
              <h3 className="font-unbounded font-medium text-xl mb-2">
                {feature.feature}
              </h3>
              <p className="font-nunito font-normal text-base dark:text-gray-400">
                {feature.featureText}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* quote  */}
      <section>
        <div className="relative max-w-5xl mx-auto bg-primary text-center rounded-3xl shadow-2xl border-2 px-4 py-10 text-gray-300 dark:bg-white/10 backdrop-blur-sm ">
          <svg
            fill="currentcolor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="size-12 rotate-180 absolute top-4 left-5"
          >
            <path d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"></path>
          </svg>
          <h2 className="text-3xl leading-relaxed font-unbounded font-medium text-secondary dark:text-darkPrimary">
            Ink your thoughts, <br /> each page is a step to your true self.
          </h2>
          <svg
            fill="currentcolor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="size-12 absolute bottom-4 right-5"
          >
            <path d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"></path>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Home;
