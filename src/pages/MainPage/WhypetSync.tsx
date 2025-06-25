import React, { useRef, useEffect } from 'react';
import { Calendar, FileText, BarChart, Lightbulb, Heart } from 'lucide-react';
import Health from '../../assets/Images/pet-health.jpg';
import petParent from '../../assets/Images/pet-parent.jpg';
import Service from '../../assets/Images/services-to-doorstep.jpg';
import Shop from '../../assets/Images/shop-smater.jpg';
import Dashboard from '../../assets/Images/one-dashboard.jpg';

/** Grid-placement *and* color metadata */
const cards = [
    {
        title: 'Total Health at a Glance',
        description: `Teleconsults & emergency help
Digital health history
Vet-reviewed medications`,
        icon: Calendar,
        grid: 'col-span-1 row-span-2',
        bgColor: 'bg-green-100',
        img: Health,
        glow: 'rgba(74, 222, 128, 0.80)', // Tailwind emerald-400 @ 80% α
    },
    {
        title: 'Smarter Pet Parenting',
        description: `IoT-connected vitals tracking
Preventive care reminders
Personalized health plans`,
        icon: FileText,
        grid: 'col-span-1 row-span-1',
        bgColor: 'bg-blue-100',
        img: petParent,
        glow: 'rgba(96, 165, 250, 0.80)', // sky-400
    },
    {
        title: 'Services at Your Doorstep',
        description: `Home visits
Grooming, sitting, boarding, and walks
Help with breeding & training`,
        icon: BarChart,
        grid: 'col-span-2 row-span-1',
        img: Service,
        bgColor: 'bg-red-100',
        glow: 'rgba(248, 113, 113, 0.80)', // red-400
    },
    {
        title: 'Shop Smarter',
        description: `Curated items by experts
Filter by species, allergy, or brand
Real-time availability & delivery tracking`,
        icon: Lightbulb,
        grid: 'col-span-2 row-span-1',
        bgColor: 'bg-yellow-100',
        img: Shop,
        glow: 'rgba(250, 204, 21, 0.80)', // yellow-400
    },
    {
        title: 'One Dashboard, All Pets',
        description: `Manage multiple pets
24×7 expert access
Reminders, alerts & health notes`,
        icon: Heart,
        img: Dashboard,
        grid: 'col-span-1 row-span-1',
        bgColor: 'bg-purple-100',
        glow: 'rgba(192, 132, 252, 0.80)', // violet-400
    },
];

const WhyPetSync: React.FC = () => {
    return (
        <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-black py-14 p-10 overflow-hidden">
            {/* Global styles for cinematic effects */}
            <style>{`
                @keyframes cardGlow {
                    0%, 100% { box-shadow: 0 0 12px var(--glow), 0 0 30px var(--glow); }
                    50% { box-shadow: 0 0 25px var(--glow), 0 0 60px var(--glow); }
                }
                @keyframes particleFloat {
                    0% { transform: translateY(0) scale(1); opacity: 0.8; }
                    100% { transform: translateY(-50px) scale(0.5); opacity: 0; }
                }
                @keyframes typing {
                    0% { width: 0; opacity: 0; }
                    100% { width: 100%; opacity: 1; }
                }
                @keyframes caret {
                    0%, 100% { border-color: transparent; }
                    50% { border-color: var(--glow); }
                }
                .glow-card {
                    position: relative;
                    perspective: 1000px;
                    transform-style: preserve-3d;
                    background-size: cover;
                    background-position: center;
                    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;
                }
                .glow-card::before,
                .glow-card::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    pointer-events: none;
                }
                .glow-card::before {
                    background: linear-gradient(135deg, var(--glow) 0%, transparent 80%);
                    opacity: 0;
                    transition: opacity 0.2s ease;
                    z-index: -1;
                }
                .glow-card::after {
                    inset: -15px;
                    filter: blur(20px);
                    background: var(--glow);
                    opacity: 0;
                    transition: opacity 0.2s ease;
                    z-index: -2;
                }
                .glow-card:hover::before,
                .glow-card:hover::after {
                    opacity: 0.9;
                    animation: cardGlow 1.8s ease-in-out infinite;
                }
                .particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: var(--glow);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: particleFloat 3s linear infinite;
                }
                .typewriter {
                    overflow: hidden;
                    white-space: pre-wrap;
                    border-right: 2px solid;
                    animation: typing 1.8s steps(40, end) forwards, caret 0.6s step-end infinite;
                    text-shadow: 0 0 8px var(--glow);
                }
                .card-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7));
                    border-radius: inherit;
                    z-index: 0;
                }
                .popup-content {
                    transform: translateZ(40px) scale(0.95);
                    transition: transform 0.3s ease, opacity 0.3s ease, translate 0.3s ease;
                }
                .glow-card:hover .popup-content {
                    transform: translateZ(60px) scale(1);
                    opacity: 1;
                    translate: 0 0;
                }
            `}</style>

            <div className="grid auto-rows-[155px] grid-cols-4 gap-6 perspective-[1500px] relative z-10">
                {cards.map(({ title, description, icon: Icon, grid, bgColor, glow, img }, i) => {
                    const cardRef = useRef<HTMLDivElement>(null);

                    useEffect(() => {
                        const card = cardRef.current;
                        if (!card) return;

                        let timeout: NodeJS.Timeout;
                        const handleMouseMove = (e: MouseEvent) => {
                            clearTimeout(timeout);
                            timeout = setTimeout(() => {
                                const rect = card.getBoundingClientRect();
                                const x = e.clientX - rect.left - rect.width / 2;
                                const y = e.clientY - rect.top - rect.height / 2;
                                const rotateY = x / rect.width * 15;
                                const rotateX = -y / rect.height * 15;
                                card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
                            }, 10);
                        };

                        const handleMouseLeave = () => {
                            clearTimeout(timeout);
                            card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
                        };

                        card.addEventListener('mousemove', handleMouseMove);
                        card.addEventListener('mouseleave', handleMouseLeave);
                        return () => {
                            card.removeEventListener('mousemove', handleMouseMove);
                            card.removeEventListener('mouseleave', handleMouseLeave);
                            clearTimeout(timeout);
                        };
                    }, []);

                    return (
                        <article
                            key={title}
                            ref={cardRef}
                            className={`group glow-card relative ${grid} ${bgColor} rounded-[22px] text-white overflow-hidden shadow-2xl`}
                            style={{ '--glow': glow, backgroundImage: `url(${img})` } as React.CSSProperties}
                        >
                            {/* Background overlay for cinematic effect */}
                            <div className="card-overlay"></div>

                            {/* Particles for cinematic flair */}
                            {[...Array(5)].map((_, j) => (
                                <div
                                    key={j}
                                    className="particle"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        bottom: `${Math.random() * 50}%`,
                                        animationDelay: `${Math.random() * 2}s`,
                                    }}
                                />
                            ))}

                            {/* Card body */}
                            <div className="flex h-full flex-col justify-end gap-4 p-6 relative z-10">
                                <Icon className="h-8 w-8 drop-shadow-md" />
                                <h3 className="text-xl font-bold leading-snug drop-shadow-md">{title}</h3>
                            </div>

                            {/* Hover popup with enhanced styling */}
                            <div
                                className="absolute inset-0 flex items-center justify-center rounded-[22px] bg-gradient-to-br from-white/90 to-gray-100/90 backdrop-blur-lg px-6 opacity-0 translate-y-4 popup-content"
                            >
                                <p className="typewriter text-sm font-semibold leading-snug text-gray-900 whitespace-pre-line">
                                    {description}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default WhyPetSync;