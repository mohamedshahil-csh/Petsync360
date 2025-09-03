import React from "react";
import { motion, Variants } from "framer-motion";
import { FaHeartbeat, FaVideo, FaFileMedical, FaPills, FaMicrochip, FaBell, FaClipboardList, FaHome, FaCut, FaDog, FaShoppingCart, FaFilter, FaTruck, FaThLarge, FaUserMd, FaClock } from "react-icons/fa";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const sections = [
  {
    title: "💎 Key Benefits",
    items: [
      { icon: <FaHeartbeat />, text: "Total Health at a Glance" },
      { icon: <FaVideo />, text: "Teleconsults & emergency help" },
      { icon: <FaFileMedical />, text: "Digital health history" },
      { icon: <FaPills />, text: "Vet-reviewed medications" }
    ]
  },
  {
    title: "Smarter Pet Parenting",
    items: [
      { icon: <FaMicrochip />, text: "IoT-connected vitals tracking" },
      { icon: <FaBell />, text: "Preventive care reminders" },
      { icon: <FaClipboardList />, text: "Personalized health plans" }
    ]
  },
  {
    title: "Services at Your Doorstep",
    items: [
      { icon: <FaHome />, text: "Home visits" },
      { icon: <FaCut />, text: "Grooming, sitting, boarding, and walks" },
      { icon: <FaDog />, text: "Help with breeding & training" }
    ]
  },
  {
    title: "Shop Smarter",
    items: [
      { icon: <FaShoppingCart />, text: "Curated items by experts" },
      { icon: <FaFilter />, text: "Filter by species, allergy, or brand" },
      { icon: <FaTruck />, text: "Real-time availability & delivery tracking" }
    ]
  },
  {
    title: "One Dashboard, All Pets",
    items: [
      { icon: <FaThLarge />, text: "Manage multiple pets" },
      { icon: <FaUserMd />, text: "24x7 expert access" },
      { icon: <FaClock />, text: "Reminders, alerts & health notes" }
    ]
  }
];

export default function WhyPetSync360() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-6 font-playfair"
        >
          Why Pet Parents{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Love PetSync360
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-gray-600 max-w-2xl mx-auto mb-14 font-cinzel"
        >
          Everything you need to care for your furry friends — in one easy, friendly, and secure platform.
        </motion.p>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-600 font-playfair">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-gray-700">
                    <span className="text-blue-500 text-lg">{item.icon}</span>
                    <span className="font-jost">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
