// // src/components/Services.tsx
// import React, { useEffect, useRef } from "react";
// import {
//     Plug,
//     Wrench,
//     Building2,
//     ShowerHead,
//     Droplets,
//     Sparkles,
//     Star,
// } from "lucide-react";

// /* ---------- tiny reusable card ---------- */
// type CardProps = {
//     title: string;
//     description?: string;
//     Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
// };

// const Card: React.FC<CardProps> = ({ title, description, Icon }) => (
//     <div className="flex flex-col items-center justify-center rounded-xl p-6 bg-white shadow-md
//                   text-center transition-all duration-300 hover:shadow-xl">
//         {Icon && <Icon className="h-8 w-8 mb-4 text-sky-500" />}
//         <h3 className="font-semibold text-base">{title}</h3>
//         {description && <p className="text-sm mt-2 text-gray-500">{description}</p>}
//     </div>
// );

// /* ---------- main section ---------- */
// const Services: React.FC = () => {
//     /* reference to the dog image so we can rotate it */
//     const dogRef = useRef<HTMLImageElement>(null);

//     /* on every mouse‑move, point the dog toward the cursor */
//     useEffect(() => {
//         const handleMouseMove = (e: MouseEvent) => {
//             if (!dogRef.current) return;

//             const rect = dogRef.current.getBoundingClientRect();
//             const cx = rect.left + rect.width / 2;   // centre of the dog
//             const cy = rect.top + rect.height / 2;
//             const angleRad = Math.atan2(e.clientY - cy, e.clientX - cx);
//             const angleDeg = angleRad * (180 / Math.PI);

//             /* +90 deg because the image faces ‘up’ by default – tweak if yours faces another way */
//             dogRef.current.style.transform = `translate(-50%, -50%) rotate(${angleDeg + 90}deg)`;
//         };

//         window.addEventListener("mousemove", handleMouseMove);
//         return () => window.removeEventListener("mousemove", handleMouseMove);
//     }, []);

//     return (
//         <section className="min-h-screen bg-white px-6 py-20 flex items-center justify-center">
//             <div className="max-w-6xl w-full text-center">
//                 {/* heading */}
//                 <h4 className="text-gray-500 text-sm mb-2">Our services</h4>
//                 <h2 className="text-3xl font-semibold mb-12">
//                     Our <span className="text-sky-500">Awesome</span> Services
//                 </h2>

//                 {/* 3×2 grid (6 cards) with an absolutely‑positioned dog in the middle */}
//                 <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6">
//                     {/* top row */}
//                     <Card title="Highly Customisable" description="Lorem ipsum dolor sit amet..." Icon={Plug} />
//                     <Card title="User Experience" description="Lorem ipsum dolor sit amet..." Icon={Star} />
//                     <Card title="Fully Responsive" description="Lorem ipsum dolor sit amet..." Icon={Wrench} />

//                     {/* bottom row */}
//                     <Card title="Creative Web Design" description="Lorem ipsum dolor sit amet..." Icon={Building2} />
//                     <Card title="Unique and Clean" description="Lorem ipsum dolor sit amet..." Icon={Droplets} />
//                     <Card title="Creative Ideas" description="Lorem ipsum dolor sit amet..." Icon={Sparkles} />
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Services;


import React, { useEffect } from 'react';

const Features: React.FC = () => {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const cursor = document.querySelector('.custom-cursor') as HTMLElement;
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            setTimeout(() => trail.remove(), 500);

            // Card tilt effect on hover
            const cards = document.querySelectorAll('.feature-card');
            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const tiltX = -(y / rect.height) * 20; // Max tilt 20 degrees
                const tiltY = (x / rect.width) * 20;
                (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
            });
        };

        const handleMouseLeave = () => {
            const cards = document.querySelectorAll('.feature-card');
            cards.forEach((card) => {
                (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave, true);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave, true);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
            {/* Background Paw Prints */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="paw-print animate-paw-1"></div>
                <div className="paw-print animate-paw-2"></div>
                <div className="paw-print animate-paw-3"></div>
            </div>
            {/* Custom Cursor */}
            <div className="custom-cursor"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <h2 className="text-5xl md:text-6xl font-extrabold text-center text-gray-900 mb-16 tracking-tight animate-glow-text">
                    PetSync 360 Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="feature-card relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] animate-slide-in-up">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-full p-4 shadow-lg animate-bounce-in hover:animate-pulse">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mt-10 text-center">One-Tap Appointment Booking</h3>
                        <p className="mt-3 text-gray-600 text-center text-lg">Choose your vet, time, and consultation mode with a single tap.</p>
                    </div>
                    {/* Feature 2 */}
                    <div className="feature-card relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-[0_0_25px_rgba(147,51,234,0.7)] animate-slide-in-up animation-delay-200">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white rounded-full p-4 shadow-lg animate-bounce-in hover:animate-pulse">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mt-10 text-center">Flexible Consultation Options</h3>
                        <p className="mt-3 text-gray-600 text-center text-lg">Teleconsult, in-clinic, or home visit – connect your way.</p>
                    </div>
                    {/* Feature 3 */}
                    <div className="feature-card relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.7)] animate-slide-in-up animation-delay-400">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white rounded-full p-4 shadow-lg animate-bounce-in hover:animate-pulse">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mt-10 text-center">Smart Reminders</h3>
                        <p className="mt-3 text-gray-600 text-center text-lg">Stay on top of follow-ups, vaccines, and checkups.</p>
                    </div>
                    {/* Feature 4 */}
                    <div className="feature-card relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.7)] animate-slide-in-up animation-delay-600">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white rounded-full p-4 shadow-lg animate-bounce-in hover:animate-pulse">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mt-10 text-center">Real-Time Vet Availability</h3>
                        <p className="mt-3 text-gray-600 text-center text-lg">Transparent slots with instant booking confirmation.</p>
                    </div>
                    {/* Feature 5 */}
                    <div className="feature-card relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] animate-slide-in-up animation-delay-800">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white rounded-full p-4 shadow-lg animate-bounce-in hover:animate-pulse">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mt-10 text-center">Emergency Booking</h3>
                        <p className="mt-3 text-gray-600 text-center text-lg">Prioritized scheduling for urgent pet care needs.</p>
                    </div>
                    {/* Feature 6 */}
                    <div className="feature-card relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-[0_0_25px_rgba(20,184,166,0.7)] animate-slide-in-up animation-delay-1000">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white rounded-full p-4 shadow-lg animate-bounce-in hover:animate-pulse">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mt-10 text-center">PetSync 360 App</h3>
                        <p className="mt-3 text-gray-600 text-center text-lg">Manage bookings with instant alerts and rescheduling.</p>
                    </div>
                </div>
            </div>
            <style >{`
        /* Custom Cursor */
        .custom-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(59,130,246,0.7) 0%, rgba(59,130,246,0) 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease;
        }
        .cursor-trail {
          position: fixed;
          width: 8px;
          height: 8px;
          background: rgba(59,130,246,0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 999;
          animation: sparkle 0.5s ease-out forwards;
        }
        /* Paw Print Background */
        .paw-print {
          position: absolute;
          width: 40px;
          height: 40px;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)"><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11c0-1.66-1.34-3-3-3S5 7.34 5 9s1.34 3 3 3 3-1.34 3-3zm8 0c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3z"/></svg>') no-repeat center;
          opacity: 0.3;
        }
        .animate-paw-1 {
          top: 10%;
          left: 15%;
          animation: float 6s ease-in-out infinite;
        }
        .animate-paw-2 {
          top: 60%;
          left: 70%;
          animation: float 8s ease-in-out infinite 2s;
        }
        .animate-paw-3 {
          top: 30%;
          left: 85%;
          animation: float 7s ease-in-out infinite 1s;
        }
        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.5; }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0); }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes sparkle {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes glowText {
          0%, 100% { text-shadow: 0 0 10px rgba(59,130,246,0.5); }
          50% { text-shadow: 0 0 20px rgba(59,130,246,0.8); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounceIn 0.5s ease-out forwards;
        }
        .animate-glow-text {
          animation: glowText 2s ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 0.6s ease-in-out infinite;
        }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
        /* Card Hover Effects */
    .feature-card {
  color: white;
  border-radius: 50px 0 50px 0; /* Top-right and bottom-left corner radius */
  padding: 20px;
  position: relative;
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M0 0 L50 0 L100 50 L100 100 L50 100 L0 50 Z" fill="white" opacity="0.2"/></svg>') no-repeat;
  opacity: 0.2;
}
.feature-card:hover {
  box-shadow: 0 0 15px rgb(255, 5, 59);
}
        /* Hide default cursor */
        body { cursor: none; }
      `}</style>
        </div>
    );
};

export default Features;