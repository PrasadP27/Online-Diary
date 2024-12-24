import React from "react";
import { Link } from "react-router";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroHome = useRef();

  // hero section
  useGSAP(
    () => {
      gsap.from(".hero", {
        scale: 0.96,
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.3,
      });
    },
    { scope: heroHome }
  );

  // info section
  useGSAP(() => {
    let infoTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".info",
        start: "top center",
        end: "top top",
        // markers: true,
        scrub: false,
      },
    });

    infoTl.from(
      ".info img",
      {
        xPercent: -20,
        opacity: 0,
        ease: "back.out(1)",
        duration: 1,
      },
      "same"
    );

    infoTl.from(
      ".info .info-div",
      {
        xPercent: 20,
        opacity: 0,
        ease: "back.out(1)",
        duration: 1,
      },
      "same"
    );
  });

  // features section
  useGSAP(() => {
    let featuresTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".features",
        start: "top center",
        end: "top top",
        // markers: true,
        scrub: false,
      },
    });

    featuresTl
      .from(".features h2", {
        scale: 0.96,
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.3,
      })
      .from(".features .features-img", {
        scale: 0,
      })
      .from(
        ".features .features-h3",
        {
          y: 50,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.2"
      )
      .from(
        ".features .features-info",
        {
          y: 50,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.1"
      );
  });

  // quote section
  useGSAP(() => {
    let quoteTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".quote",
        start: "top bottom",
        end: "top bottom",
        // markers: true,
        scrub: false,
      },
    });

    quoteTl
      .from(".quote", {
        scale: 0,
      })
      .to(".quote", {
        rotate: -3,
        ease: "power4.out",
      })
      .from(".quote .pin", {
        scale: 0,
        ease: "power4.out",
      });
  });

  // timeline section
  useGSAP(() => {
    let timelineTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "top top",
        // markers: true,
        scrub: false,
      },
    });

    timelineTl
      .from(".timeline h2", {
        scale: 0.96,
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.3,
      })
      .from(".timeline li", {
        y: 50,
        opacity: 0,
        stagger: 0.3,
      });
  });

  const features = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 md:size-7 lg:size-8"
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
          className="size-5 md:size-7 lg:size-8"
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
          className="size-5 md:size-7 lg:size-8"
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
          className="size-5 md:size-7 lg:size-8"
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
          className="size-5 md:size-7 lg:size-8"
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
          className="size-5 md:size-7 lg:size-8"
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
      <section
        className="flex flex-col items-center justify-center h-dvh w-full max-h-[900px] text-center pb-0"
        ref={heroHome}
      >
        <h1 className=" hero dark:text-darkPrimary">
          Your{" "}
          <span className="text-indigo-400 dark:text-indigo-700">
            Personal Diary
          </span>
          , Anytime, Anywhere
        </h1>
        <h3 className="font-light text-md sm:text-lg lg:leading-relaxed lg:text-2xl hero font-nunito mt-7 dark:text-gray-400">
          Your Thoughts are Precious – Write Them Down, Reflect on Them, <br />
          and Create a Space Just for You!
        </h3>
        <Link
          to={"/diaries"}
          className="hero px-6 sm:px-8 py-2 mt-6 bg-secondary font-unbounded font-light text-sm md:text-base lg:text-lg tracking-wide text-primary rounded-lg transition-colors duration-300 hover:bg-indigo-400 active:bg-indigo-300 cursor-pointer dark:bg-darkPrimary dark:text-secondary dark:hover:bg-indigo-700 dark:hover:text-darkPrimary dark:active:bg-indigo-500;"
        >
          Star today
        </Link>
      </section>

      {/* info */}
      <section className="flex flex-col-reverse items-start justify-between overflow-hidden md:flex-row info">
        <img
          src="assets/Frame 1.svg"
          alt=""
          className="md:w-[55%] mt-16 md:mt-0"
        />
        <div className="info-div md:w-[45%] pt-6 px-3">
          <h2 className="mb-4 ">
            Write <span className="underline-text-highlight">anything</span>{" "}
            from anywhere
          </h2>
          <p className="mb-6 text-sm font-normal sm:text-base font-nunito dark:text-gray-400">
            So often the diary is too far away in the shelf back home that you
            can’t write when you actually want to and then you forget it or
            don’t feel like writing anymore. But now you can write whenever you
            want and from wherever you are.
          </p>
          <Link
            to={"/diaries"}
            className="px-6 py-2 sm:py-3 bg-secondary font-unbounded font-light text-xs sm:text-sm tracking-wide text-primary rounded-lg transition duration-300 hover:bg-indigo-400 active:bg-indigo-300 cursor-pointer dark:bg-darkPrimary dark:text-secondary dark:hover:bg-indigo-700 dark:hover:text-darkPrimary dark:active:bg-indigo-500;"
          >
            Write now
          </Link>
        </div>
      </section>

      {/* Features  */}
      <section className="features">
        <h2 className="text-center ">
          All the <span className="underline-text-highlight">features</span>,
          <br />
          none of the clutter.
        </h2>

        <div className="flex flex-wrap mt-12 gap-7">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center flex-1 px-2 py-1 text-center sm:p-4 basis-80"
            >
              <div className="p-3 mb-5 bg-indigo-400 features-img rounded-2xl dark:bg-indigo-700 text-primary">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-medium sm:text-xl features-h3 font-unbounded">
                {feature.feature}
              </h3>
              <p className="text-sm font-normal sm:text-base features-info font-nunito dark:text-gray-400">
                {feature.featureText}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* quote  */}
      <section className="px-8 py-32">
        <div className="relative max-w-5xl px-4 py-10 mx-auto text-center text-gray-300 transition-colors duration-500 border-2 rounded-lg shadow-2xl bg-primary dark:bg-gray-900 dark:border-gray-400 quote">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="pin absolute size-7 md:size-12 -top-[10px] md:-top-[30px] left-2/4 fill-secondary dark:fill-darkPrimary transition-colors duration-500 z-10"
          >
            <path d="m4.774 15.287-2.105 3.25.224 1.063 1.06-.227 2.104-3.248a8.352 8.352 0 0 1-1.283-.838zm8.912-1.135c.014-.029.023-.061.036-.092.053-.117.1-.234.138-.357.006-.022.009-.044.016-.064a4.48 4.48 0 0 0 .098-.408v-.021c.195-1.169-.145-2.473-.923-3.651l1.11-1.714c1.279.163 2.385-.159 2.917-.982.923-1.423-.2-3.792-2.505-5.293C12.266.068 9.65.005 8.729 1.426c-.534.824-.378 1.967.293 3.073L7.91 6.213c-1.389-.233-2.716-.016-3.703.64-.006.002-.013.004-.017.008a3.735 3.735 0 0 0-.332.254c-.017.014-.037.027-.051.041a3.024 3.024 0 0 0-.271.272c-.02.024-.048.045-.067.07a3.102 3.102 0 0 0-.29.385c-1.384 2.133-.203 5.361 2.633 7.209 2.838 1.848 6.26 1.614 7.641-.519.087-.135.167-.276.233-.421zm-.815-9.958c-.887-.577-1.32-1.487-.965-2.036.354-.547 1.361-.522 2.246.055.889.577 1.318 1.489.965 2.036-.353.547-1.358.522-2.246-.055z"></path>
          </svg>

          <svg
            fill="currentcolor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute rotate-180 quotes-1 size-6 sm:size-12 top-4 left-5"
          >
            <path d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"></path>
          </svg>
          <h2 className="text-xl font-medium text-center sm:leading-relaxed md:leading-relaxed lg:leading-relaxed md:text-2xl lg:text-3xl font-unbounded text-secondary dark:text-darkPrimary">
            Ink your thoughts, <br /> each page is a step to your true self.
          </h2>
          <svg
            fill="currentcolor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute quotes-2 size-6 sm:size-12 bottom-4 right-5"
          >
            <path d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"></path>
          </svg>
        </div>
      </section>

      {/* timline */}
      <section className="px-8 pb-24 timeline pt-22">
        <h2 className="mb-10 text-center">
          Start your <span className="underline-text-highlight">journey</span>{" "}
          today
        </h2>
        <ol className="border-indigo-400 border-s dark:border-indigo-700 md:flex md:justify-center md:gap-8 md:border-s-0 md:border-t-2">
          <li>
            <div className="flex items-center pt-2 flex-start md:block md:pt-0">
              <div className="-ms-[5px] me-3 h-[12px] w-[12px] rounded-full bg-indigo-400 dark:bg-indigo-700 md:-mt-[5px] md:me-0 md:ms-0"></div>
              <p className="mt-2 text-xs font-semibold tracking-widest text-gray-600 uppercase font-nunito dark:text-gray-400">
                Register
              </p>
            </div>
            <div className="pb-5 mt-2 ms-4 md:ms-0">
              <h4 className="mb-1.5 text-xl font-medium font-unbounded">
                Create Your Account
              </h4>
              <p className="mb-3 font-light font-nunito dark:text-gray-400">
                Register for a new account to get started. Fill in your details
                and choose a secure password. This will allow you to access your
                diary from any device and keep your entries safe.
              </p>
            </div>
          </li>
          <li>
            <div className="flex items-center pt-2 flex-start md:block md:pt-0">
              <div className="-ms-[5px] me-3 h-[12px] w-[12px] rounded-full bg-indigo-400 dark:bg-indigo-700 md:-mt-[5px] md:me-0 md:ms-0"></div>
              <p className="mt-2 text-xs font-semibold tracking-widest text-gray-600 uppercase font-nunito dark:text-gray-400">
                Create
              </p>
            </div>
            <div className="pb-5 mt-2 ms-4 md:ms-0">
              <h4 className="mb-1.5 text-xl font-medium font-unbounded">
                Start Your First Entry
              </h4>
              <p className="mb-3 font-light font-nunito dark:text-gray-400">
                Start your journey by creating your first diary entry. Reflect
                on your day, jot down your thoughts, or set goals for the
                future.
              </p>
            </div>
          </li>
          <li>
            <div className="flex items-center pt-2 flex-start md:block md:pt-0">
              <div className="-ms-[5px] me-3 h-[12px] w-[12px] rounded-full bg-indigo-400 dark:bg-indigo-700 md:-mt-[5px] md:me-0 md:ms-0"></div>
              <p className="mt-2 text-xs font-semibold tracking-widest text-gray-600 uppercase font-nunito dark:text-gray-400">
                write
              </p>
            </div>
            <div className="pb-5 mt-2 ms-4 md:ms-0">
              <h4 className="mb-1.5 text-xl font-medium font-unbounded">
                Your Journey Awaits!
              </h4>
              <p className="mb-3 font-light font-nunito dark:text-gray-400">
                Incorporate journaling into your daily habits. Whether you jot
                down a few sentences or fill an entire page, each entry brings
                you closer to self-discovery. Embrace the journey and savor the
                experience!
              </p>
            </div>
          </li>
        </ol>
      </section>
    </>
  );
};

export default Home;
