"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type Testimonial = {
    quote: string;
    name: string;
    designation: string;
    src: string;
};

export const AnimatedTestimonials = ({
    testimonials,
    autoplay = true,
    interval = 4000,
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
    interval?: number;
}) => {
    const [active, setActive] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-next logic
    const startAutoplay = () => {
        if (autoplay) {
            intervalRef.current = setInterval(() => {
                setActive((prev) => (prev + 1) % testimonials.length);
            }, interval);
        }
    };

    const stopAutoplay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        startAutoplay();
        return () => stopAutoplay(); // Cleanup on unmount
    }, [autoplay, interval]);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
        stopAutoplay();
        startAutoplay();
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        stopAutoplay();
        startAutoplay();
    };

    const handleDotClick = (index: number) => {
        setActive(index);
        stopAutoplay();
        startAutoplay();
    };

    const isActive = (index: number) => index === active;

    const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

    return (
        <div
            className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12"
            role="region"
            aria-label="Testimonials carousel"
        >
            <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
                <div>
                    <div className="relative h-80 w-full">
                        <AnimatePresence>
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.src}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: -100,
                                        rotate: randomRotateY(),
                                    }}
                                    animate={{
                                        opacity: isActive(index) ? 1 : 0.7,
                                        scale: isActive(index) ? 1 : 0.95,
                                        z: isActive(index) ? 0 : -100,
                                        rotate: isActive(index) ? 0 : randomRotateY(),
                                        zIndex: isActive(index)
                                            ? 40
                                            : testimonials.length + 2 - index,
                                        y: isActive(index) ? [0, -20, 0] : 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: 100,
                                        rotate: randomRotateY(),
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 origin-bottom"
                                >
                                    <img
                                        src={testimonial.src}
                                        alt={testimonial.name}
                                        width={500}
                                        height={500}
                                        draggable={false}
                                        className="h-full w-full rounded-3xl object-cover object-center shadow-lg"
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex flex-col justify-between py-4">
                    <motion.div
                        key={active}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-300 dark:to-purple-400 transition-all duration-300 hover:scale-105">
                            {testimonials[active].name}
                        </h3>
                        <p className="text-sm font-medium text-white dark:text-neutral-400 mt-2">
                            {testimonials[active].designation}
                        </p>
                        <motion.p className="mt-2 text-lg text-white dark:text-neutral-200 leading-relaxed">
                            {testimonials[active].quote.split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ filter: "blur(8px)", opacity: 0, y: 10 }}
                                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                        delay: 0.05 * index,
                                    }}
                                    className="inline-block hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>
                    <div className="flex flex-col items-center gap-4 pt-12 md:pt-0">
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`h-3 w-3 rounded-full transition-all duration-300 ${isActive(index)
                                        ? "bg-indigo-500 scale-125"
                                        : "bg-gray-300 dark:bg-neutral-600"
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                        {/* <div className="flex gap-4">
                            <button
                                onClick={handlePrev}
                                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:scale-110 transition-all duration-300"
                                aria-label="Previous testimonial"
                            >
                                <IconArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover/button:-translate-x-1" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:scale-110 transition-all duration-300"
                                aria-label="Next testimonial"
                            >
                                <IconArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-1" />
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};