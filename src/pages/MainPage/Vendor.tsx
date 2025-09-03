import React, { useRef } from "react";
import Lottie from "lottie-react";
import Tilt from "react-parallax-tilt";
import { motion, Variants, useReducedMotion, useInView } from "framer-motion";
import sparklesAnimation from "../../assets/Animation/pet-dance.json";

// Icons
import DashboardIcon from "../../assets/Images/vendorbenefits.png";
import ReturnsIcon from "../../assets/Images/returnsandvault.png";
import VaultIcon from "../../assets/Images/petsyncvault.png";
import NotificationsIcon from "../../assets/Images/transparentnotification.png";
import AccountabilityIcon from "../../assets/Images/vendoraccoundability.png";
import PartnerIcon from "../../assets/Images/petservice.png";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const pointVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
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
    title: "Returns And Vault",
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

// ✅ Card Component
const BenefitCard: React.FC<{
  benefit: typeof vendorBenefits[0];
  shouldReduceMotion: boolean;
}> = ({ benefit, shouldReduceMotion }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });

  const isVendorAccountability = benefit.title.includes("Vendor Accountability");
  const isPartnerCard = benefit.title.includes("Ready to Partner");
  const isFullWidthCard = isVendorAccountability || isPartnerCard;

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={itemVariants}
      className={`${isFullWidthCard ? "md:col-span-2" : ""}`}
    >
      {isPartnerCard ? (
        // 🚀 Partner Card (slimmed down too)
        <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 shadow-md hover:shadow-lg transition">
          <h4 className="text-xl font-bold text-center text-blue-700 mb-3 font-cinzel">
            {benefit.title}
          </h4>
          <p className="text-gray-700 text-center mb-5 text-sm max-w-xl mx-auto font-jost">
            {benefit.points[0]}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow font-cinzel"
            >
              Register as Vendor
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow font-cinzel"
            >
              Download Vendor App
            </motion.button>
          </div>
        </div>
      ) : (
        // 🌟 Compact Normal Card
        <Tilt tiltEnable={!shouldReduceMotion} tiltMaxAngleX={4} tiltMaxAngleY={4}>
          <motion.div
            className={`relative rounded-xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all p-4
              ${isVendorAccountability ? "flex flex-col items-center text-center" : ""}`}
          >
            {/* Gradient bar */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-xl" />

            {/* Icon + Title */}
            <div className={`mb-3 ${isVendorAccountability ? "flex flex-col items-center" : "flex items-center gap-2"}`}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center shadow-sm">
                <img src={benefit.icon} alt={`${benefit.title} icon`} className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-gray-800 relative font-playfair">
                {benefit.title}
                <span className="absolute left-0 right-0 mx-auto -bottom-1 h-0.5 w-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></span>
              </h4>
            </div>

            {/* Points */}
            {/* Points */}
<ul
  className={`text-gray-700 text-md flex flex-wrap font-jost gap-3 ${
    isVendorAccountability ? "flex-row justify-center" : "flex-col"
  }`}
>
  {benefit.points.map((point, i) => (
    <motion.li
      key={i}
      variants={pointVariants}
      custom={i}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md shadow-sm hover:bg-blue-50 transition"
    >
      <span className="text-blue-500 text-xl">✔</span>
      <span className="leading-snug">{point}</span>
    </motion.li>
  ))}
</ul>

          </motion.div>
        </Tilt>
      )}
    </motion.div>
  );
};


// ✅ Section Component
export default function Vendor() {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion: boolean = prefersReducedMotion ?? false;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const sectionInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-gray-800 px-6 md:px-16 py-16 min-h-screen"
      aria-label="Vendor Benefits Section"
    >

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={
          sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }
        }
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto text-center space-y-4 mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-blue-600 font-playfair">
          For Vendors
        </h2>
        <div className="mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
        <p className="max-w-2xl mx-auto text-gray-600 text-lg font-cinzel">
          Are you a manufacturer, distributor, or store owner?{" "}
          <span className="text-blue-600 font-semibold">Join PetSync 360</span>{" "}
          to sell smarter, grow faster.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        animate={sectionInView ? "show" : "hidden"}
        variants={shouldReduceMotion ? {} : containerVariants}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {vendorBenefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            benefit={benefit}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </motion.div>
    </section>
  );
}
