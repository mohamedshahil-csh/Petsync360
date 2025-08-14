import React from "react";
import { motion } from "framer-motion";
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200 py-24">
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.15),transparent_70%)] animate-pulse" />
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/10 blur-[100px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-emerald-400 via-teal-300 font-playfair to-emerald-500 bg-clip-text text-transparent text-center drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          <FaUserMd className="inline-block mr-3 text-emerald-300" />
          For Veterinarians
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-lg text-gray-300 mb-14 leading-relaxed text-center max-w-3xl mx-auto font-cinzel"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Modern tools for modern vets-streamline your workflow, grow your
          reach, and deliver exceptional care anytime, anywhere.
        </motion.p>

        {/* Features */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-xl px-5 py-4 shadow-md hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400 font-roboto"
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: -5,
                transition: { type: "spring", stiffness: 200 },
              }}
            >
              <span className="text-emerald-400 text-xl">{f.icon}</span>
              <span className="text-gray-100 font-medium">{f.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap justify-center gap-5 font-lora">
          {[
            {
              href: "#download",
              icon: <FaDownload />,
              text: "Download App",
              bg: "bg-gradient-to-r from-emerald-500 to-teal-400",
              textColor: "text-black",
              hoverGlow: "group-hover:opacity-30",
            },
            {
              href: "#register",
              icon: <FaClipboardList />,
              text: "Register as Vet",
              bg: "border border-emerald-400 text-emerald-300",
              textColor: "",
              hoverGlow: "group-hover:opacity-30 bg-emerald-500/20",
            },
            {
              href: "#support",
              icon: <FaQuestionCircle />,
              text: "Support",
              bg: "bg-pink-500",
              textColor: "text-black",
              hoverGlow: "group-hover:opacity-30 bg-white/30",
            },
          ].map((btn, i) => (
            <motion.a
              key={i}
              href={btn.href}
              className={`px-7 py-3 rounded-full font-bold shadow-lg relative overflow-hidden group ${btn.bg} ${btn.textColor}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2 relative z-10">
                {btn.icon} {btn.text}
              </span>
              <span
                className={`absolute inset-0 opacity-0 transition-opacity ${btn.hoverGlow}`}
              ></span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VeterinariansSection;
