import { cn } from "../../../lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const HoverEffect = ({
    items,
    className,
}: {
    items: {
        title: string;
        description: string;
        link: string;
        icon?: string;
    }[];
    className?: string;
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12 px-4 max-w-7xl mx-auto",
                className
            )}
        >
            {items.map((item, idx) => (
                <a
                    href={item?.link}
                    key={item?.link}
                    className="relative group block p-2 h-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-3xl"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-400/30 via-purple-500/30 to-pink-500/30 dark:from-blue-700/50 dark:via-purple-700/50 dark:to-pink-700/50 backdrop-blur-md block rounded-3xl border border-blue-400/40 dark:border-blue-800/40 shadow-lg group-hover:shadow-2xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    transition: { duration: 0.25, ease: "easeOut" },
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.92,
                                    transition: { duration: 0.2, delay: 0.05 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card>
                        {item.icon && (
                            <motion.div
                                className="flex justify-center mb-4"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <img src={item.icon} alt="" className="w-12 h-12 object-contain" />
                            </motion.div>
                        )}
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </Card>
                </a>
            ))}
        </div>
    );
};

export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "rounded-3xl h-full w-full p-6 overflow-hidden bg-gradient-to-b from-gray-900/90 to-black/90 dark:from-gray-800/90 dark:to-gray-900/90 border border-transparent dark:border-white/[0.1] group-hover:border-blue-400/60 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300 transform group-hover:scale-[1.02] relative z-20",
                className
            )}
        >
            <div className="relative z-50">
                <motion.div
                    className="p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <motion.h4
            className={cn(
                "text-white text-lg font-semibold tracking-tight",
                className
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        >
            {children}
        </motion.h4>
    );
};

export const CardDescription = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <motion.p
            className={cn(
                "mt-4 text-gray-300 dark:text-gray-400 tracking-wide leading-relaxed text-sm",
                className
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        >
            {children}
        </motion.p>
    );
};