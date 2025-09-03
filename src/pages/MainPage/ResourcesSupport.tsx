import React, { useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { FaDog, FaBone, FaFirstAid, FaStethoscope } from "react-icons/fa";

// Import your own images for each resource
import breedImg from "../../assets/Images/breedguide.jpg";
import dietImg from "../../assets/Images/dietpet.jpg";
import firstAidImg from "../../assets/Images/pet-first-aid.jpg";
import vetQAImg from "../../assets/Images/vetqa.jpg";

// Animation Variants
const fadeIn: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: custom * 0.2, duration: 0.6, ease: "easeInOut" },
  }),
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

interface ResourceItem {
  icon: React.ReactNode;
  title: string;
  text: string;
  link?: string;
  image: string;
}

const ResourceSection = ({
  item,
  index,
  onSelect,
  isActive,
}: {
  item: ResourceItem;
  index: number;
  onSelect: () => void;
  isActive: boolean;
}) => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className="relative flex items-start mb-8 group"
      role="article"
      aria-labelledby={`section-title-${index}`}
    >
      {/* Timeline Dot */}
      <motion.div
        className="absolute left-0 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"
        whileHover={{ scale: 1.5, boxShadow: "0 0 20px rgba(59,130,246,0.8)" }}
      />
      {/* Timeline Line */}
      <div className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-gray-300" />

      {/* Content */}
      <div className="ml-8 w-full">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={onSelect}
          role="button"
          aria-expanded={isActive}
        >
          <span className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white text-2xl">
            {item.icon}
          </span>
          <h3
            id={`section-title-${index}`}
            className={`text-xl font-semibold transition-colors duration-300 ${isActive
                ? "text-blue-600"
                : "text-gray-900 group-hover:text-blue-600"
              }`}
          >
            {item.title}
          </h3>
        </div>

        {/* Expandable Section */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="overflow-hidden mt-2 pl-4 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 shadow-lg p-5"
            >
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {item.text}
              </p>
              <a
                href={item.link || "#"}
                className="inline-block mt-3 text-blue-600 font-semibold text-sm sm:text-base hover:underline"
              >
                Learn More →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ResourcesSupport: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resources: ResourceItem[] = [
    {
      icon: <FaDog />,
      title: "Breed-Specific Guides",
      text: "Tailored insights for dog & cat breeds — grooming, traits, lifespan, and common health tips.",
      link: "/breeds",
      image: breedImg,
    },
    {
      icon: <FaBone />,
      title: "Diet & Care Advice",
      text: "From nutrition to grooming & hygiene — daily routines for keeping pets healthy and happy.",
      link: "/care",
      image: dietImg,
    },
    {
      icon: <FaFirstAid />,
      title: "First-Aid Tips",
      text: "Quick emergency care guides for choking, heat strokes, cuts, and more before reaching a vet.",
      link: "/first-aid",
      image: firstAidImg,
    },
    {
      icon: <FaStethoscope />,
      title: "Vet Q&A",
      text: "Certified veterinary answers to FAQs — vaccinations, deworming, and behavior insights.",
      link: "/vet-qa",
      image: vetQAImg,
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-white flex flex-col items-center">
      {/* Heading */}
      <motion.div
        initial={isMobile ? false : "hidden"}
        animate={isMobile ? { opacity: 1, y: 0 } : "visible"}
        variants={fadeIn}
        custom={0}
        className="w-full max-w-3xl text-center px-6 py-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          PetSync Learn{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse">
            (Coming Soon)
          </span>
        </h1>
        <span className="block h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></span>
        <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto leading-relaxed font-cinzel">
          Explore{" "}
          <span className="font-semibold text-blue-600">pet care expertise</span>{" "}
          — your go-to resource for keeping furry friends thriving.
        </p>
      </motion.div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        {/* Left Side (Dynamic Flip Image) */}
        <div className="relative flex items-center justify-center bg-white p-8">
          <div style={{ perspective: 1200 }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={resources[activeIndex].image}
                alt={resources[activeIndex].title}
                className="rounded-3xl shadow-xl w-full max-w-md lg:max-w-lg object-cover object-center h-80 sm:h-96 cursor-pointer"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                initial={{ opacity: 0, rotateY: 90, scale: 0.9 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -90, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                onClick={() => setActiveIndex((activeIndex + 1) % resources.length)}
              />
            </AnimatePresence>
          </div>

          {/* Floating Decorations */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`absolute w-24 h-24 rounded-full opacity-20 blur-2xl ${i === 0
                  ? "bg-blue-200 top-10 right-10"
                  : i === 1
                    ? "bg-purple-200 bottom-20 left-16"
                    : "bg-pink-200 top-32 left-32"
                }`}
              animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Right Side (Timeline Content) */}
        <div className="relative flex flex-col items-center px-6 sm:px-12 py-12 overflow-hidden">
          <motion.div
            className="w-full max-w-2xl relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {resources.map((item, i) => (
              <ResourceSection
                key={i}
                item={item}
                index={i}
                onSelect={() => setActiveIndex(i)}
                isActive={activeIndex === i}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSupport;
