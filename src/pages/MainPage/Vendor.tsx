import React, { useRef } from "react";
import Lottie from "lottie-react";
import Tilt from "react-parallax-tilt";
import {
  motion,
  Variants,
  useReducedMotion,
  useInView,
} from "framer-motion";
import sparklesAnimation from "../../assets/Animation/pet-dance.json";

// Import your icons here — update the paths accordingly
import DashboardIcon from "../../assets/Images/vendorbenefits.png";
import ReturnsIcon from "../../assets/Images/returnsandvault.png";
import VaultIcon from "../../assets/Images/petsyncvault.png";
import NotificationsIcon from "../../assets/Images/transparentnotification.png";
import AccountabilityIcon from "../../assets/Images/vendoraccoundability.png";
import PartnerIcon from "../../assets/Images/petservice.png";


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.8, rotate: 5 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.68, -0.55, 0.265, 1.55],
      type: "spring",
    },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 0 30px rgba(0, 255, 255, 0.8)",
    transition: {
      duration: 0.4,
      ease: "easeOut",
      boxShadow: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  },
};

const buttonVariants: Variants = {
  rest: { scale: 1, boxShadow: "0 0 0 rgba(0, 0, 0, 0)" },
  hover: {
    scale: 1.1,
    boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const vendorBenefits = [
  {
    title: "Vendor Benefits",
    points: [
      "Custom dashboard for price, stock & orders",
      "SLA timers, order alerts, performance metrics",
      "Reassignment & real-time updates",
      "Transparent payouts to bank",
    ],
    icon: DashboardIcon,
  },
  {
    title: "Returns & Vault",
    points: [
      "Full refund before dispatch",
      "Post-dispatch: only delivery charge deducted",
      "Damaged? Upload video for fast resolution",
      "Vault credits for quick refund reuse",
    ],
    icon: ReturnsIcon,
  },
  {
    title: "PetSync Vault",
    points: [
      "Auto-applied credits",
      "Live refund tracking",
      "Wallet integration for future use",
    ],
    icon: VaultIcon,
  },
  {
    title: "Transparent Notifications",
    points: [
      "Order confirmations",
      "Dispatch alerts",
      "Delay notices and Refund/vault updates",
    ],
    icon: NotificationsIcon,
  },
  {
    title: "Vendor Accountability",
    points: [
      "SLA & QA monitored",
      "Auto-penalty enforcement",
      "Dashboard tracking for all actions",
    ],
    icon: AccountabilityIcon,
  },
  {
    title: "Ready to Partner with PetSync 360?",
    points: [
      "Join a growing network of pet product sellers and expand your reach across India and beyond. Whether you’re a manufacturer, distributor, or store owner—we make e-commerce easy, smart, and profitable.",
    ],
    icon: PartnerIcon,
  },
];

export default function Vendor() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 sm:px-6 md:px-16 py-12 sm:py-16 min-h-screen overflow-hidden"
      // style={{ fontFamily: "sans-serif" }}
      aria-label="Vendor Benefits Section"
    >
      {/* Radial animated background */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        animate={{
          backgroundPosition: ["50% 50%", "52% 48%", "50% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
        style={{
          background:
            "radial-gradient(circle at center, #0ff6e0aa, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Particle background effect */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-15 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(0, 255, 255, 0.2) 2px, transparent 2px)",
          backgroundSize: "20px 20px",
          opacity: 0.3,
        }}
      />

      {/* Soft floating sparkles Lottie */}
      <motion.div
        className="absolute top-4 right-4 sm:top-8 sm:right-10 w-32 sm:w-48 opacity-20 pointer-events-none select-none -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Lottie animationData={sparklesAnimation} loop autoplay />
      </motion.div>

      {/* Main Content Container */}
      <motion.div
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={shouldReduceMotion ? {} : containerVariants}
        className="max-w-7xl mx-auto space-y-12 sm:space-y-20"
      >
        {/* Section Heading */}
        <motion.div
          className="text-center space-y-4 sm:space-y-6 relative"
          role="heading"
          aria-level={2}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-10 text-cyan-400 font-playfair"
          >
            FOR VENDORS
          </h2>
          <motion.div
            className="mx-auto w-20 sm:w-28 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-300 drop-shadow-[0_0_8px_rgba(70,130,180,0.7)] font-playfair"
          >
            Scale with PetSync 360{" "}
            <motion.span
              className="inline-block ml-1 sm:ml-2"
              animate={{
                opacity: [0.6, 1, 0.6],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >

            </motion.span>
          </h3>
          <p className="max-w-lg sm:max-w-xl mx-auto text-gray-300 text-base sm:text-lg leading-relaxed font-cinzel">
            Are you a manufacturer, distributor, or store owner?{" "}
            <span className="text-cyan-300 font-semibold animate-pulse">
              Join PetSync 360
            </span>{" "}
            to sell smarter, grow faster.
          </p>
        </motion.div>

        {/* Vendor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {vendorBenefits.map((benefit, index) => {
            const isPartnerCard = benefit.title.includes("Ready to Partner");
            const isAccountabilityCard = benefit.title.includes(
              "Vendor Accountability"
            );

            return (
              <div
                key={index}
                className={`${isPartnerCard || isAccountabilityCard ? "md:col-span-2" : ""
                  }`}
              >
                {isPartnerCard ? (
                  <motion.div
                    variants={itemVariants}
                    className="rounded-xl p-4 sm:p-6 transition-transform bg-gradient-to-br from-purple-900 via-fuchsia-800 to-purple-900 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 border-4 border-transparent"
                      animate={{
                        borderColor: [
                          "rgba(0, 255, 255, 0.5)",
                          "rgba(0, 255, 255, 0.2)",
                          "rgba(0, 255, 255, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <h4 className="text-xl sm:text-2xl font-extrabold text-center text-cyan-300 mb-4 relative z-10 font-roboto">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed text-center mb-6 max-w-3xl mx-auto relative z-10 font-robo">
                      {benefit.points[0]}
                    </p>
                    <div className="flex flex-col items-center space-y-3 sm:space-y-4 relative z-10">
                      <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 w-full sm:w-auto text-sm sm:text-base font-jost"
                        >
                          Register as a Vendor
                        </motion.button>
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 w-full sm:w-auto text-sm sm:text-base font-jost"
                        >
                          Download Vendor App / APK
                        </motion.button>
                      </div>
                      <div className="text-white text-sm text-center font-jost">
                        Need help?
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          className="underline text-blue-300 hover:text-blue-500 ml-3 font-jost"
                        >
                          Contact Our Vendor Support Team
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ) : isAccountabilityCard ? (
                  <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    glareEnable
                    glareMaxOpacity={0.3}
                    tiltEnable={!shouldReduceMotion}
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      className="rounded-xl p-4 sm:p-6 cursor-pointer transition-transform shadow-inner border-2 bg-gray-900 border-green-400 hover:shadow-green-500/50 relative overflow-hidden"
                      aria-label="Vendor Accountability benefits"
                    >
                      <motion.div
                        className="absolute inset-0 border-4 border-transparent"
                        animate={{
                          borderColor: [
                            "rgba(0, 255, 255, 0.5)",
                            "rgba(0, 255, 255, 0.2)",
                            "rgba(0, 255, 255, 0.5)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div
                        className="flex items-center justify-center mb-4 sm:mb-6 relative z-10"
                        style={{ gap: "0.75rem sm:1rem" }}
                      >
                        <motion.img
                          src={benefit.icon}
                          alt={`${benefit.title} icon`}
                          className="w-10 h-10 sm:w-12 sm:h-12"
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <h4 className="text-lg sm:text-xl font-bold text-cyan-300 font-cinzel">
                          {benefit.title}
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full relative z-10">
                        {benefit.points.map((point, i) => (
                          <motion.div
                            key={i}
                            className="text-xs sm:text-sm text-gray-200 bg-gray-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-cyan-400 text-center font-jost"
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "rgba(31, 41, 55, 0.9)",
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {point}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </Tilt>
                ) : (
                  <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    glareEnable
                    glareMaxOpacity={0.3}
                    tiltEnable={!shouldReduceMotion}
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      className="rounded-xl p-4 sm:p-6 cursor-pointer transition-transform shadow-inner border-2 bg-gray-900 border-green-400 hover:shadow-green-500/50 relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 border-4 border-transparent"
                        animate={{
                          borderColor: [
                            "rgba(0, 255, 255, 0.5)",
                            "rgba(0, 255, 255, 0.2)",
                            "rgba(0, 255, 255, 0.5)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4 relative z-10">
                        <motion.img
                          src={benefit.icon}
                          alt={`${benefit.title} icon`}
                          className="w-8 h-8 sm:w-10 sm:h-10"
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <h4 className="text-base sm:text-lg font-bold text-cyan-300 font-cinzel">
                          {benefit.title}
                        </h4>
                      </div>
                      {benefit.points.map((point, i) => (
                        <motion.p
                          key={i}
                          className="text-xs sm:text-sm text-gray-200 mt-2 sm:mt-3 leading-relaxed font-jost"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          • {point}
                        </motion.p>
                      ))}
                    </motion.div>
                  </Tilt>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}