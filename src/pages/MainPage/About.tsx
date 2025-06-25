import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import heroImg from '../../assets/Images/pet-home.png';
import sideImg1 from '../../assets/Images/pets.jpg';
import sideImg2 from '../../assets/Images/dog2.jpg';
import sideImg3 from '../../assets/Images/pet-home.png';
import appstore from '../../assets/Images/apple.png';
import playstore from '../../assets/Images/playstore.png';
import pawAnim from '../../assets/Animation/paw-animation2.json';
import Lottie from 'lottie-react';

const heading = 'font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight text-white tracking-tight';
const subheading = 'text-white/90 text-base md:text-lg max-w-md leading-relaxed';
const btn = 'inline-block mt-8 px-6 py-3 bg-white text-sky-600 font-semibold rounded-full shadow-lg hover:bg-sky-100 transition';

// Animation variants for orchestrating entry effects
const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };
  

const textVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const heroImageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

const sideImageVariants = (index: number): Variants => ({
  hidden: {
    opacity: 0,
    x: index === 0 ? -100 : index === 1 ? 100 : 0,
    y: index === 2 ? 100 : 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
});

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const About: React.FC = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 3000);
    return () => clearInterval(id);
  }, []);

  const positions = [
    /* 0 → top-left */ 'absolute left-0 top-0',
    /* 1 → top-right */ 'absolute right-0 top-0',
    /* 2 → bottom-right */ 'absolute right-0 bottom-0',
  ];

  const sequence = [0, 2, 1];
  const sideImgs = [sideImg1, sideImg2, sideImg3];

  return (
<motion.section
  className="relative overflow-hidden bg-gradient-to-br from-sky-400 via-blue-300 to-cyan-400"
  initial="hidden"
  animate="visible"
  exit="exit"
  variants={containerVariants}
>

      <div className="pointer-events-none absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] before:bg-[length:20px_20px]" />
      <style>
        {`
          @keyframes rotateY {
            0% { transform: rotateY(0deg); }
            50% { transform: rotateY(180deg); }
            100% { transform: rotateY(360deg); }
          }
          .animate-rotateY {
            animation: rotateY 700ms ease-in-out;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-16">
        <motion.div className="flex-1 text-center lg:text-left" variants={textVariants}>
          <h1 className={heading}>
            Welcome to <span style={{ color: '#ed2c59' }}>PetSync 360</span>
          </h1>
          <motion.p className={`${subheading} mt-6`} variants={textVariants}>
            PetSync 360 is a smart, cloud-based care platform that empowers pet parents, veterinarians, and pet businesses with digital tools to track health, connect with professionals, shop essentials, and manage services—anytime, anywhere.
          </motion.p>
          <motion.p className={`${subheading} mt-6`} variants={textVariants}>
            From digital health records to IoT-based monitoring, from emergency teleconsultations to on-demand grooming and training, PetSync 360 simplifies your responsibilities and strengthens your pet’s wellbeing.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 items-center md:flex-row md:gap-4 md:justify-center lg:justify-start"
            variants={containerVariants}
          >
            <motion.a
              href="#"
              className="flex items-center gap-2 px-8 py-2 bg-white rounded-xl shadow-lg hover:bg-gray-100 transition"
              variants={buttonVariants}
            >
              <img src={playstore} alt="Play Store" className="w-6 h-6" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-gray-500">Get it on</span>
                <span className="text-base font-semibold text-gray-800">Play Store</span>
              </div>
            </motion.a>
            <motion.a
              href="#"
              className="flex items-center gap-2 px-8 py-2 bg-white rounded-xl shadow-lg hover:bg-gray-100 transition"
              variants={buttonVariants}
            >
              <img src={appstore} alt="App Store" className="w-6 h-6" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-gray-500">Download on the</span>
                <span className="text-base font-semibold text-gray-800">App Store</span>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div className="flex-1 relative flex justify-center perspective-[1000px]" variants={containerVariants}>
          <motion.img
            src={heroImg}
            alt="Main pet"
            className="w-72 sm:w-80 md:w-96 object-cover rounded-3xl shadow-2xl animate-float"
            variants={heroImageVariants}
          />
          {sideImgs.map((src, idx) => {
            const posIndex = sequence[(idx + step) % 3];
            const posClass = positions[posIndex];
            const z = posIndex === 0 ? 'z-30' : posIndex === 1 ? 'z-20' : 'z-10';
            const visibilityClass = posIndex === 2 ? 'hidden md:block lg:block' : 'hidden lg:block';

            return (
              <motion.img
                key={idx}
                src={src}
                alt=""
                className={`${posClass} ${z} ${visibilityClass} w-28 sm:w-32 md:w-36 rounded-full shadow-xl transition-all duration-700 ease-in-out animate-rotateY hover:scale-110`}
                variants={sideImageVariants(idx)}
              />
            );
          })}
        </motion.div>
      </div>
      {/* Wave Shape at Bottom */}
      <motion.div className="absolute bottom-0 left-0 right-0" variants={textVariants}>
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-[120px]"
        >
          <path d="M0 120V60C360 120 1080 0 1440 60V120H0Z" fill="#ffffff" />
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default About;