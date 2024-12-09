import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <>
      {/* hero section */}
      <section className="flex flex-col items-center justify-center h-dvh w-full max-h-[1000px] text-center">
        <h1 className="leading-snug text-6xl">
          Your Personal Diary, Anytime, Anywhere
        </h1>
        <h3 className="font-nunito font-light text-2xl mt-7 leading-relaxed">
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
        <h2>
          All the features,
          <br />
          none of the clutter.
        </h2>
      </section>
    </>
  );
};

export default Home;
