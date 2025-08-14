import React, { useState, useEffect } from "react";
import { HoverEffect } from "../../components/WebPageContent/UI/card-hover-effect";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../../assets/Animation/catrun.json";
import { useInView } from "react-intersection-observer";

export function CardHoverEffectDemo() {
    const [animationDone, setAnimationDone] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0.4,
        triggerOnce: false
    });

    useEffect(() => {
        if (inView) {
            setAnimationDone(false);
        }
    }, [inView]);

    return (
        <div ref={ref} className="max-w-5xl mx-auto px-8 py-12 overflow-visible">
            {/* Lottie Animation */}
            {!animationDone && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Lottie
                        animationData={animationData}
                        loop={false}
                        style={{ height: 200 }}
                        onComplete={() => setAnimationDone(true)}
                    />
                </motion.div>
            )}

            {/* Heading & Cards */}
            {animationDone && (
                <>
                    <motion.h2
                        className="text-4xl md:text-5xl font-extrabold text-center mb-8 drop-shadow-lg leading-[1.3] pb-2"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        whileHover={{
                            scale: 1.08,
                            transition: { duration: 0.4 }
                        }}
                    >
                        <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text font-playfair text-transparent">
                            Why
                        </span>{" "}
                        <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text font-playfair text-transparent">
                            PetSync360
                        </span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <HoverEffect items={projects} />
                    </motion.div>
                </>
            )}
        </div>
    );
}

export const projects = [
    {
        title: "Total Health at a Glance",
        description:
            "Teleconsults & emergency help Digital health history Vet-reviewed medications",
        link: "",
    },
    {
        title: "Smarter Pet Parenting",
        description:
            "IoT-connected vitals tracking Preventive care reminders Personalized health plans",
        link: "",
    },
    {
        title: "Services at Your Doorstep",
        description:
            "Home visits Grooming, sitting, boarding, and walks Help with breeding & training",
        link: "",
    },
    {
        title: "Shop Smarter",
        description:
            "Curated items by experts Filter by species, allergy, or brand Real-time availability & delivery tracking",
        link: "",
    },
    {
        title: "One Dashboard, All Pets",
        description:
            "Manage multiple pets 24x7 expert access Reminders, alerts & health notes.",
        link: "",
    },
    {
        title: "End-to-End Lifecycle Support",
        description:
            "From breeder screening to adoption, onboarding, wellness tracking, and geriatric care — we support your pet’s journey at every stage.",
        link: "",
    },
];
