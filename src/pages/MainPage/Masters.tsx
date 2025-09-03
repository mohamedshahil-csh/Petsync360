import React from "react";
import { motion, Variants, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Lottie from "lottie-react";

import petLottie1 from "../../assets/Animation/welcome.json";
import petLottie2 from "../../assets/Animation/whatispetsyc.json";
import petLottie3 from "../../assets/Animation/Aidiagnosis.json";
import { colors } from "../../constants/Colors";

interface TimelineItem {
  title: string;
  summary: string;
  content: React.ReactNode;
  lottie: object;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const TimelineCard: React.FC<{ item: TimelineItem; index: number }> = ({ item, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.25 }}
      whileHover={{ scale: 1.05, rotateX: 2, rotateY: -2 }}
      className="relative group flex flex-col items-center text-center 
                 rounded-3xl p-8 backdrop-blur-xl 
                 bg-white/30 border border-cyan-200/40 
                 shadow-xl hover:shadow-cyan-200/40 
                 transition-all duration-500"
    >
      {/* Animated Gradient Border Glow */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/60 transition-all duration-500"></div>

      {/* Floating Lottie Animation */}
      <motion.div
        className="w-36 h-36 flex items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500/20 to-pink-500/20 shadow-inner mb-6"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Lottie animationData={item.lottie} loop={true} style={{ width: "100%", height: "100%" }} />
      </motion.div>

      {/* Title */}
      <h2 className="text-2xl font-extrabold text-gray-900 mb-3 font-cinzel drop-shadow-sm">
        {item.title}
      </h2>

      {/* Summary */}
      <p className="text-gray-700 text-base mb-4 font-playfair leading-relaxed">
        {item.summary}
      </p>

      {/* Content */}
      <div className="text-left text-gray-800 text-sm font-jost leading-relaxed">
        {item.content}
      </div>
    </motion.div>
  );
};

export const TimelineDemo: React.FC = () => {
  const data: TimelineItem[] = [
    {
      title: "Welcome to PetSync 360",
      summary:
        "Discover India’s first all-in-one digital ecosystem for pets, combining expert care and personalized shopping.",
      lottie: petLottie1,
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li>Expert pet care & services at your fingertips.</li>
          <li>Personalized shopping and pet care tools.</li>
          <li>Support for all pets—from puppies to exotics.</li>
          <li>Premium products with fast delivery & offers.</li>
        </ul>
      ),
    },
    {
      title: "What Is PetSync 360?",
      summary:
        "A cloud-based platform for pet parents, offering health tracking, professional connections, and smart shopping.",
      lottie: petLottie2,
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li>Smart, cloud-based care platform for pets.</li>
          <li>Digital health records & IoT monitoring.</li>
          <li>HIPAA-secured teleconsultations.</li>
          <li>On-demand grooming, training, and more.</li>
        </ul>
      ),
    },
    {
      title: "AI-Powered Diagnosis & Personalization",
      summary:
        "Leverage AI for tailored care recommendations, early diagnosis, and personalized wellness plans for your pet.",
      lottie: petLottie3,
      content: (
        <p>
          Our integrated AI system analyzes your pet’s health data to offer personalized care,
          early diagnosis support, and customized wellness plans—helping you make informed
          decisions quickly.
        </p>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-cyan-50 to-white py-20 px-6">
      {/* Animated Gradient Title */}
      <motion.h1
        className="text-center text-4xl md:text-5xl font-extrabold mb-16 font-cinzel"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
        style={{
          background: `linear-gradient(90deg, ${colors.petsyncGradient1.join(', ')})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "flow 6s ease infinite",
          backgroundSize: "300% 300%",
        }}
      >
        Explore PetSync 360 Journey
      </motion.h1>


      {/* Timeline Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {data.map((item, index) => (
          <TimelineCard key={index} item={item} index={index} />
        ))}
      </div>

      {/* Keyframes for gradient flow */}
      <style>
        {`
          @keyframes flow {
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
