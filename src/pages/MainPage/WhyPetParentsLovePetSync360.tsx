import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants, Easing } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import icons
import petServiceIcon from "../../assets/Images/allpetservice.png";
import vetAccessIcon from "../../assets/Images/instantaccess.png";
import healthRecordsIcon from "../../assets/Images/digitalhealthrecord.png";
import alertsIcon from "../../assets/Images/realtimehealthalert.png";
import ecommerceIcon from "../../assets/Images/pet_ecommerce.png";
import homeCareIcon from "../../assets/Images/doorsteppetservice.png";
import breedIcon from "../../assets/Images/breedselection.png";
import lifecycleIcon from "../../assets/Images/lifecyclesupport.png";
import insuranceIcon from "../../assets/Images/freeinsurance.png";
import dashboardIcon from "../../assets/Images/dashboard.png";
import educationIcon from "../../assets/Images/educationalhub.png";
import supportIcon from "../../assets/Images/petservice.png";
import appointmentsIcon from "../../assets/Images/bookappointment.png";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  { title: "Instant Access to Vets", description: "Book teleconsultations, home visits, or in-clinic appointments with ease.", icon: vetAccessIcon },
  { title: "Digital Health Records", description: "Securely store and access your pet’s medical history and records.", icon: healthRecordsIcon },
  { title: "All Pet Services", description: "Grooming, walking, boarding, and more—all in one app.", icon: petServiceIcon },
  { title: "Real-Time Health Alerts", description: "Stay updated on vaccines, deworming, and medication schedules.", icon: alertsIcon },
  { title: "Curated Pet E-commerce", description: "Shop vet-approved food, toys, and accessories in one place.", icon: ecommerceIcon },
  { title: "Doorstep Pet Services", description: "Grooming, walking, and emergency care delivered to your home.", icon: homeCareIcon },
  { title: "Smart Breed Selection", description: "Choose the perfect pet based on your lifestyle and needs.", icon: breedIcon },
  { title: "Lifecycle Support", description: "Support for your pet’s journey from adoption to geriatric care.", icon: lifecycleIcon },
  { title: "Hassle-Free Insurance", description: "Fast, paperless claims tailored to your pet’s needs.", icon: insuranceIcon },
  { title: "Unified Dashboard", description: "Manage multiple pets and services in one intuitive interface.", icon: dashboardIcon },
  { title: "Educational Hub", description: "Access expert-backed articles, videos, and care guides.", icon: educationIcon },
  { title: "24/7 Support", description: "Get emergency guidance and support anytime.", icon: supportIcon },
  { title: "Book Appointments", description: "Effortlessly schedule vet visits and services.", icon: appointmentsIcon },
];

const cardVariants: Variants = {
  enter: { opacity: 0, scale: 0.85, rotate: -5, y: 30 },
  center: { opacity: 1, scale: 1, rotate: 0, y: 0, transition: { type: "spring", stiffness: 120, damping: 12 } },
  exit: { opacity: 0, scale: 0.85, rotate: 5, y: -30, transition: { duration: 0.4, ease: "easeInOut" } },
};

const tabVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" as Easing } }),
};

const iconVariants: Variants = {
  initial: { y: -50, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 10, duration: 0.6 } },
};

const WhyPetParentsLovePetSync360: React.FC = () => {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

  const paginate = (newDirection: number) => {
    setIndex([(index + newDirection + features.length) % features.length, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [index]);

  const feature = features[index];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center px-6 py-12 text-white"
    >
      {/* Heading with Playfair Display */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-center mb-6 text-pink-400"
      >
        Why Pet Parents <span className="text-orange-400">Love PetSync 360</span>
      </motion.h2>

      {/* Tabs with Oswald */}
      <div className="flex flex-wrap gap-2 max-w-4xl justify-center mb-10">
        {features.map((f, i) => (
          <motion.button
            key={i}
            custom={i}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 12px rgba(255,105,180,0.7)",
              background: i === index ? "linear-gradient(135deg, #ec4899, #f97316)" : "linear-gradient(135deg, #374151, #1f2937)",
              transition: { type: "spring", stiffness: 300 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            className={`px-3 py-1.5 rounded-full text-sm font-jost tracking-tight transition-all border relative overflow-hidden min-w-fit max-w-[140px] whitespace-nowrap text-ellipsis
              ${i === index ? "bg-gradient-to-r from-pink-500 to-orange-400 border-pink-400 text-white shadow-lg" : "bg-gray-800/80 border-gray-700 text-gray-300 hover:border-pink-400"}`}
          >
            {i === index && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 rounded-full bg-pink-500/20 blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.span
              initial={{ y: 2 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 block overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {f.title}
            </motion.span>
          </motion.button>
        ))}
      </div>

      {/* Feature card */}
      <div className="relative flex items-center w-full max-w-lg sm:max-w-xl lg:max-w-2xl px-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="hidden sm:flex items-center justify-center absolute -left-14 bg-pink-500 hover:bg-pink-600 p-3 rounded-full shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={feature.title}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex-1 bg-gray-900/80 backdrop-blur-lg border border-pink-500 rounded-3xl shadow-2xl p-8 text-center"
          >
            <motion.img
              src={feature.icon}
              alt={feature.title}
              className="w-20 h-20 sm:w-24 sm:h-24 mb-4 mx-auto object-contain"
              variants={iconVariants}
              initial="initial"
              animate="animate"
            />
            {/* Feature title with Montserrat */}
            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-pink-400 mb-4">{feature.title}</h3>
            {/* Feature description with Lora */}
            <p className="font-jost text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {feature.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="hidden sm:flex items-center justify-center absolute -right-14 bg-pink-500 hover:bg-pink-600 p-3 rounded-full shadow-lg"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      {/* Mobile navigation buttons */}
      <div className="flex sm:hidden mt-4 gap-6">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => paginate(-1)} className="bg-pink-500 hover:bg-pink-600 p-3 rounded-full shadow-lg">
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => paginate(1)} className="bg-pink-500 hover:bg-pink-600 p-3 rounded-full shadow-lg">
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>
      </div>
    </motion.section>
  );
};

export default WhyPetParentsLovePetSync360;
