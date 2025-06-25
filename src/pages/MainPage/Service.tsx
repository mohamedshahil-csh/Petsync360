// src/components/Services.tsx
import React, { useEffect, useRef } from "react";
import {
    Plug,
    Wrench,
    Building2,
    ShowerHead,
    Droplets,
    Sparkles,
    Star,
} from "lucide-react";

/* ---------- tiny reusable card ---------- */
type CardProps = {
    title: string;
    description?: string;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const Card: React.FC<CardProps> = ({ title, description, Icon }) => (
    <div className="flex flex-col items-center justify-center rounded-xl p-6 bg-white shadow-md
                  text-center transition-all duration-300 hover:shadow-xl">
        {Icon && <Icon className="h-8 w-8 mb-4 text-sky-500" />}
        <h3 className="font-semibold text-base">{title}</h3>
        {description && <p className="text-sm mt-2 text-gray-500">{description}</p>}
    </div>
);

/* ---------- main section ---------- */
const Services: React.FC = () => {
    /* reference to the dog image so we can rotate it */
    const dogRef = useRef<HTMLImageElement>(null);

    /* on every mouse‑move, point the dog toward the cursor */
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!dogRef.current) return;

            const rect = dogRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;   // centre of the dog
            const cy = rect.top + rect.height / 2;
            const angleRad = Math.atan2(e.clientY - cy, e.clientX - cx);
            const angleDeg = angleRad * (180 / Math.PI);

            /* +90 deg because the image faces ‘up’ by default – tweak if yours faces another way */
            dogRef.current.style.transform = `translate(-50%, -50%) rotate(${angleDeg + 90}deg)`;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="min-h-screen bg-white px-6 py-20 flex items-center justify-center">
            <div className="max-w-6xl w-full text-center">
                {/* heading */}
                <h4 className="text-gray-500 text-sm mb-2">Our services</h4>
                <h2 className="text-3xl font-semibold mb-12">
                    Our <span className="text-sky-500">Awesome</span> Services
                </h2>

                {/* 3×2 grid (6 cards) with an absolutely‑positioned dog in the middle */}
                <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* top row */}
                    <Card title="Highly Customisable" description="Lorem ipsum dolor sit amet..." Icon={Plug} />
                    <Card title="User Experience" description="Lorem ipsum dolor sit amet..." Icon={Star} />
                    <Card title="Fully Responsive" description="Lorem ipsum dolor sit amet..." Icon={Wrench} />

                    {/* bottom row */}
                    <Card title="Creative Web Design" description="Lorem ipsum dolor sit amet..." Icon={Building2} />
                    <Card title="Unique and Clean" description="Lorem ipsum dolor sit amet..." Icon={Droplets} />
                    <Card title="Creative Ideas" description="Lorem ipsum dolor sit amet..." Icon={Sparkles} />
                </div>
            </div>
        </section>
    );
};

export default Services;
