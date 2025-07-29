import React, { useRef, useEffect } from 'react';
import { Calendar, FileText, BarChart, Lightbulb, Heart } from 'lucide-react';
import Health from '../../assets/Images/pet-health.jpg';
import petParent from '../../assets/Images/pet-parent.jpg';
import Service from '../../assets/Images/services-to-doorstep.jpg';
import Shop from '../../assets/Images/shop-smater.jpg';
import Dashboard from '../../assets/Images/one-dashboard.jpg';

import { HoverEffect } from "../../components/WebPageContent/UI/card-hover-effect";

export function CardHoverEffectDemo() {
    return (
        <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={projects} />
        </div>
    );
}//Features //WhyPetParentsLovePetSync360
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
            " IoT-connected vitals tracking Preventive care reminders Personalized health plans",
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
            " Curated items by experts Filter by species, allergy, or brand Real-time availability & delivery tracking",
        link: "",
    },
    {
        title: "One Dashboard, All Pets",
        description:
            " Manage multiple pets 24x7 expert access Reminders, alerts & health notes.",
        link: "",
    },
    {
        title: "End-to-End Lifecycle Support",
        description:
            "From breeder screening to adoption, onboarding, wellness tracking, and geriatric care — we support your pet’s journey at every stage.",
        link: "",
    },
];



