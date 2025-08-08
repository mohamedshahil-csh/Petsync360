import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import Tilt from "react-parallax-tilt";
import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import sparklesAnimation from "../../assets/Animation/pet-dance.json";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.68, -0.55, 0.265, 1.55],
      type: "spring",
    },
  },
};

const vendorBenefits = [
  {
    title: "🔹 Vendor Benefits",
    points: [
      "Custom dashboard for price, stock & orders",
      "SLA timers, order alerts, performance metrics",
      "Reassignment & real-time updates",
      "Transparent payouts to bank",
    ],
  },
  {
    title: "🔹 Returns & Vault",
    points: [
      "Full refund before dispatch",
      "Post-dispatch: only delivery charge deducted",
      "Damaged? Upload video for fast resolution",
      "Vault credits for quick refund reuse",
    ],
  },
  {
    title: "🔹 PetSync Vault",
    points: [
      "Auto-applied credits",
      "Live refund tracking",
      "Wallet integration for future use",
    ],
  },
  {
    title: "🔹 Transparent Notifications",
    points: [
      "Order confirmations",
      "Dispatch alerts",
      "Delay notices and Refund/vault updates",
    ],
  },
  {
    title: "🔹 Vendor Accountability",
    points: [
      "SLA & QA monitored",
      "Auto-penalty enforcement",
      "Dashboard tracking for all actions",
    ],
  },
  {
    title: "🔹 Ready to Partner with PetSync 360?",
    points: [
      "Join a growing network of pet product sellers and expand your reach across India and beyond. Whether you’re a manufacturer, distributor, or store owner—we make e-commerce easy, smart, and profitable.",
    ],
  },
];

export default function Vendor() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const yOffset = useTransform(scrollY, [0, 300], [0, -60]);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(isInView ? 1.2 : 0.8);
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-12 md:px-16 min-h-screen overflow-hidden"
      style={{ fontFamily: "Bungee, sans-serif" }}
    >
      {/* Background Lottie animation */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.45, 0.4],
          filter: [
            "hue-rotate(0deg)",
            "hue-rotate(120deg)",
            "hue-rotate(0deg)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
      ></motion.div>

      {/* Floating sparkles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-6 bg-yellow-400 rounded-full blur-md opacity-70"
          initial={{ x: -100, y: -50, scale: 0 }}
          animate={{
            x: [Math.random() * 300 - 150, Math.random() * 300 - 150],
            y: [Math.random() * 400 - 200, Math.random() * 400 - 200],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{ zIndex: 0 }}
        />
      ))}

      {/* Section Content */}
      <motion.div
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={shouldReduceMotion ? {} : containerVariants}
        className="relative z-10 max-w-5xl mx-auto space-y-16"
      >
        {/* Heading */}
        <motion.div
          variants={itemVariants}
          className="relative text-center space-y-8"
          role="region"
          aria-labelledby="vendor-heading"
        >
          {/* Gradient background for visual depth */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent rounded-xl" />

          {/* Main Heading */}
          <motion.h2
            id="vendor-heading"
            className="text-4xl md:text-5xl font-extrabold text-green-300 relative"
            whileHover={{ scale: 1.05, color: "#00ffaa" }}
            transition={{ duration: 0.3 }}
            style={{
              textShadow: "0 0 10px rgba(0, 255, 170, 0.5)",
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            }}
          >
            FOR VENDORS
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-green-400 to-cyan-400"
              initial={{ scaleX: 0, x: "-50%" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.h2>

          {/* Subheading */}
          <motion.h3
            className="text-2xl md:text-3xl font-semibold text-purple-200"
            whileHover={{ color: "#e0b6ff" }}
            style={{
              textShadow: "0 0 8px rgba(147, 51, 234, 0.4)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
            }}
          >
            Scale with PetSync 360
            {/* Subtle sparkle effect */}
            <motion.span
              className="inline-block ml-2"
              animate={{
                opacity: [0.6, 1, 0.6],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ✨
            </motion.span>
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-base max-w-lg mx-auto text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ lineHeight: 1.6 }}
          >
            Are you a manufacturer, distributor, or store owner? <br />
            <motion.span
              className="text-cyan-300 font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Join PetSync 360
            </motion.span>{" "}
            to sell smarter, grow faster.
          </motion.p>

          {/* Call-to-Action Button */}
          <motion.a
            href="#register"
            className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 shadow-lg shadow-cyan-500/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Now
          </motion.a>
        </motion.div>

        {/* Vendor Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vendorBenefits.map((benefit, index) => {
            const isPartnerCard = benefit.title.includes("Ready to Partner");
            const isAccountabilityCard = benefit.title.includes(
              "Vendor Accountability"
            );

            return (
              <div
                key={index}
                className={`${
                  isPartnerCard || isAccountabilityCard ? "md:col-span-2" : ""
                }`}
              >
                {isPartnerCard ? (
                  <motion.div
                    variants={itemVariants}
                    className="rounded-xl p-6 transition-transform bg-gradient-to-br from-purple-900 via-fuchsia-800 to-purple-900 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20"
                  >
                    <h4 className="text-2xl font-extrabold text-center text-cyan-300 mb-4">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-200 text-base leading-relaxed text-center mb-6 max-w-3xl mx-auto">
                      {benefit.points[0]}
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4 space-y-3 md:space-y-0">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300">
                        Register as a Vendor
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300">
                        Download Vendor App / APK
                      </button>
                      <div className="text-white text-sm">
                        Need help?
                        <button className="underline text-blue-300 hover:text-blue-500 ml-1">
                          Contact Our Vendor Support Team
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    glareEnable
                    glareMaxOpacity={0.3}
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      className="rounded-xl p-6 cursor-pointer transition-transform shadow-inner border-2 bg-gray-900 border-green-400 hover:shadow-green-500/50"
                    >
                      {/* Avoid rendering title twice */}
                      {!isAccountabilityCard && (
                        <h4 className="text-lg font-bold text-cyan-300 mb-4">
                          {benefit.title}
                        </h4>
                      )}

                      {isAccountabilityCard ? (
                        <>
                          <h4 className="text-xl font-bold text-cyan-300 text-center mb-6">
                            {benefit.title}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            {benefit.points.map((point, i) => (
                              <div
                                key={i}
                                className="text-sm text-gray-200 bg-gray-800 px-4 py-3 rounded-lg border border-cyan-400 text-center"
                              >
                                {point}
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        benefit.points.map((point, i) => (
                          <p
                            key={i}
                            className="text-sm text-gray-200 mt-3 leading-relaxed"
                          >
                            • {point}
                          </p>
                        ))
                      )}
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
