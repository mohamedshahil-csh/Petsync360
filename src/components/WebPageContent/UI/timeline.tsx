"use client";
import {
    useMotionValueEvent,
    useScroll,
    useTransform,
    motion,
    Variants,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

export const Timeline: React.FC<{ data: TimelineEntry[] }> = ({ data }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    // Letter animation variants with explicit typing
    const letterVariants: Variants = {
        initial: { y: 30, opacity: 0, rotateX: 90 },
        animate: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
            },
        },
        hover: {
            y: -8,
            color: "#a855f7",
            scale: 1.1,
            transition: { duration: 0.2 },
        },
    };

    // Card animation variants with explicit typing
    const cardVariants: Variants = {
        initial: {
            opacity: 0,
            y: 100,
            scale: 0.9,
            boxShadow: "0 0 0 rgba(0,0,0,0)"
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            transition: {
                duration: 0.6,
                ease: "easeOut",
                type: "spring",
                stiffness: 80
            }
        },
        hover: {
            scale: 1.02,
            boxShadow: "0 15px 40px rgba(168,85,247,0.2)",
            transition: { duration: 0.3 }
        }
    };

    return (
        <div
            className="w-full bg-black dark:from-neutral-950 dark:to-neutral-900 font-sans md:px-16 py-20"
            ref={containerRef}
        >
            <div ref={ref} className="relative max-w-7xl mx-auto pb-32">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col pt-16 md:pt-24" // Changed to flex-col for both mobile and desktop
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.4 }}
                    >
                        <div className="flex items-center mb-6 pl-20 md:pl-24 relative"> {/* Adjusted padding for alignment */}
                            <motion.div
                                className="h-12 absolute left-3 md:left-4 w-12 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center shadow-xl border border-purple-100 dark:border-purple-900/20"
                                whileHover={{
                                    scale: 1.4,
                                    rotate: 360,
                                    transition: { duration: 0.4 }
                                }}
                            >
                                <motion.div
                                    className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 p-2.5 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [1, 0.8, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>
                            <motion.h3
                                className="text-2xl md:text-5xl font-bold text-neutral-700 dark:text-neutral-300 tracking-tight"
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                            >
                                {item.title.split("").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={letterVariants}
                                        className="inline-block"
                                        transition={{ delay: i * 0.08 }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.h3>
                        </div>

                        <div className="relative pl-20 pr-6 md:pl-24 w-full"> {/* Adjusted padding for alignment */}
                            <motion.div
                                className="bg-gradient-to-br from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-900 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 dark:border-purple-900/20"
                                variants={cardVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                            >
                                {item.content}
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-9 left-9 top-0 overflow-hidden w-[4px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-[4px] bg-gradient-to-t from-purple-600 via-blue-500 to-pink-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        animate={{
                            background: [
                                "linear-gradient(to top, #9333ea, #3b82f6, #ec4899)",
                                "linear-gradient(to top, #ec4899, #9333ea, #3b82f6)",
                                "linear-gradient(to top, #3b82f6, #ec4899, #9333ea)",
                            ],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>
            </div>
        </div>
    );
};