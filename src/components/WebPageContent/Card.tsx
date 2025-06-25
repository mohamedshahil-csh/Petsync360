import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/petsync-logo.png';
import petImage from '../../assets/Images/pet-parent.png';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface CardData {
    id: number;
    title: string;
    body: string;
    gradient: string;
    chip: string;
    baseTransform: string;
    z: string;
    href: string;
    bgImage: string;
}

const cards: CardData[] = [
    {
        id: 1,
        title: 'Pet Health',
        body: 'Track medical records & reminders in one place.',
        gradient: 'bg-gradient-to-br from-sky-200 to-sky-100 text-white',
        chip: 'bg-white/80',
        baseTransform: 'rotate-[30deg] translate-x-[30%] translate-y-[20%] scale-0.85',
        z: 'z-30',
        href: '/health',
        bgImage: petImage,
    },
    {
        id: 2,
        title: 'Shop Essentials',
        body: 'Food, toys, meds – delivered fast at great prices.',
        gradient: 'bg-gradient-to-br from-pink-200 to-pink-100 text-white',
        chip: 'bg-white/80',
        baseTransform: 'rotate-[0deg] translate-x-[0%] translate-y-[40%] scale-0.9',
        z: 'z-20',
        href: '/shop',
        bgImage: petImage,
    },
    {
        id: 3,
        title: 'Book Services',
        body: 'Grooming, training & vet visits on demand.',
        gradient: 'bg-gradient-to-br from-emerald-200 to-emerald-100 text-white',
        chip: 'bg-white/80',
        baseTransform: 'rotate-[-30deg] translate-x-[-30%] translate-y-[20%] scale-0.85',
        z: 'z-10',
        href: '/services',
        bgImage: petImage,
    },
];

const CYCLE_MS = 4000; // 4s per card for a more relaxed pace

const CardStack: React.FC = () => {
    const navigate = useNavigate();
    const [activeId, setActiveId] = useState<number>(cards[0].id);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Parallax effect: slight rotation based on mouse position
    const rotateX = useTransform(mouseY, [-200, 200], [8, -8]);
    const rotateY = useTransform(mouseX, [-200, 200], [-8, 8]);

    /** Auto-cycle through cards */
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveId((prev) => {
                const idx = cards.findIndex((c) => c.id === prev);
                return cards[(idx + 1) % cards.length].id;
            });
        }, CYCLE_MS);
        return () => clearInterval(timer);
    }, []);

    /** Handle mouse move for parallax */
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    return (
        <motion.div
            className="relative w-[340px] h-[300px] md:w-[400px] md:h-[340px] [perspective:1600px]"
            onMouseMove={handleMouseMove}
            style={{ rotateX, rotateY }}
        >
            {cards.map((card) => {
                const isActive = activeId === card.id;

                return (
                    <motion.div
                        key={card.id}
                        className={`absolute w-[280px] h-[180px] md:w-[340px] md:h-[220px] origin-center rounded-xl p-5 flex flex-col
                        justify-between shadow-2xl transition-all duration-700 ease-out
                        cursor-pointer ${card.z}
                        ${isActive
                                ? 'scale-110 rotate-0 translate-x-0 translate-y-0 z-50'
                                : card.baseTransform}`}
                        style={{
                            backgroundImage: `url(${card.bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        animate={{
                            boxShadow: isActive
                                ? '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(255, 255, 255, 0.6)'
                                : '0 8px 20px rgba(0, 0, 0, 0.3)',
                        }}
                        whileHover={{ scale: isActive ? 1.12 : 0.95, zIndex: 60 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        onClick={() => setActiveId(card.id)}
                    >
                        {/* Gradient overlay to maintain visibility */}
                        <div className={`absolute inset-0 ${card.gradient} opacity-80 rounded-xl`} />

                        {/* Top row: chip + logo */}
                        <div className="relative flex items-center justify-between">
                            <motion.div
                                className={`w-7 h-7 rounded-md ${card.chip}`}
                                animate={{ rotate: isActive ? 45 : 0 }}
                                transition={{ duration: 0.5 }}
                            />
                            <motion.img
                                src={logo}
                                alt="PetSync logo"
                                className="w-12"
                                whileHover={{ rotate: 15, scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 250, damping: 15 }}
                            />
                        </div>

                        {/* Overlay content */}
                        <motion.div
                            className={`relative inset-0 flex flex-col justify-center items-center px-6
                          text-center rounded-xl transition-opacity duration-500
                          ${isActive ? 'opacity-100' : 'opacity-0'}`}
                            initial={{ y: 20 }}
                            animate={{ y: isActive ? 0 : 20 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
                        >
                            <h3 className="text-xl font-bold mb-2 drop-shadow-md">{card.title}</h3>
                            <p className="text-sm mb-5 drop-shadow-sm">{card.body}</p>
                            <motion.button
                                onClick={() => navigate(card.href)}
                                className="px-5 py-2 rounded-full bg-white/95 text-gray-800
                           text-sm font-semibold hover:bg-white shadow-lg"
                                whileHover={{ scale: 1.1, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Explore
                            </motion.button>
                        </motion.div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default CardStack;