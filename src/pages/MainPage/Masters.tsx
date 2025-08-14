import React, { useState } from "react";
import { motion, AnimatePresence, Variants, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Lottie from "lottie-react";
import petLottie1 from "../../assets/Animation/welcome.json";
import petLottie2 from "../../assets/Animation/whatispetsyc.json";
import petLottie3 from "../../assets/Animation/Aidiagnosis.json";

interface TimelineItem {
  title: string;
  summary: string;
  content: React.ReactNode;
  lottie: object; // Lottie animation JSON
}

const cardVariants: Variants = {
  initial: { opacity: 0, rotateY: 90, scale: 0.85, y: 50 },
  animate: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut, type: "spring", stiffness: 100 },
  },
};

const buttonVariants: Variants = {
  hover: {
    scale: 1.15,
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.5)",
    backgroundColor: "#22d3ee",
    transition: { duration: 0.3, ease: easeOut },
  },
  tap: { scale: 0.9 },
};

const textVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const Timeline: React.FC<{ data: TimelineItem[] }> = ({ data }) => {
  return (
    <div className="relative mx-auto max-w-7xl py-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {data.map((item, index) => (
          <TimelineCard key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

const TimelineCard: React.FC<{ item: TimelineItem; index: number }> = ({ item, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      transition={{ delay: index * 0.25 }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
      className="relative w-full rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        style={{ transformStyle: "preserve-3d", width: "100%", minHeight: 420 }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute w-full h-full p-6 text-white flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-transparent"
            animate={{
              borderColor: [
                "rgba(34, 211, 238, 0.3)",
                "rgba(34, 211, 238, 0.7)",
                "rgba(34, 211, 238, 0.3)",
              ],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />

          {/* Lottie Animation Container with fixed size */}
          <div
            className="flex justify-center items-center mb-4 rounded-lg shadow-md mx-auto"
            style={{ width: 200, height: 200 }}
          >
            <Lottie
              animationData={item.lottie}
              loop={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <motion.h2 variants={textVariants} className="text-2xl font-bold mb-2 font-cinzel">
            {item.title}
          </motion.h2>
          <motion.p variants={textVariants} className="text-sm text-gray-300 flex-grow font-playfair">
            {item.summary}
          </motion.p>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="mt-4 rounded-lg bg-cyan-600 px-5 py-2 text-sm font-jost "
          >
            See Details
          </motion.button>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-cyan-900/95 to-gray-800/95 p-6 rounded-xl text-white flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-transparent"
            animate={{
              borderColor: [
                "rgba(34, 211, 238, 0.3)",
                "rgba(34, 211, 238, 0.7)",
                "rgba(34, 211, 238, 0.3)",
              ],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
          <motion.h2 variants={textVariants} className="text-2xl font-bold mb-3 font-cinzel">
            {item.title}
          </motion.h2>
          <motion.div variants={textVariants} className="text-sm text-gray-200 flex-grow font-jost">
            {item.content}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const titleVariants: Variants = {
  initial: {
    rotateX: 90,
    opacity: 0,
    y: 40,
  },
  animate: {
    rotateX: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easeOut, // Use the easing function here
    },
  },
};

export const TimelineDemo: React.FC = () => {
  const data: TimelineItem[] = [
    {
      title: "Welcome to PetSync 360",
      summary:
        "Discover India’s first all-in-one digital ecosystem for pets, combining expert care and personalized shopping.",
      lottie: petLottie1,
      content: (
        <motion.div className="space-y-6">
          <motion.p variants={textVariants} className="text-lg font-semibold text-cyan-200 font-lora">
            Personalized E-commerce
          </motion.p>
          <motion.ul variants={textVariants} className="list-none space-y-3 text-sm">
            <li>India’s first all-in-one digital ecosystem for pets-expert care and services at your fingertips.</li>
            <li>A smart platform uniting personalized shopping and pet care.</li>
            <li>From puppies to exotic pets, PetSync 360 supports lifelong care with ease.</li>
            <li>Shop premium pet products tailored to your pet’s needs, with fast delivery and exclusive offers.</li>
          </motion.ul>
        </motion.div>
      ),
    },
    {
      title: "What Is PetSync 360?",
      summary:
        "A cloud-based platform for pet parents, offering health tracking, professional connections, and smart shopping.",
      lottie: petLottie2,
      content: (
        <motion.div className="space-y-6">
          <motion.p variants={textVariants} className="text-lg font-semibold text-cyan-200 font-lora">
            Smart Pet Care Platform
          </motion.p>
          <motion.ul
            variants={textVariants}
            className="list-disc list-inside text-sm space-y-2 text-gray-300"
          >
            <li>
              PetSync 360 is a smart, cloud-based care platform that empowers pet parents,
              veterinarians, and pet businesses with digital tools to track health, connect
              with professionals, shop essentials, and manage services—anytime, anywhere in
              real-time.
            </li>
            <li>From digital health records to IoT-based monitoring.</li>
            <li>Emergency HIPAA secured and encrypted teleconsultations.</li>
            <li>On-demand grooming, training, and more.</li>
            <li>PetSync 360 simplifies your responsibilities and partners your pet’s wellbeing.</li>
          </motion.ul>
        </motion.div>
      ),
    },
    {
      title: "AI-Powered Diagnosis & Personalization",
      summary:
        "Leverage AI for tailored care recommendations, early diagnosis, and personalized wellness plans for your pet.",
      lottie: petLottie3,
      content: (
        <motion.div className="space-y-6">
          <motion.p variants={textVariants} className="text-sm">
            Our integrated AI system analyzes your pet’s health data to offer personalized care
            recommendations, early diagnosis support, and customized wellness plans-helping you
            make informed decisions quickly.
          </motion.p>
        </motion.div>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900 py-16 px-4">
      {/* Animated 3D title with color cycling */}
      <motion.h1
        className="text-center text-5xl font-extrabold mb-12 drop-shadow-lg font-cinzel"
        variants={titleVariants}
        initial="initial"
        animate="animate"
        style={{
          perspective: 600, // needed for 3D rotateX
          background: "linear-gradient(270deg, #22d3ee, #f43f5e, #8b5cf6, #22d3ee)",
          backgroundSize: "600% 600%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "colorShift 12s ease infinite",
        }}
      >
        Explore PetSync 360 Journey
      </motion.h1>

      <AnimatePresence>
        <Timeline data={data} />
      </AnimatePresence>

      {/* Keyframes for color cycling */}
      <style>
        {`
          @keyframes colorShift {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>
    </div>
  );
};

export default TimelineDemo;
