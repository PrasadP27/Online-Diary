import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React from "react";
import { Link } from "react-router";

const PageNotFound = () => {
  useGSAP(() => {
    gsap.from(".ani", {
      scale: 0.96,
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.3,
    });
  });
  return (
    <section className="flex flex-col items-center justify-center h-dvh w-full max-h-[900px] text-center text-secondary dark:text-darkPrimary transition duration-500">
      <h1 className="ani text-7xl sm:text-8xl md:text-[10rem] mb-7">
        4<span className="text-indigo-400 dark:text-indigo-700">0</span>4
      </h1>
      <h3 className="text-xl font-medium leading-snug text-left sm:text-2xl md:text-4xl ani font-unbounded dark:text-darkPrimary underline-text-highlight">
        Page not found
      </h3>
      <h5 className="mt-4 mb-8 text-base font-light leading-relaxed sm:text-xl md:text-2xl ani font-nunito dark:text-gray-400">
        Page you are looking for is here.
      </h5>
      <div className="">
        <Link to={"/"} className="m-5 simple-btn">
          Home
        </Link>
        <Link to={"/register"} className="m-5 simple-btn">
          Register
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
