import React, { useState, useEffect } from "react";
import background from '../../assets/Images/bg-2.jpg';
import petsyncvideo from '../../assets/Gifs/AI system analyzes.gif'
import AnimatedScrollSection from '../../components/WebPageContent/AnimatedScrollSection';

const heading = "AI‑Powered Diagnosis & Personalization";

const Petsync: React.FC = () => {
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    setAnimateText(true);
  }, []);

  return (
    <section
      className="relative bg-black bg-center py-16 lg:py-24 overflow-hidden"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-10 px-4 md:px-8 items-center">
        <div>
          <AnimatedScrollSection type="slide" delay={0.01}>
            <h2 className="mb-6 font-display text-md lg:text-5xl font-semibold leading-snug tracking-tight flex flex-wrap">
              {heading.split("").map((char, index) => (
                <span
                  key={index}
                  className={`inline-block ${animateText ? 'animate-glowPink' : ''}`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "both",
                    display: "inline-block",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
          </AnimatedScrollSection>
          <AnimatedScrollSection type="slide" delay={0.01}>
            <p className="text-white leading-relaxed max-w-prose">
              <span className="text-[#ed2c59]">
                Our integrated AI system analyzes your pet’s health data
              </span>   to offer personalized care recommendations, early diagnosis support,
              and customized wellness plans—helping you make informed decisions quickly.

            </p>
          </AnimatedScrollSection>
        </div>
        {/* <div className="flex justify-center md:justify-end">
          <img
            src={petsyncvideo}
            alt="PetSync AI Animation"
            className="w-64 sm:w-80 md:w-96 lg:w-[30rem] object-contain"
          />
        </div> */}
      </div>
    </section>
  );
};

export default Petsync;