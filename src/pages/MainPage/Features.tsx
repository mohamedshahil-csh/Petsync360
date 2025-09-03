import React from "react";
import { motion } from "framer-motion";
import { colors } from "../../constants/Colors";

export function CardHoverEffectDemo() {
    return (
        <div className="bg-white mx-auto px-8 py-16">
            {/* Themed Heading */}
            <motion.h2
                className="text-4xl md:text-5xl font-extrabold text-center mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent text-4xl md:text-5xl sm:text-5xl font-extrabold">
                    Why
                </span>{" "}
                <span
                    className="bg-clip-text text-transparent animate-gradient"
                    style={{
                        backgroundImage: `linear-gradient(90deg, ${colors.petsyncGradient2[0]}, ${colors.petsyncGradient2[1]}, ${colors.petsyncGradient2[2]}, ${colors.petsyncGradient2[0]})`,
                        backgroundSize: "200% 100%", // wide enough for left-right movement
                    }}
                >
                    PetSync360
                </span>

                <style>
                    {`
                @keyframes gradientAnimation {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              
                .animate-gradient {
                  animation: gradientAnimation 5s ease-in-out infinite;
                }
              `}
                </style>

            </motion.h2>

            {/* Divider */}
            <div className="w-20 h-1 mx-auto mb-12 bg-gradient-to-rrounded-full shadow-sm"
                style={{
                    backgroundImage: `linear-gradient(to right, ${colors.petsyncGradient1[0]}, ${colors.petsyncGradient1[1]})`,
                }}
            />

            {/* First Row */}
            <motion.div
                initial={{ opacity: 0, x: 300 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                    type: "spring",
                    stiffness: 40,
                    damping: 20,
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
            >
                {projects.slice(0, 3).map((item, i) => (
                    <div
                        key={i}
                        className={`${cardColors[i % cardColors.length]} 
                                    shadow-md rounded-xl p-6 transition-all duration-300 
                                    hover:shadow-xl hover:scale-[1.03]`}
                    >
                        <h3 className="text-lg font-semibold mb-2 font-contetTitleFont">{item.title}</h3>
                        <p className="text-sm text-gray-700 font-contentFont">{item.description}</p>
                    </div>
                ))}
            </motion.div>

            {/* Second Row */}
            <motion.div
                initial={{ opacity: 0, x: -300 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                    type: "spring",
                    stiffness: 40,
                    damping: 20,
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {projects.slice(3, 6).map((item, i) => (
                    <div
                        key={i}
                        className={`${cardColors[(i + 3) % cardColors.length]} 
                                    shadow-md rounded-xl p-6 transition-all duration-300 
                                    hover:shadow-xl hover:scale-[1.03]`}
                    >
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-700">{item.description}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

const cardColors = [
    "bg-blue-50",
    "bg-teal-50",
    "bg-purple-50",
    "bg-pink-50",
    "bg-yellow-50",
    "bg-green-50",
];

export const projects = [
    {
        title: "Total Health at a Glance",
        description:
            "Teleconsults & emergency help - Digital health history - Vetreviewed medications",
    },
    {
        title: "Smarter Pet Parenting",
        description:
            "IoT connected vitals tracking - Preventive care reminders - Personalized health plans",
    },
    {
        title: "Services at Your Doorstep",
        description:
            "Home visits - Grooming, sitting, boarding, and walks - Help with breeding & training",
    },
    {
        title: "Shop Smarter",
        description:
            "Curated items by experts - Filter by species, allergy, or brand - Delivery tracking",
    },
    {
        title: "One Dashboard, All Pets",
        description:
            "Manage multiple pets - 24x7 expert access - Reminders, alerts & health notes",
    },
    {
        title: "End-to-End Lifecycle Support",
        description:
            "From breeder screening to adoption, onboarding, wellness tracking, and geriatric care at every stage.",
    },
];
