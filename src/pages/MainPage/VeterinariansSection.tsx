import React from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaUserMd,
  FaDownload,
  FaClipboardList,
  FaQuestionCircle,
  FaHeartbeat,
  FaVideo,
  FaFileMedical,
  FaStethoscope,
  FaDollarSign,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { colors } from "../../constants/Colors";

const VeterinariansSection: React.FC = () => {
  const features = [
    { icon: <FaHeartbeat />, text: "Instant pet health history" },
    { icon: <FaVideo />, text: "Teleconsults & home visits" },
    { icon: <FaFileMedical />, text: "E-prescriptions & treatment notes" },
    { icon: <FaStethoscope />, text: "Diagnostics & imaging review" },
    { icon: <FaClipboardList />, text: "Follow-up tracking" },
    { icon: <FaDollarSign />, text: "Transparent, quick payouts" },
    { icon: <FaMapMarkedAlt />, text: "Reach pet parents anywhere" },
  ];

  // InView hook
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  // Smooth feature animation
  const featureVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800 py-24"
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute -top-20 -left-20 w-80 h-80 bg-blue-400/20 blur-[120px] rounded-full"
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-pink-400/20 blur-[120px] rounded-full"
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="flex justify-center items-center w-full h-full">
          <div className="text-center">
  <motion.h2
    className="text-4xl md:text-5xl sm:text-5xl font-extrabold drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] inline-block"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
    transition={{ delay: 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
  >
    <span className="text-gray-900">For Our </span>
    <span
      style={{
        backgroundImage: `linear-gradient(to right, ${colors.petsyncGradient1.join(', ')})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      Veterinarians
    </span>
  </motion.h2>

  {/* Gradient Divider */}
  <div
    className="w-20 h-1 mx-auto mt-4 mb-12 rounded-full shadow-sm"
    style={{
      backgroundImage: `linear-gradient(to right, ${colors.petsyncGradient1[0]}, ${colors.petsyncGradient1[1]})`,
    }}
  />
</div>

        </div>



        {/* Subtext */}
        <motion.p
          className="text-lg text-gray-600 mb-14 font-subTitleFont leading-relaxed text-center max-w-3xl mx-auto font-cinzel"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Modern tools for modern vets — streamline your workflow, grow your
          reach, and deliver exceptional care anytime, anywhere.
        </motion.p>

        {/* Features Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              className={`group flex items-center gap-4 bg-white backdrop-blur-md border font-contetTitleFont border-blue-200 rounded-2xl px-6 py-5 shadow-md cursor-pointer
              ${idx === features.length - 1 ? "sm:col-span-2 lg:col-span-3 sm:justify-center" : ""}`}
              variants={featureVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
            >
              <div
                className="relative flex items-center justify-center w-12 h-12 rounded-full text-white shadow-md group-hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundImage: `linear-gradient(to top right, ${colors.petsyncGradient2[0]}, ${colors.petsyncGradient2[1]})`
                }}
              >
                {f.icon}
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to top right, ${colors.petsyncGradient2[0]}, ${colors.petsyncGradient2[1]})`
                  }}
                />
              </div>
              <span className="text-gray-700 font-medium">{f.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 font-lora"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {[
            { href: "#download", icon: <FaDownload />, text: "Download App", bg: "bg-gradient-to-r from-blue-600 to-sky-400", textColor: "text-white" },
            { href: "#register", icon: <FaClipboardList />, text: "Register as Vet", bg: "border border-blue-500 text-blue-600", textColor: "" },
            { href: "#support", icon: <FaQuestionCircle />, text: "Support", bg: "bg-pink-500 text-white", textColor: "" },
          ].map((btn, i) => (
            <motion.a
              key={i}
              href={btn.href}
              className={`relative px-8 py-3 rounded-full font-semibold shadow-md overflow-hidden group ${btn.bg} ${btn.textColor}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2 relative z-10">{btn.icon} {btn.text}</span>
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VeterinariansSection;
