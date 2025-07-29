import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Timeline } from "../../components/WebPageContent/UI/timeline";
import { TypewriterEffectSmooth } from "../../components/WebPageContent/UI/typewriter-effect";

interface TimelineItem {
    title: string;
    content: React.ReactNode;
}

const buttonVariants: Variants = {
    hover: {
        scale: 1.1,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.3, ease: "easeInOut" }
    },
    tap: { scale: 0.95 }
};

const cardVariants: Variants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
    },
    hover: {
        y: -10,
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.3, ease: "easeInOut" }
    }
};

const textVariants: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export const TimelineDemo: React.FC = () => {
    const data: TimelineItem[] = [
        {
            title: "Welcome to PetSync 360",
            content: (
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg relative overflow-hidden border-2 border-transparent running-border"
                >
                    <motion.p
                        variants={textVariants}
                        className="font-bold text-lg text-neutral-800 md:text-xl dark:text-neutral-100"
                    >
                        Personalized E-commerce
                    </motion.p>
                    <motion.ul
                        variants={textVariants}
                        className="list-disc pl-5 text-sm text-neutral-700 md:text-base dark:text-neutral-200 space-y-3"
                    >
                        <TypewriterEffectSmooth
                            words={[{ text: "India’s first all-in-one digital ecosystem for pets—where expert care, everyday services Virtually & Instantaneously" }]}
                        />
                        <TypewriterEffectSmooth
                            words={[{ text: "Personalized shopping comes together on a single smart platform" }]}
                        />
                        <TypewriterEffectSmooth
                            words={[{ text: "Whether you’re raising a puppy, nurturing a kitten, caring for a senior pet, or managing exotic animals, PetSync 360 is your trusted partner for proactive, personalized, and lifelong pet care." }]}
                        />
                    </motion.ul>
                    <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                    >
                        Explore Shop
                    </motion.button>
                </motion.div>
            ),
        },
        {
            title: "What Is PetSync 360?",
            content: (
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg relative overflow-hidden border-2 border-transparent running-border"
                >
                    <motion.p
                        variants={textVariants}
                        className="font-bold text-lg text-neutral-800 md:text-xl dark:text-neutral-100"
                    >
                        Personalized E-commerce
                    </motion.p>
                    <motion.p
                        variants={textVariants}
                        className="text-sm text-neutral-700 md:text-base dark:text-neutral-200"
                    >
                        PetSync 360 is a smart, cloud-based care platform that empowers pet parents, veterinarians, and pet businesses with digital tools to track health, connect with professionals, shop essentials, and manage services—anytime, anywhere in real-time.
                    </motion.p>
                    <motion.p
                        variants={textVariants}
                        className="text-sm text-neutral-700 md:text-base dark:text-neutral-200"
                    >
                        From digital health records to IoT-based monitoring, from emergency HIPAA secured and encrypted teleconsultations to on-demand grooming , training and more,. PetSync 360 simplifies your responsibilities and partners your pet’s wellbeing.
                    </motion.p>
                </motion.div>
            ),
        },
        {
            title: "AI-Powered Diagnosis & Personalization",
            content: (
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg relative overflow-hidden border-2 border-transparent running-border"
                >
                    <motion.p
                        variants={textVariants}
                        className="text-sm text-neutral-700 md:text-base dark:text-neutral-200"
                    >
                        Our integrated AI system analyzes your pet’s health data to offer personalized care recommendations, early diagnosis support, and customized wellness plans—helping you make informed decisions quickly.
                    </motion.p>
                    <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                    >
                        Join PetSync 360
                    </motion.button>
                </motion.div>
            ),
        },
    ];

    return (
        <div className="relative w-full overflow-hidden dark:from-gray-900 dark:to-gray-800 py-12">
            <AnimatePresence>
                <Timeline data={data} />
            </AnimatePresence>
        </div>
    );
};