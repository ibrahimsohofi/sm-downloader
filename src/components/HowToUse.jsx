import React, { useState, useContext } from "react";
import { ThemeContext } from '../App';

function HowToUse() {
  const { darkMode } = useContext(ThemeContext);

  const STEPS = [
    {
      step_title: "Step 01: Copy the Video Link",
      step_description: (
        <>
          Visit the video on{" "}
          <a className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} underline`} href="https://www.youtube.com" target="_blank" rel="noreferrer">
            YouTube
          </a>{" "}
          you want to download. Copy the link from the address bar or the
          'Share' option
        </>
      ),
      step_img: "img.jpg",
      img_alt: "Copying the video URL from YouTube",
    },
    {
      step_title: "Step 02: Paste the Link",
      step_description:
        "Open our website and paste the copied link into the input field",
      step_img: "img.jpg",
      img_alt: "Pasting the copied link in the input field",
    },
    {
      step_title: " Step 03: Click Download",
      step_description:
        "Hit the 'Download' button, and we'll handle the rest. Your video will start downloading in seconds!",
      step_img: "img.jpg",
      img_alt: "Clicking the download button to start downloading",
    },
  ];

  return (
    <section className={`flex flex-col p-2 sm:p-4 border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'} rounded-lg mx-2 sm:mx-3 my-2 sm:my-4 items-center justify-between animate-fade-in transition-colors duration-300`}>
      <h1
        className={`h-auto py-2 md:h-16 flex justify-center items-center text-center ${darkMode ? 'text-white border-gray-700 bg-gradient-to-bl from-gray-800 to-gray-900' : 'text-gray-900 border-b-gray-300 bg-gradient-to-bl from-gray-100 to-gray-200'}
          border-b-2 w-fit rounded-lg shadow-lg p-2 px-4 md:px-10 text-lg sm:text-xl md:text-3xl font-bold my-2 sm:my-3 md:m-3 animate-slide-up transition-colors duration-300`}
      >
        How to Download Videos in 3 Easy Steps{" "}
      </h1>
      <div className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-0 px-1 sm:px-2">
        {STEPS.map((info, index) => (
          <Card
            key={index}
            {...info}
            delay={index + 1}
            darkMode={darkMode}
          />
        ))}
      </div>
    </section>
  );
}

function Card({ step_title, step_description, step_img, img_alt, delay, darkMode }) {
  const [isHovered, setIsHovered] = useState(false);

  const animationClass = `animate-slide-up stagger-${delay}`;

  return (
    <article
      className={`w-full md:w-[32%] flex flex-col mb-4 md:mb-2 mx-1 items-center border rounded-lg p-2 sm:p-3
        transition-all duration-300 hover:shadow-md ${animationClass}
        ${darkMode
          ? `${isHovered ? 'transform scale-105 bg-gray-700 border-gray-600' : 'border-gray-700'}`
          : `${isHovered ? 'transform scale-105 bg-gray-100' : 'border-gray-300'}`}`
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className={`w-full text-center py-2 md:py-3 rounded-lg text-sm md:text-base font-bold transition-colors duration-300
        ${darkMode
          ? `${isHovered ? 'bg-gray-600 border-gray-500' : 'bg-gray-700 border-gray-600'} text-white`
          : `${isHovered ? 'bg-gray-300 border-gray-400' : 'bg-gray-200 border-gray-300'} text-gray-900`}
        border`
      }>
        {step_title}
      </h3>
      <p className={`text-center font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-900'} text-xs md:text-sm py-2 px-1 w-[99%] min-h-[40px] md:min-h-[56px]`}>
        {step_description}
      </p>

      <div className="overflow-hidden rounded-md w-full">
        <img
          className={`rounded-md shadow-md ${darkMode ? 'shadow-black/30' : 'shadow-gray-300'} object-cover w-full h-32 md:h-auto transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}
          src={`/images/${step_img}`}
          alt={img_alt}
        />
      </div>
    </article>
  );
}

export default HowToUse;
